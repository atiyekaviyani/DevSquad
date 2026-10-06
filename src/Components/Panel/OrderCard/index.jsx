// const orders = [
//   { id: "#1234", status: "processing", date: "1404/12/10", price: "1,200,000" },
//   { id: "#1235", status: "delivered", date: "1404/12/09", price: "890,000" },
//   { id: "#1236", status: "cancelled", date: "1404/12/08", price: "450,000" },
// ];

// const statusColor = {
//   processing: "bg-yellow-400/20 text-yellow-400",
//   delivered: "bg-green-400/20 text-green-400",
//   cancelled: "bg-red-400/20 text-red-400",
// };

// export default function RecentOrders() {
//   return (
//     <div className="bg-black/40 backdrop-blur-xl text-white rounded-[28px] p-6 border border-white/10 shadow-lg">
//       <h2 className="text-lg mb-6 font-medium">آخرین سفارش‌ها</h2>

//       <div className="space-y-4">
//         {orders.map(order => (
//           <div key={order.id}
//             className="flex flex-col md:flex-row md:items-center justify-between gap-4
//             bg-white/5 p-4 rounded-2xl">

//             <div>
//               <p className="font-medium">{order.id}</p>
//               <p className="text-sm text-gray-400">{order.date}</p>
//             </div>

//             <div className={`px-3 py-1 text-sm rounded-full ${statusColor[order.status]}`}>
//               {order.status === "processing" && "در حال پردازش"}
//               {order.status === "delivered" && "تحویل داده شد"}
//               {order.status === "cancelled" && "لغو شده"}
//             </div>

//             <div className="font-medium">{order.price} تومان</div>

//             <button className="px-4 py-2 bg-[#1e293b] hover:bg-[#0f172a] rounded-xl text-sm text-white transition">
//               مشاهده جزئیات
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { motion } from "framer-motion";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";

// const orders = [
//   { id: "#1234", status: "processing", date: "1404/12/10", price: "1,200,000" },
//   { id: "#1235", status: "delivered", date: "1404/12/09", price: "890,000" },
//   { id: "#1236", status: "cancelled", date: "1404/12/08", price: "450,000" },
// ];

// const statusConfig = {
//   processing: {
//     label: "در حال پردازش",
//     class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
//     dot: "bg-yellow-400",
//   },
//   delivered: {
//     label: "تحویل داده شد",
//     class: "bg-green-500/10 text-green-400 border-green-500/30",
//     dot: "bg-green-400",
//   },
//   cancelled: {
//     label: "لغو شده",
//     class: "bg-red-500/10 text-red-400 border-red-500/30",
//     dot: "bg-red-400",
//   },
// };

// export default function PremiumRecentOrders() {
//   return (
//     <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-white/5">
//       <div className="bg-black/60 backdrop-blur-2xl text-white rounded-[32px] p-8 border border-white/10 shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-semibold tracking-wide">
//             آخرین سفارش‌ها
//           </h2>
          
//         </div>

//         {/* Orders */}
//         <div className="space-y-5">
//           {orders.map((order, index) => (
//             <motion.div
//               key={order.id}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -4 }}
//               className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6
//               bg-white/5 hover:bg-white/10 transition-all duration-300
//               p-5 rounded-2xl border border-white/10 hover:border-white/20"
//             >
//               {/* Order Info */}
//               <div>
//                 <p className="font-semibold text-lg">{order.id}</p>
//                 <p className="text-sm text-gray-400 mt-1">{order.date}</p>
//               </div>

//               {/* Status */}
//               <div
//                 className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-full border ${statusConfig[order.status].class}`}
//               >
//                 <span
//                   className={`w-2 h-2 rounded-full ${statusConfig[order.status].dot} animate-pulse`}
//                 ></span>
//                 {statusConfig[order.status].label}
//               </div>

//               {/* Price */}
//               <div className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                 {order.price} تومان
//               </div>

//               {/* Button */}
//               <Link to={`orders/${order.id}`}>
//                 <button
//                   className="relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-medium
//                 bg-gradient-to-r from-slate-800 to-slate-900
//                 hover:from-slate-700 hover:to-slate-800
//                 transition-all duration-300 flex items-center gap-2"
//                 >
//                   مشاهده جزئیات
//                   <ArrowLeft
//                     size={16}
//                     className="group-hover:-translate-x-1 transition"
//                   />
//                   {/* Shimmer Effect */}
//                   <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
//                 </button>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getOrders } from "../../../Core/Services/api/orderApi";

