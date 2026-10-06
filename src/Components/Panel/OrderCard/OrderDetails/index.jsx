import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Printer,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../../../../Core/Services/api/orderApi";

// ----------------------------------
// Status Config
// ----------------------------------

const statusConfig = {
  pending_payment: {
    label: "در انتظار پرداخت",
    className:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    icon: Package,
  },

  processing: {
    label: "در حال پردازش",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: Package,
  },

  paid: {
    label: "پرداخت شده",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: CheckCircle,
  },

  shipped: {
    label: "ارسال شده",
    className:
      "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: Truck,
  },

  delivered: {
    label: "تحویل داده شد",
    className:
      "bg-green-500/10 text-green-400 border-green-500/30",
    icon: CheckCircle,
  },

  canceled: {
    label: "لغو شده",
    className:
      "bg-red-500/10 text-red-400 border-red-500/30",
    icon: XCircle,
  },

  cancelled: {
    label: "لغو شده",
    className:
      "bg-red-500/10 text-red-400 border-red-500/30",
    icon: XCircle,
  },
};

// ----------------------------------
// Helpers
// ----------------------------------

const getStatusConfig = (status, statusFa) => {
  if (statusConfig[status]) {
    return statusConfig[status];
  }

  return {
    label: statusFa || status || "نامشخص",
    className:
      "bg-gray-500/10 text-gray-400 border-gray-500/30",
    icon: Package,
  };
};

const formatPrice = (price) => {
  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return "0";
  }

  const numericPrice = Number(
    String(price).replace(/,/g, "")
  );

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("fa-IR");
};

const formatOrderNumber = (orderNumber) => {
  if (!orderNumber) {
    return "بدون شماره";
  }

  return `#${orderNumber}`;
};

// ----------------------------------
// Component
// ----------------------------------

