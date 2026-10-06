import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit3, Trash2, Star } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

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

import { getAddresses } from "../../../core/Services/api/addressApi";

import {
  getProvinces,
  getProvinceCities,
} from "../../../Core/Services/api/provinceApi";

// ----------------------------------
// Sortable Address Item
// ----------------------------------

function SortableItem({ address, onDelete, onSetDefault, onEdit }) {
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

      {/* Title */}
      <div {...attributes} {...listeners} className="mb-2">
        <h3 className="font-semibold text-white">{address.title || "آدرس"}</h3>
      </div>

      {/* Address */}
      <p className="mb-2 text-white/60">{address.fullAddress || "-"}</p>

      {/* Phone */}
      {address.phone && (
        <p className="mb-4 text-xs text-white/40">{address.phone}</p>
      )}

      {/* Postal Code */}
      {address.postalCode && (
        <p className="mb-4 text-xs text-white/40">
          کد پستی: {address.postalCode}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSetDefault(address.id)}
          className="text-xs text-white/60 transition hover:text-white"
        >
          تنظیم به پیش‌فرض
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(address)}
            className="text-white/60 transition hover:text-white"
          >
            <Edit3 size={16} />
          </button>

          <button
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

// ----------------------------------
// Validation
// ----------------------------------

const AddressSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الزامی است"),

  province_id: Yup.string().required("استان را انتخاب کنید"),

  city_id: Yup.string().required("شهر را انتخاب کنید"),

  fullAddress: Yup.string()
    .min(10, "آدرس باید حداقل 10 کاراکتر باشد")
    .required("آدرس الزامی است"),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "شماره تماس باید فقط عدد باشد")
    .required("شماره تماس الزامی است"),
});

// ----------------------------------
// Province -> Cities Loader
// ----------------------------------

function ProvinceCitiesLoader({ setCities, setCitiesLoading }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    // اگر استان انتخاب نشده
    if (!values.province_id) {
      setCities([]);
      setFieldValue("city_id", "");
      return;
    }

    const loadCities = async () => {
      try {
        setCitiesLoading(true);

        setCities([]);

        // با تغییر استان، شهر قبلی پاک می‌شود
        setFieldValue("city_id", "");

        console.log("در حال دریافت شهرهای استان:", values.province_id);

        const response = await getProvinceCities(values.province_id);

        console.log("Cities Response:", response);

        console.log("Cities Data:", response?.data);

        const data = Array.isArray(response?.data) ? response.data : [];

        setCities(data);
      } catch (err) {
        console.error("Cities Error:", err);

        setCities([]);
        setFieldValue("city_id", "");
      } finally {
        setCitiesLoading(false);
      }
    };

    loadCities();
  }, [values.province_id, setFieldValue, setCities, setCitiesLoading]);

  return null;
}

// ----------------------------------
// Component
// ----------------------------------

