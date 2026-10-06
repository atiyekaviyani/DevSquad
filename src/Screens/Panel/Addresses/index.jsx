import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Star,
  X,
} from "lucide-react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
} from "formik";

import * as Yup from "yup";

import {
  getProvinces,
  getProvinceCities,
} from "../../../Core/Services/api/provinceApi";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../../Core/Services/api/addressApi";

// =====================================================
// Sortable Address Item
// =====================================================

function SortableItem({
  address,
  onDelete,
  onSetDefault,
  onEdit,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: address.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      whileHover={{
        y: -4,
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      className="relative cursor-grab rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-3xl transition-all duration-300 active:cursor-grabbing"
    >
      {/* Default */}
      {address.isDefault && (
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-green-400/30 to-green-500/20 px-3 py-1 text-xs text-green-400">
          <Star size={12} />
          پیش‌فرض
        </div>
      )}

      {/* Title / Drag Area */}
      <div
        {...attributes}
        {...listeners}
        className="mb-3"
      >
        <h3 className="font-semibold text-white">
          {address.title || "آدرس"}
        </h3>
      </div>

      {/* Address */}
      <p className="mb-3 leading-7 text-white/60">
        {address.fullAddress || "-"}
      </p>

      {/* Postal Code */}
      {address.postalCode && (
        <p className="mb-2 text-xs text-white/40">
          کد پستی: {address.postalCode}
        </p>
      )}

      {/* House Number */}
      {address.houseNumber && (
        <p className="mb-4 text-xs text-white/40">
          پلاک: {address.houseNumber}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => onSetDefault(address.id)}
          className="text-xs text-white/60 transition hover:text-white"
        >
          تنظیم به پیش‌فرض
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="text-white/60 transition hover:text-white"
          >
            <Edit3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(address.id)}
            className="text-red-400 transition hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// =====================================================
// Validation
// =====================================================

const AddressSchema = Yup.object().shape({
  province_id: Yup.string().required("استان را انتخاب کنید"),

  city_id: Yup.string().required("شهر را انتخاب کنید"),

  address: Yup.string()
    .min(5, "آدرس خیلی کوتاه است")
    .required("آدرس الزامی است"),

  postal_code: Yup.string()
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقمی باشد")
    .required("کد پستی الزامی است"),

  house_number: Yup.string().required("پلاک الزامی است"),
});

// =====================================================
// Province + City Fields
// =====================================================

function ProvinceCityFields({ provinces }) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormikContext();

  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCities = async () => {
      if (!values.province_id) {
        setCities([]);
        return;
      }

      try {
        setCitiesLoading(true);

        console.log(
          "در حال دریافت شهرهای استان:",
          values.province_id
        );

        const response = await getProvinceCities(
          values.province_id
        );

        console.log("Cities Response:", response);
        console.log("Cities Data:", response?.data);

        const data = Array.isArray(response?.data)
          ? response.data
          : [];

        if (!cancelled) {
          setCities(data);
        }
      } catch (err) {
        console.error("Cities Error:", err);

        if (!cancelled) {
          setCities([]);
        }
      } finally {
        if (!cancelled) {
          setCitiesLoading(false);
        }
      }
    };

    loadCities();

    return () => {
      cancelled = true;
    };
  }, [values.province_id]);

  return (
    <>
      {/* Province */}
      <div>
        <label className="mb-2 block text-sm text-white/60">
          استان
        </label>

        <Field
          as="select"
          name="province_id"
          onChange={(e) => {
            const provinceId = e.target.value;

            setFieldValue("province_id", provinceId);

            // فقط زمانی که کاربر استان را عوض می‌کند
            // شهر قبلی پاک شود
            setFieldValue("city_id", "");
          }}
          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white outline-none transition focus:border-purple-400/60 ${
            errors.province_id && touched.province_id
              ? "border-red-400"
              : ""
          }`}
        >
          <option
            value=""
            className="bg-gray-900 text-white"
          >
            انتخاب استان
          </option>

          {provinces.map((province) => (
            <option
              key={province.id}
              value={province.id}
              className="bg-gray-900 text-white"
            >
              {province.name}
            </option>
          ))}
        </Field>

        <ErrorMessage
          name="province_id"
          component="div"
          className="mt-1 text-xs text-red-400"
        />
      </div>

      {/* City */}
      <div>
        <label className="mb-2 block text-sm text-white/60">
          شهر
        </label>

        <Field
          as="select"
          name="city_id"
          disabled={
            !values.province_id || citiesLoading
          }
          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white outline-none transition focus:border-purple-400/60 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.city_id && touched.city_id
              ? "border-red-400"
              : ""
          }`}
        >
          <option
            value=""
            className="bg-gray-900 text-white"
          >
            {citiesLoading
              ? "در حال دریافت شهرها..."
              : !values.province_id
                ? "ابتدا استان را انتخاب کنید"
                : "انتخاب شهر"}
          </option>

          {cities.map((city) => (
            <option
              key={city.id}
              value={city.id}
              className="bg-gray-900 text-white"
            >
              {city.name}
            </option>
          ))}
        </Field>

        <ErrorMessage
          name="city_id"
          component="div"
          className="mt-1 text-xs text-red-400"
        />
      </div>
    </>
  );
}