export default function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------------
  // Get Order Details
  // ----------------------------------

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        setLoading(true);
        setError("");

        if (!orderId) {
          setError("شناسه سفارش پیدا نشد.");
          return;
        }

        console.log(
          "ORDER ID:",
          orderId
        );

        const response = await getOrderDetails(
          orderId
        );

        console.log(
          "ORDER DETAILS RESPONSE:",
          response
        );

        const data = response?.data;

        if (!data) {
          setError(
            "اطلاعات سفارش پیدا نشد."
          );
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(
          "Order Details Error:",
          err
        );

        setError(
          err?.message ||
            "دریافت جزئیات سفارش با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] px-6 py-10 text-white"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />

            <p className="text-sm text-gray-400">
              در حال دریافت جزئیات سفارش...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------
  // Error
  // ----------------------------------

  if (error || !order) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] px-6 py-10 text-white"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />

            <h2 className="text-xl font-semibold">
              خطا در دریافت سفارش
            </h2>

            <p className="mt-3 text-sm text-red-300">
              {error ||
                "اطلاعات سفارش در دسترس نیست."}
            </p>

            <Link
              to="/Panel/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
            >
              <ArrowLeft size={18} />
              بازگشت به سفارشات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------
  // Status
  // ----------------------------------

  const status = getStatusConfig(
    order.status,
    order.status_fa
  );

  const StatusIcon = status.icon;

  const shipping =
    order.shipping_details || {};

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  // ----------------------------------
  // Render
  // ----------------------------------

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#111827] px-4 py-6 font-light text-white md:px-8 md:py-10"
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* -------------------------------- */}
        {/* Toolbar */}
        {/* -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
        >
          <Link
            to="/Panel/orders"
            className="flex items-center gap-2 text-gray-300 transition hover:text-white"
          >
            <ArrowLeft size={20} />
            بازگشت به سفارشات
          </Link>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              window.print()
            }
            className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:from-blue-600 hover:to-blue-800"
          >
            چاپ رسید

            <Printer size={20} />

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />
          </motion.button>
        </motion.div>

        {/* -------------------------------- */}
        {/* Order Header */}
        {/* -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#1e293b] p-6 shadow-lg shadow-black/20 md:flex-row md:items-center"
        >
          <div className="space-y-3">
            <h1 className="text-2xl font-bold md:text-3xl">
              جزئیات سفارش
            </h1>

            <p className="text-sm text-gray-400">
              شماره سفارش:

              <span className="mr-2 font-semibold text-white">
                {formatOrderNumber(
                  order.order_number
                )}
              </span>
            </p>

            <p className="text-sm text-gray-400">
              شناسه سفارش:

              <span className="mr-2 font-semibold text-white">
                {order.id}
              </span>
            </p>
          </div>

          <div
            className={`flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium ${status.className}`}
          >
            <StatusIcon size={20} />

            <span>
              {status.label}
            </span>
          </div>
        </motion.div>

        {/* -------------------------------- */}
        {/* Shipping Information */}
        {/* -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 shadow-md shadow-black/20"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                اطلاعات گیرنده
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                اطلاعات ارسال سفارش
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-400">
                <User size={17} />

                <span className="text-sm">
                  نام گیرنده
                </span>
              </div>

              <p className="font-medium text-white">
                {shipping.name || "-"}{" "}
                {shipping.family || ""}
              </p>
            </div>

            {/* Phone */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-400">
                <Phone size={17} />

                <span className="text-sm">
                  شماره تماس
                </span>
              </div>

              <p
                dir="ltr"
                className="text-right font-medium text-white"
              >
                {shipping.phone || "-"}
              </p>
            </div>

            {/* Province */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="mb-2 text-sm text-gray-400">
                استان
              </p>

              <p className="font-medium">
                {shipping.province_name ||
                  "-"}
              </p>
            </div>

            {/* City */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="mb-2 text-sm text-gray-400">
                شهر
              </p>

              <p className="font-medium">
                {shipping.city_name ||
                  "-"}
              </p>
            </div>

            {/* Address */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4 md:col-span-2">
              <p className="mb-2 text-sm text-gray-400">
                آدرس
              </p>

              <p className="font-medium leading-7">
                {shipping.address || "-"}
              </p>
            </div>

            {/* House Number */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="mb-2 text-sm text-gray-400">
                پلاک
              </p>

              <p className="font-medium">
                {shipping.house_number ||
                  "-"}
              </p>
            </div>

            {/* Postal Code */}

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="mb-2 text-sm text-gray-400">
                کد پستی
              </p>

              <p
                dir="ltr"
                className="text-right font-medium"
              >
                {shipping.postal_code ||
                  "-"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* -------------------------------- */}
        {/* Products */}
        {/* -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e293b] shadow-md shadow-black/20"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold">
              محصولات سفارش
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {items.length} محصول در این سفارش
            </p>
          </div>

          {items.length === 0 ? (
            <div className="border-t border-white/10 p-8 text-center text-sm text-gray-500">
              محصولی برای این سفارش ثبت نشده است.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-right">
                <thead>
                  <tr className="border-y border-white/10 bg-white/5 text-sm text-gray-400">
                    <th className="px-6 py-4">
                      محصول
                    </th>

                    <th className="px-6 py-4">
                      تعداد
                    </th>

                    <th className="px-6 py-4">
                      قیمت واحد
                    </th>

                    <th className="px-6 py-4">
                      جمع
                    </th>

                    <th className="px-6 py-4">
                      وضعیت
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map(
                    (item, index) => {
                      const itemStatus =
                        getStatusConfig(
                          item.status,
                          item.status_fa
                        );

                      const quantity =
                        Number(
                          item.quantity
                        ) || 0;

                      const unitPrice =
                        Number(
                          String(
                            item.unit_price ||
                              "0"
                          ).replace(
                            /,/g,
                            ""
                          )
                        ) || 0;

                      const itemTotal =
                        unitPrice *
                        quantity;

                      return (
                        <motion.tr
                          key={`${item.product_title}-${index}`}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              0.05 *
                              index,
                          }}
                          className="border-b border-white/10 transition-colors hover:bg-white/5"
                        >
                          <td className="px-6 py-5">
                            <p className="font-medium text-white">
                              {item.product_title ||
                                "-"}
                            </p>
                          </td>

                          <td className="px-6 py-5 text-gray-300">
                            {quantity.toLocaleString(
                              "fa-IR"
                            )}
                          </td>

                          <td className="px-6 py-5 text-gray-300">
                            {formatPrice(
                              item.unit_price
                            )}

                            <span className="mr-1 text-xs text-gray-500">
                              تومان
                            </span>
                          </td>

                          <td className="px-6 py-5 font-semibold text-white">
                            {formatPrice(
                              itemTotal
                            )}

                            <span className="mr-1 text-xs font-normal text-gray-500">
                              تومان
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${itemStatus.className}`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />

                              {
                                itemStatus.label
                              }
                            </div>
                          </td>
                        </motion.tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* -------------------------------- */}
        {/* Order Summary */}
        {/* -------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 shadow-md shadow-black/20"
        >
          <h2 className="mb-6 text-xl font-bold">
            خلاصه سفارش
          </h2>

          <div className="space-y-4">
            {/* Subtotal */}

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-gray-400">
                مبلغ کالاها
              </span>

              <span className="font-medium">
                {formatPrice(
                  order.subtotal
                )}

                <span className="mr-1 text-xs text-gray-500">
                  تومان
                </span>
              </span>
            </div>

            {/* Discount */}

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-gray-400">
                تخفیف
              </span>

              <span className="font-medium text-green-400">
                {formatPrice(
                  order.discount_total
                )}

                <span className="mr-1 text-xs">
                  تومان
                </span>
              </span>
            </div>

            {/* Shipping */}

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-gray-400">
                هزینه ارسال
              </span>

              <span className="font-medium">
                {formatPrice(
                  order.shipping_total
                )}

                <span className="mr-1 text-xs text-gray-500">
                  تومان
                </span>
              </span>
            </div>

            {/* Final */}

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold">
                مبلغ نهایی
              </span>

              <span className="text-xl font-bold text-white">
                {formatPrice(
                  order.final_total
                )}

                <span className="mr-1 text-sm font-normal text-gray-400">
                  تومان
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}