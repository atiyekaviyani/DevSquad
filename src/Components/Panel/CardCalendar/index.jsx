import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import jalaliday from "jalaliday";

import { getOrders } from "../../../Core/Services/api/orderApi";

dayjs.extend(customParseFormat);
dayjs.extend(jalaliday);
dayjs.calendar("jalali");

export default function CalendarCard() {
  const today = dayjs();

  const [currentMonth, setCurrentMonth] = useState(today.startOf("month"));

  const [selectedDate, setSelectedDate] = useState(today);

  const [viewMode, setViewMode] = useState("month");

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ----------------------------------
  // دریافت سفارش‌ها از API
  // ----------------------------------
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrders();

        console.log(
          "CALENDAR ORDERS RESPONSE:",
          JSON.stringify(response, null, 2),
        );

        console.log("ORDERS DATA:", response?.data);

        console.log("FIRST ORDER:", response?.data?.[0]);

        const data = Array.isArray(response?.data) ? response.data : [];

        setOrders(data);
      } catch (err) {
        console.error("CALENDAR ORDERS ERROR:", err);

        setError("دریافت سفارش‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // ----------------------------------
  // تعداد روزهای ماه
  // ----------------------------------
  const daysInMonth = currentMonth.daysInMonth();

  const startDay = currentMonth.startOf("month").day();

  // ----------------------------------
  // ساخت روزهای تقویم
  // ----------------------------------
  const generateDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(currentMonth.date(d));
    }

    return days;
  };

  const days = generateDays();

  // ----------------------------------
  // رفتن به ماه بعد
  // ----------------------------------
  const goNext = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  // ----------------------------------
  // رفتن به ماه قبل
  // ----------------------------------
  const goPrev = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  // ----------------------------------
  // بررسی امروز
  // ----------------------------------
  const isToday = (date) => {
    return date?.isSame(today, "day");
  };

  // ----------------------------------
  // بررسی روز انتخاب شده
  // ----------------------------------
  const isSelected = (date) => {
    return date?.isSame(selectedDate, "day");
  };

  // ----------------------------------
  // تاریخ سفارش
  // API:
  // paid_at = "2026-09-06 13:42:48"
  // ----------------------------------
  const getOrderDate = (order) => {
    if (!order?.paid_at) return null;

    const parsedDate = dayjs(order.paid_at, "YYYY-MM-DD HH:mm:ss");

    return parsedDate.isValid() ? parsedDate : null;
  };

  // ----------------------------------
  // سفارش‌های یک روز خاص
  // ----------------------------------
  const getOrdersForDate = (date) => {
    if (!date) return [];

    return orders.filter((order) => {
      const orderDate = getOrderDate(order);

      if (!orderDate) return false;

      return orderDate.isSame(date, "day");
    });
  };

  // ----------------------------------
  // سفارش‌های روز انتخاب شده
  // ----------------------------------
  const selectedDayOrders = getOrdersForDate(selectedDate);

  return (
    <div
      className="
        relative
        bg-white/5
        backdrop-blur-2xl
        rounded-[32px]
        p-6
        border
        border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        overflow-hidden
      "
    >
      {/* نور متحرک */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          top-0
          left-0
          w-1/2
          h-full
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          blur-3xl
          opacity-20
        "
      />

      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
          relative
          z-10
        "
      >
        {/* حالت نمایش */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("month")}
            className={`
              px-3
              py-1
              rounded-xl
              text-sm
              ${
                viewMode === "month"
                  ? "bg-[#1e293b]"
                  : "bg-black/30 hover:bg-black/50"
              }
            `}
          >
            ماه
          </button>

          <button
            onClick={() => setViewMode("week")}
            className={`
              px-3
              py-1
              rounded-xl
              text-sm
              ${
                viewMode === "week"
                  ? "bg-[#1e293b]"
                  : "bg-black/30 hover:bg-black/50"
              }
            `}
          >
            هفته
          </button>
        </div>

        {/* تغییر ماه */}
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            className="
              p-2
              rounded-xl
              bg-black/40
              hover:bg-black/60
              transition
            "
          >
            <ChevronRight size={18} />
          </button>

          <h2 className="text-lg font-medium">
            {currentMonth.format("MMMM YYYY")}
          </h2>

          <button
            onClick={goNext}
            className="
              p-2
              rounded-xl
              bg-black/40
              hover:bg-black/60
              transition
            "
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* خطا */}
      {error && (
        <div
          className="
            mb-4
            rounded-xl
            border
            border-red-400/20
            bg-red-500/10
            p-3
            text-sm
            text-red-300
            relative
            z-10
          "
        >
          {error}
        </div>
      )}

      {/* روزهای هفته */}
      <div
        className="
          grid
          grid-cols-7
          text-center
          text-xs
          text-white/50
          mb-4
          relative
          z-10
        "
      >
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.format("YYYY-MM")}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -40,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            grid
            grid-cols-7
            gap-2
            relative
            z-10
          "
        >
          {days.map((date, i) => {
            const dayOrders = getOrdersForDate(date);

            const hasOrders = dayOrders.length > 0;

            return (
              <div key={i} className="flex justify-center">
                {date ? (
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={`
                      relative
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-2xl
                      text-sm
                      transition-all
                      duration-300

                      ${
                        isToday(date)
                          ? "bg-[#1e293b] shadow-lg"
                          : "hover:bg-white/10"
                      }

                      ${isSelected(date) ? "ring-2 ring-[#334155]" : ""}
                    `}
                  >
                    {date.date()}

                    {/* نقطه سفارش */}
                    {hasOrders && (
                      <span
                        className="
                          absolute
                          bottom-1
                          w-1.5
                          h-1.5
                          bg-green-400
                          rounded-full
                        "
                      />
                    )}
                  </button>
                ) : (
                  <div className="w-10 h-10" />
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* اطلاعات روز انتخاب شده */}
      <div
        className="
          mt-6
          p-4
          bg-black/40
          rounded-2xl
          border
          border-white/10
          relative
          z-10
        "
      >
        <h3 className="text-sm text-white/60 mb-2">
          {selectedDate.format("dddd DD MMMM YYYY")}
        </h3>

        {loading ? (
          <p className="text-sm text-white/40">در حال دریافت سفارش‌ها...</p>
        ) : selectedDayOrders.length > 0 ? (
          <p className="text-sm">تعداد سفارش‌ها: {selectedDayOrders.length}</p>
        ) : (
          <p className="text-sm text-white/40">سفارشی در این روز ثبت نشده</p>
        )}
      </div>
    </div>
  );
}