// =====================================================
// Main Component
// =====================================================

export default function UltraPremiumAddresses() {
  const [addresses, setAddresses] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [provincesLoading, setProvincesLoading] =
    useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  // =====================================================
  // GET Provinces
  // =====================================================

  const loadProvinces = async () => {
    try {
      setProvincesLoading(true);

      console.log("در حال دریافت استان‌ها...");

      const response = await getProvinces();

      console.log("Provinces Response:", response);
      console.log(
        "Provinces Data:",
        response?.data
      );

      const data = Array.isArray(response?.data)
        ? response.data
        : [];

      setProvinces(data);
    } catch (err) {
      console.error("Provinces Error:", err);

      setProvinces([]);
      setError(
        err?.message ||
          "دریافت استان‌ها با خطا مواجه شد."
      );
    } finally {
      setProvincesLoading(false);
    }
  };

  // =====================================================
  // GET Addresses
  // =====================================================

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAddresses();

      console.log(
        "Addresses Response:",
        response
      );

      const data = Array.isArray(response?.data)
        ? response.data
        : [];

      const formattedAddresses = data.map(
        (item, index) => ({
          id: item.id,

          title: `${item.province || ""}${
            item.city
              ? ` - ${item.city}`
              : ""
          }`,

          fullAddress: item.address || "",

          postalCode:
            item.postal_code || "",

          houseNumber:
            item.house_number || "",

          province:
            item.province || "",

          city:
            item.city || "",

          province_id:
            item.province_id || "",

          city_id:
            item.city_id || "",

          // فعلاً چون API مقدار default ندارد
          isDefault: index === 0,
        })
      );

      console.log(
        "Formatted Addresses:",
        formattedAddresses
      );

      setAddresses(formattedAddresses);
    } catch (err) {
      console.error(
        "Addresses Error:",
        err
      );

      setError(
        err?.message ||
          "دریافت آدرس‌ها با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Initial Load
  // =====================================================

  useEffect(() => {
    loadProvinces();
    loadAddresses();
  }, []);

  // =====================================================
  // Drag & Drop
  // =====================================================

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setAddresses((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      if (
        oldIndex === -1 ||
        newIndex === -1
      ) {
        return items;
      }

      return arrayMove(
        items,
        oldIndex,
        newIndex
      );
    });
  };

  // =====================================================
  // Open Add Modal
  // =====================================================

  const handleAdd = () => {
    setEditing(null);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  // =====================================================
  // Edit
  // =====================================================

  const handleEdit = (address) => {
    console.log(
      "EDIT ADDRESS:",
      address
    );

    setEditing(address);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  // =====================================================
  // Delete
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "آیا از حذف این آدرس مطمئن هستید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      console.log(
        "DELETE ADDRESS REQUEST:",
        id
      );

      const response =
        await deleteAddress(id);

      console.log(
        "DELETE ADDRESS RESPONSE:",
        response
      );

      setSuccess(
        "آدرس با موفقیت حذف شد."
      );

      await loadAddresses();
    } catch (err) {
      console.error(
        "Delete Address Error:",
        err
      );

      setError(
        err?.message ||
          "حذف آدرس با خطا مواجه شد."
      );
    }
  };

  // =====================================================
  // Set Default
  // =====================================================

  const handleSetDefault = (id) => {
    setAddresses(
      (currentAddresses) =>
        currentAddresses.map(
          (address) => ({
            ...address,
            isDefault:
              address.id === id,
          })
        )
    );
  };

  // =====================================================
  // Close Modal
  // =====================================================

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setError("");
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div
        className="relative p-6"
        dir="rtl"
      >
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-white" />

            <p className="text-sm text-white/50">
              در حال دریافت آدرس‌ها...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // Render
  // =====================================================

  return (
    <div
      className="relative p-6"
      dir="rtl"
    >
      {/* Background Glow */}

      <motion.div
        className="absolute -left-40 -top-40 h-72 w-72 rounded-full bg-purple-600/30 blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-blue-500/30 blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
      />

      {/* Header */}

      <div className="relative z-10 mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <MapPin size={18} />

          مدیریت آدرس‌ها
        </h2>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
        >
          <Plus size={16} />

          افزودن
        </button>
      </div>

      {/* Success */}

      {success && (
        <div className="relative z-10 mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-4 text-sm text-green-400">
          {success}
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="relative z-10 mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty */}

      {!error &&
        addresses.length === 0 && (
          <div className="relative z-10 flex min-h-[250px] flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 text-center backdrop-blur-xl">
            <MapPin
              size={36}
              className="mb-4 text-white/30"
            />

            <p className="text-base font-medium text-white">
              هنوز آدرسی ثبت نکرده‌اید
            </p>

            <p className="mt-2 text-sm text-white/40">
              آدرس‌های شما در این قسمت نمایش داده می‌شوند.
            </p>
          </div>
        )}

      {/* Addresses */}

      {addresses.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={addresses.map(
              (address) => address.id
            )}
            strategy={
              verticalListSortingStrategy
            }
          >
            <motion.div className="relative z-10 grid max-h-[60vh] grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {addresses.map(
                (address) => (
                  <SortableItem
                    key={address.id}
                    address={address}
                    onDelete={
                      handleDelete
                    }
                    onSetDefault={
                      handleSetDefault
                    }
                    onEdit={
                      handleEdit
                    }
                  />
                )
              )}
            </motion.div>
          </SortableContext>
        </DndContext>
      )}

      {/* Modal */}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="relative max-h-[90vh] w-[90%] max-w-md overflow-y-auto rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              initial={{
                scale: 0.85,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.85,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {/* Close */}

              <button
                type="button"
                onClick={closeModal}
                className="absolute left-5 top-5 text-white/50 transition hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="mb-6 text-lg font-semibold text-white">
                {editing
                  ? "ویرایش آدرس"
                  : "افزودن آدرس"}
              </h3>

              {/* Provinces Loading */}

              {provincesLoading ? (
                <div className="flex min-h-[200px] items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-white" />

                    <p className="text-sm text-white/50">
                      در حال دریافت استان‌ها...
                    </p>
                  </div>
                </div>
              ) : (
                <Formik
                  enableReinitialize
                  initialValues={
                    editing
                      ? {
                          province_id:
                            editing.province_id
                              ? String(
                                  editing.province_id
                                )
                              : "",

                          city_id:
                            editing.city_id
                              ? String(
                                  editing.city_id
                                )
                              : "",

                          address:
                            editing.fullAddress ||
                            "",

                          postal_code:
                            editing.postalCode ||
                            "",

                          house_number:
                            editing.houseNumber
                              ? String(
                                  editing.houseNumber
                                )
                              : "",
                        }
                      : {
                          province_id: "",
                          city_id: "",
                          address: "",
                          postal_code: "",
                          house_number: "",
                        }
                  }
                  validationSchema={
                    AddressSchema
                  }
                  onSubmit={async (
                    values,
                    {
                      resetForm,
                    }
                  ) => {
                    try {
                      setSaving(true);
                      setError("");
                      setSuccess("");

                      // =================================================
                      // UPDATE
                      // =================================================

                      if (editing) {
                        const payload = {
                          province_id:
                            Number(
                              values.province_id
                            ),

                          city_id:
                            Number(
                              values.city_id
                            ),

                          address:
                            values.address,

                          postal_code:
                            values.postal_code,

                          house_number:
                            Number(
                              values.house_number
                            ),
                        };

                        console.log(
                          "UPDATE ADDRESS REQUEST:",
                          {
                            id: editing.id,
                            ...payload,
                          }
                        );

                        const response =
                          await updateAddress(
                            editing.id,
                            payload
                          );

                        console.log(
                          "UPDATE ADDRESS RESPONSE:",
                          response
                        );

                        setSuccess(
                          "آدرس با موفقیت ویرایش شد."
                        );

                        resetForm();

                        setModalOpen(
                          false
                        );

                        setEditing(null);

                        await loadAddresses();

                        return;
                      }

                      // =================================================
                      // ADD
                      // =================================================

                      const payload = {
                        province_id:
                          Number(
                            values.province_id
                          ),

                        city_id:
                          Number(
                            values.city_id
                          ),

                        address:
                          values.address,

                        postal_code:
                          values.postal_code,

                        house_number:
                          Number(
                            values.house_number
                          ),
                      };

                      console.log(
                        "ADD ADDRESS REQUEST:",
                        payload
                      );

                      const response =
                        await addAddress(
                          payload
                        );

                      console.log(
                        "ADD ADDRESS RESPONSE:",
                        response
                      );

                      setSuccess(
                        "آدرس با موفقیت ثبت شد."
                      );

                      resetForm();

                      setModalOpen(
                        false
                      );

                      setEditing(null);

                      await loadAddresses();
                    } catch (err) {
                      console.error(
                        "Save Address Error:",
                        err
                      );

                      setError(
                        err?.message ||
                          "ذخیره آدرس با خطا مواجه شد."
                      );
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  {({
                    errors,
                    touched,
                  }) => (
                    <Form className="space-y-4">
                      {/* Province / City */}

                      <ProvinceCityFields
                        provinces={
                          provinces
                        }
                      />

                      {/* Address */}

                      <div>
                        <label className="mb-2 block text-sm text-white/60">
                          آدرس کامل
                        </label>

                        <Field
                          as="textarea"
                          name="address"
                          rows="3"
                          placeholder="مثلاً خیابان ولیعصر، کوچه ..."
                          className={`w-full resize-none rounded-2xl border border-white/20 bg-white/10 p-3 text-white outline-none transition placeholder:text-white/20 focus:border-purple-400/60 ${
                            errors.address &&
                            touched.address
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="address"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* Postal Code */}

                      <div>
                        <label className="mb-2 block text-sm text-white/60">
                          کد پستی
                        </label>

                        <Field
                          name="postal_code"
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="۱۰ رقم"
                          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white outline-none transition placeholder:text-white/20 focus:border-purple-400/60 ${
                            errors.postal_code &&
                            touched.postal_code
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="postal_code"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* House Number */}

                      <div>
                        <label className="mb-2 block text-sm text-white/60">
                          پلاک
                        </label>

                        <Field
                          name="house_number"
                          type="text"
                          inputMode="numeric"
                          placeholder="مثلاً ۱۲"
                          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white outline-none transition placeholder:text-white/20 focus:border-purple-400/60 ${
                            errors.house_number &&
                            touched.house_number
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <ErrorMessage
                          name="house_number"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* Buttons */}

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={
                            closeModal
                          }
                          className="px-4 py-2 text-sm text-white/60 transition hover:text-white"
                        >
                          لغو
                        </button>

                        <button
                          type="submit"
                          disabled={saving}
                          className="flex min-w-[110px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {saving
                            ? "در حال ذخیره..."
                            : editing
                              ? "ویرایش"
                              : "ذخیره"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}