const statusConfig = {
  pending_payment: {
    label: "در انتظار پرداخت",
    class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-400",
  },

  processing: {
    label: "در حال پردازش",
    class: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },

  paid: {
    label: "پرداخت شده",
    class: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },

  shipped: {
    label: "ارسال شده",
    class: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    dot: "bg-purple-400",
  },

  delivered: {
    label: "تحویل داده شد",
    class: "bg-green-500/10 text-green-400 border-green-500/30",
    dot: "bg-green-400",
  },

  canceled: {
    label: "لغو شده",
    class: "bg-red-500/10 text-red-400 border-red-500/30",
    dot: "bg-red-400",
  },

  cancelled: {
    label: "لغو شده",
    class: "bg-red-500/10 text-red-400 border-red-500/30",
    dot: "bg-red-400",
  },
};

const getStatusConfig = (status, statusFa) => {
  if (statusConfig[status]) {
    return statusConfig[status];
  }

  return {
    label: statusFa || status || "نامشخص",
    class: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    dot: "bg-gray-400",
  };
};

const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") {
    return "0";
  }

  const numericPrice = Number(String(price).replace(/,/g, ""));

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

export default function PremiumRecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrders();

        /*
          پاسخ API:

          {
            status: true,
            message: "...",
            data: [
              {
                id: 3,
                order_number: "3393270408",
                subtotal: "5,950,000",
                discount_total: "0",
                shipping_total: "50,000",
                final_total: "6,000,000",
                status: "pending_payment",
                status_fa: "در انتظار پرداخت"
              }
            ]
          }
        */

        const data = Array.isArray(response?.data)
          ? response.data
          : [];

        setOrders(data);
      } catch (err) {
        console.error("Orders Error:", err);

        setError("دریافت سفارش‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-white/5">
        <div className="rounded-[32px] bg-black/60 p-8 text-white shadow-2xl backdrop-blur-2xl border border-white/10">
          <div className="flex flex-col items-center justify-center gap-4 py-14">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-white" />

            <p className="text-sm text-gray-400">
              در حال دریافت سفارش‌ها...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-white/5"
      dir="rtl"
    >
      <div className="rounded-[32px] bg-black/60 p-5 text-white shadow-2xl backdrop-blur-2xl border border-white/10 sm:p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-wide">
            آخرین سفارش‌ها
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-14 text-center">
            <p className="text-base font-medium text-white">
              هنوز سفارشی ثبت نکرده‌اید
            </p>

            <p className="mt-2 text-sm text-gray-500">
              سفارش‌های شما در این قسمت نمایش داده می‌شوند.
            </p>
          </div>
        )}

        {/* Orders */}
        {orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order, index) => {
              const status = getStatusConfig(
                order.status,
                order.status_fa
              );

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="
                    group
                    relative
                    flex
                    flex-col
                    gap-6
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/10
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >
                  {/* Order Info */}
                  <div>
                    <p className="text-lg font-semibold">
                      {formatOrderNumber(order.order_number)}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      سفارش شماره {order.id}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-4
                      py-1.5
                      text-sm
                      ${status.class}
                    `}
                  >
                    <span
                      className={`
                        h-2
                        w-2
                        rounded-full
                        ${status.dot}
                        animate-pulse
                      `}
                    />

                    {status.label}
                  </div>

                  {/* Price */}
                  <div className="font-bold text-lg">
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {formatPrice(order.final_total)}
                    </span>

                    <span className="mr-1 text-sm font-normal text-gray-500">
                      تومان
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/Panel/orders/${order.id}`}
                    className="
                      relative
                      overflow-hidden
                      rounded-xl
                      bg-gradient-to-r
                      from-slate-800
                      to-slate-900
                      px-5
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      hover:from-slate-700
                      hover:to-slate-800
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      مشاهده جزئیات

                      <ArrowLeft
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </span>

                    {/* Shimmer Effect */}
                    <span
                      className="
                        absolute
                        inset-0
                        translate-x-[-100%]
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        transition
                        duration-700
                        group-hover:translate-x-[100%]
                      "
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}