export default function UltraPremiumAddresses() {
  console.log("ADDRESSES COMPONENT RENDERED");

  const [addresses, setAddresses] = useState([]);

  // استان‌ها
  const [provinces, setProvinces] = useState([]);

  // شهرها
  const [cities, setCities] = useState([]);

  const [citiesLoading, setCitiesLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ----------------------------------
  // Sensors
  // ----------------------------------

  const sensors = useSensors(useSensor(PointerSensor));

  // ----------------------------------
  // GET Addresses API
  // ----------------------------------

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        console.log("شروع دریافت آدرس‌ها...");

        setLoading(true);
        setError("");

        const response = await getAddresses();

        console.log("Addresses Response:", response);

        console.log("Addresses Data:", response?.data);

        const data = Array.isArray(response?.data) ? response.data : [];

        const formattedAddresses = data.map((item, index) => ({
          id: item.id,

          title: `${item.province || ""} - ${item.city || ""}`,

          fullAddress: item.address || "",

          phone: item.phone || "",

          postalCode: item.postal_code || "",

          // اگر API این فیلدها را داشته باشد
          province_id: item.province_id ?? item.province?.id ?? "",

          city_id: item.city_id ?? item.city?.id ?? "",

          isDefault: index === 0,
        }));

        console.log("Formatted Addresses:", formattedAddresses);

        setAddresses(formattedAddresses);
      } catch (err) {
        console.error("Addresses Error:", err);

        setError(err?.message || "دریافت آدرس‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, []);

  // ----------------------------------
  // GET Provinces API
  // ----------------------------------

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        console.log("شروع دریافت استان‌ها...");

        const response = await getProvinces();

        console.log("Provinces Response:", response);

        console.log("Provinces Data:", response?.data);

        const data = Array.isArray(response?.data) ? response.data : [];

        setProvinces(data);
      } catch (err) {
        console.error("Provinces Error:", err);
      }
    };

    loadProvinces();
  }, []);

  // ----------------------------------
  // Drag & Drop
  // ----------------------------------

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setAddresses((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);

      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // ----------------------------------
  // Edit
  // ----------------------------------

  const handleEdit = (address) => {
    setEditing(address);
    setCities([]);
    setModalOpen(true);
  };

  // ----------------------------------
  // Delete - فعلاً لوکال
  // ----------------------------------

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  // ----------------------------------
  // Set Default - فعلاً لوکال
  // ----------------------------------

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (loading) {
    return (
      <div className="relative p-6" dir="rtl">
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-white" />

            <p className="text-sm text-white/50">در حال دریافت آدرس‌ها...</p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------
  // Render
  // ----------------------------------

  return (
    <div className="relative p-6" dir="rtl">
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
          onClick={() => {
            setEditing(null);
            setCities([]);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
        >
          <Plus size={16} />
          افزودن
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="relative z-10 mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty */}

      {!error && addresses.length === 0 && (
        <div className="relative z-10 flex min-h-[250px] flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 text-center backdrop-blur-xl">
          <MapPin size={36} className="mb-4 text-white/30" />

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
            items={addresses.map((address) => address.id)}
            strategy={verticalListSortingStrategy}
          >
            <motion.div className="relative z-10 max-h-[60vh] space-y-5 overflow-y-auto">
              {addresses.map((address) => (
                <SortableItem
                  key={address.id}
                  address={address}
                  onDelete={handleDelete}
                  onSetDefault={handleSetDefault}
                  onEdit={handleEdit}
                />
              ))}
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
              className="w-[90%] max-w-md rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-3xl"
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
              <h3 className="mb-6 text-lg font-semibold text-white">
                {editing ? "ویرایش آدرس" : "افزودن آدرس"}
              </h3>

              <Formik
                enableReinitialize
                initialValues={
                  editing
                    ? {
                        title: editing.title || "",

                        province_id: editing.province_id
                          ? String(editing.province_id)
                          : "",

                        city_id: editing.city_id ? String(editing.city_id) : "",

                        fullAddress: editing.fullAddress || "",

                        phone: editing.phone || "",
                      }
                    : {
                        title: "",
                        province_id: "",
                        city_id: "",
                        fullAddress: "",
                        phone: "",
                      }
                }
                validationSchema={AddressSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log("Form Values:", values);

                  if (editing) {
                    setAddresses(
                      addresses.map((address) =>
                        address.id === editing.id
                          ? {
                              ...address,
                              ...values,
                            }
                          : address,
                      ),
                    );
                  } else {
                    setAddresses([
                      ...addresses,
                      {
                        id: Date.now(),
                        ...values,
                        isDefault: addresses.length === 0,
                      },
                    ]);
                  }

                  setEditing(null);
                  setModalOpen(false);
                  setCities([]);
                  resetForm();
                }}
              >
                {({ errors, touched, values }) => (
                  <>
                    {/* Province -> City API Loader */}

                    <ProvinceCitiesLoader
                      setCities={setCities}
                      setCitiesLoading={setCitiesLoading}
                    />

                    <Form className="space-y-4">
                      {/* Title */}

                      <div className="relative">
                        <Field
                          name="title"
                          placeholder=" "
                          className={`peer w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl transition focus:border-purple-400/60 focus:outline-none ${
                            errors.title && touched.title
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <label className="absolute -top-2 left-4 text-xs text-white/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                          عنوان
                        </label>

                        <ErrorMessage
                          name="title"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* Province */}

                      <div className="relative">
                        <Field
                          as="select"
                          name="province_id"
                          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl transition focus:border-purple-400/60 focus:outline-none ${
                            errors.province_id && touched.province_id
                              ? "border-red-400"
                              : ""
                          }`}
                        >
                          <option value="" className="bg-gray-900 text-white">
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

                      <div className="relative">
                        <Field
                          as="select"
                          name="city_id"
                          disabled={!values.province_id || citiesLoading}
                          className={`w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl transition focus:border-purple-400/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.city_id && touched.city_id
                              ? "border-red-400"
                              : ""
                          }`}
                        >
                          <option value="" className="bg-gray-900 text-white">
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

                      {/* Full Address */}

                      <div className="relative">
                        <Field
                          name="fullAddress"
                          placeholder=" "
                          className={`peer w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl transition focus:border-purple-400/60 focus:outline-none ${
                            errors.fullAddress && touched.fullAddress
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <label className="absolute -top-2 left-4 text-xs text-white/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                          آدرس کامل
                        </label>

                        <ErrorMessage
                          name="fullAddress"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* Phone */}

                      <div className="relative">
                        <Field
                          name="phone"
                          placeholder=" "
                          className={`peer w-full rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl transition focus:border-purple-400/60 focus:outline-none ${
                            errors.phone && touched.phone
                              ? "border-red-400"
                              : ""
                          }`}
                        />

                        <label className="absolute -top-2 left-4 text-xs text-white/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                          شماره تماس
                        </label>

                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="mt-1 text-xs text-red-400"
                        />
                      </div>

                      {/* Buttons */}

                      <div className="mt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setModalOpen(false);
                            setEditing(null);
                            setCities([]);
                          }}
                          className="px-4 py-2 text-sm text-white/60 transition hover:text-white"
                        >
                          لغو
                        </button>

                        <button
                          type="submit"
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-400"
                        >
                          ذخیره
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
