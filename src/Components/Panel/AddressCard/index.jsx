import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit3, Trash2, Star } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

function SortableItem({ address, onDelete, onSetDefault, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: address.id });

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
      whileHover={{ y: -4, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white/5 backdrop-blur-3xl rounded-[32px] p-5 border border-white/10 shadow-lg cursor-grab active:cursor-grabbing transition-all duration-300"
    >
      {address.isDefault && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400/30 to-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
          <Star size={12} /> پیش‌فرض
        </div>
      )}

      <div {...attributes} {...listeners} className="mb-2">
        <h3 className="font-semibold text-white">{address.title}</h3>
      </div>

      <p className="text-white/60 mb-2">{address.fullAddress}</p>
      <p className="text-white/40 text-xs mb-4">{address.phone}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onSetDefault(address.id)}
          className="text-white/60 hover:text-white text-xs transition"
        >
          تنظیم به پیش‌فرض
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(address)}
            className="text-white/60 hover:text-white transition"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="text-red-400 hover:text-red-500 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const AddressSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الزامی است"),
  fullAddress: Yup.string()
    .min(10, "آدرس باید حداقل 10 کاراکتر باشد")
    .required("آدرس الزامی است"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "شماره تماس باید فقط عدد باشد")
    .required("شماره تماس الزامی است"),
});

export default function UltraPremiumAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setAddresses((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleEdit = (address) => {
    setEditing(address);
    setModalOpen(true);
  };

  const handleDelete = (id) =>
    setAddresses(addresses.filter((a) => a.id !== id));

  const handleSetDefault = (id) =>
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <div className="p-6">
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-purple-600/30 blur-[120px] -top-40 -left-40"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-blue-500/30 blur-[120px] -bottom-40 -right-40"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <MapPin size={18} /> مدیریت آدرس‌ها
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-4 py-2 rounded-2xl text-sm text-white shadow-lg transition"
        >
          <Plus size={16} /> افزودن
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={addresses.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          <motion.div className="space-y-5 max-h-[60vh] overflow-y-auto relative z-10">
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

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-3xl rounded-[32px] p-6 w-[90%] max-w-md border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="mb-6 text-lg font-semibold text-white">
                {editing ? "ویرایش آدرس" : "افزودن آدرس"}
              </h3>

              <Formik
                initialValues={
                  editing || { title: "", fullAddress: "", phone: "" }
                }
                validationSchema={AddressSchema}
                onSubmit={(values, { resetForm }) => {
                  if (editing) {
                    setAddresses(
                      addresses.map((a) =>
                        a.id === editing.id ? { ...a, ...values } : a,
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
                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    {["title", "fullAddress", "phone"].map((field, idx) => (
                      <div key={idx} className="relative">
                        <Field
                          name={field}
                          placeholder=" "
                          className={`w-full p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white focus:outline-none focus:border-purple-400/60 transition peer ${
                            errors[field] && touched[field]
                              ? "border-red-400"
                              : ""
                          }`}
                        />
                        <label className="absolute left-4 -top-2 text-xs text-white/50 peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-sm transition-all">
                          {field === "title"
                            ? "عنوان"
                            : field === "fullAddress"
                              ? "آدرس کامل"
                              : "شماره تماس"}
                        </label>
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                    ))}

                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setModalOpen(false);
                          setEditing(null);
                        }}
                        className="px-4 py-2 text-sm text-white/60 hover:text-white transition"
                      >
                        لغو
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-medium transition-all"
                      >
                        ذخیره
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
