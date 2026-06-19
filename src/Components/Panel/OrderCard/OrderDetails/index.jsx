import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, CheckCircle, XCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

// داده نمونه (بعدا از API میاد)
const order = {
  id: "ORD-20260227-001",
  date: "2026-02-27",
  status: "delivered",
  history: [
    { date: "2026-02-25", status: "پردازش شد" },
    { date: "2026-02-26", status: "ارسال شد" },
    { date: "2026-02-27", status: "تحویل شد" },
  ],
  customer: {
    name: "عطیه",
    email: "atieh@example.com",
    phone: "0912-1234567",
    address: "تهران، ایران، خیابان مثال 12",
  },
  items: [
    {
      id: 1,
      name: "تیشرت مشکی",
      quantity: 2,
      price: 250000,
      status: "ارسال شده",
    },
    {
      id: 2,
      name: "شلوار جین",
      quantity: 1,
      price: 450000,
      status: "در حال ارسال",
    },
    {
      id: 3,
      name: "کفش اسپرت",
      quantity: 1,
      price: 800000,
      status: "ارسال شده",
    },
  ],
  payment: {
    method: "آنلاین",
    status: "پرداخت شده",
  },
  shipping: {
    method: "پست پیشتاز",
    trackingNumber: "TRK-20260227-01",
    status: "تحویل شده",
  },
  notes: {
    customer: "لطفا کارت هدیه اضافه کنید",
  },
};

const totalPrice = order.items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0,
);

export default function OrderDetails() {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] text-white p-6 md:p-10 font-light"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <Link to="/panel/orders" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              بازگشت به سفارشات
            </Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-medium
                       bg-gradient-to-r from-blue-700 to-blue-900
                       hover:from-blue-600 hover:to-blue-800
                       transition-all duration-300 flex items-center gap-2"
          >
            چاپ رسید
            <Printer size={20} />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></span>
          </motion.button>
        </motion.div>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1e293b] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg shadow-black/20"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">جزئیات سفارش</h1>
            <p>
              شماره سفارش: <span className="font-semibold">{order.id}</span>
            </p>
            <p>
              تاریخ: <span className="font-semibold">{order.date}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 text-lg font-semibold">
            {order.status === "delivered" ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
            <span
              className={
                order.status === "delivered" ? "text-green-400" : "text-red-400"
              }
            >
              {order.status === "delivered" ? "تحویل شده" : "در حال پردازش"}
            </span>
          </div>
        </motion.div>

        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] rounded-2xl p-6 shadow-md shadow-black/20 space-y-3"
        >
          <h2 className="text-2xl font-bold">اطلاعات خریدار</h2>
          <p>نام: {order.customer.name}</p>
          <p>ایمیل: {order.customer.email}</p>
          <p>تلفن: {order.customer.phone}</p>
          <p>آدرس: {order.customer.address}</p>
        </motion.div>

        {/* Items Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1e293b] rounded-2xl p-6 shadow-md shadow-black/20 overflow-x-auto"
        >
          <h2 className="text-2xl font-bold mb-4">محصولات سفارش</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-3 px-4">محصول</th>
                <th className="py-3 px-4">تعداد</th>
                <th className="py-3 px-4">قیمت واحد</th>
                <th className="py-3 px-4">جمع</th>
                <th className="py-3 px-4">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <motion.tr
                  key={item.id}
                  whileHover={{ scale: 1.02, backgroundColor: "#334155" }}
                  className="border-b border-gray-700 transition-colors"
                >
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">
                    {item.price.toLocaleString()} تومان
                  </td>
                  <td className="py-2 px-4">
                    {(item.price * item.quantity).toLocaleString()} تومان
                  </td>
                  <td className="py-2 px-4">
                    {item.status === "ارسال شده" ? (
                      <CheckCircle className="text-green-400 inline" />
                    ) : (
                      <Truck className="text-yellow-400 inline" />
                    )}{" "}
                    {item.status}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Payment & Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1e293b] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md shadow-black/20"
        >
          <div className="space-y-2">
            <p>
              روش پرداخت:{" "}
              <span className="font-semibold">{order.payment.method}</span>
            </p>
            <p>
              وضعیت پرداخت:{" "}
              <span className="font-semibold">{order.payment.status}</span>
            </p>
            <p>
              روش ارسال:{" "}
              <span className="font-semibold">{order.shipping.method}</span>
            </p>
            <p>
              شماره پیگیری:{" "}
              <span className="font-semibold">
                {order.shipping.trackingNumber}
              </span>
            </p>
            <p>
              وضعیت ارسال:{" "}
              <span className="font-semibold">{order.shipping.status}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-lg font-bold">
            جمع کل: {totalPrice.toLocaleString()} تومان
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1e293b] rounded-2xl p-6 shadow-md shadow-black/20 space-y-2"
        >
          <h2 className="text-2xl font-bold mb-2">تاریخچه سفارش</h2>
          <ul className="border-l-2 border-gray-600 ml-4">
            {order.history.map((h, idx) => (
              <li key={idx} className="mb-2 pl-4 relative">
                <span className="absolute -left-3 top-1.5 w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="font-semibold">{h.status}</span> - {h.date}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1e293b] rounded-2xl p-6 shadow-md shadow-black/20 space-y-2"
        >
          <h2 className="text-2xl font-bold mb-2">یادداشت شما</h2>
          <p>{order.notes.customer}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
