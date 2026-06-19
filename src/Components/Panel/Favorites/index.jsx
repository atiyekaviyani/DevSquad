import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

const favorites = [
  {
    id: "#001",
    name: "هودی خاکستری",
    price: "1,200,000",
    inStock: true,
    description: "این هودی از جنس پنبه با کیفیت بالا و راحت است.",
  },
  {
    id: "#002",
    name: "کفش اسپرت مشکی",
    price: "890,000",
    inStock: false,
    description: "کفش اسپرت با طراحی ارگونومیک و راحتی کامل.",
  },
  {
    id: "#003",
    name: "تی‌شرت سفید",
    price: "450,000",
    inStock: true,
    description: "تی‌شرت سبک و مناسب برای استفاده روزمره.",
  },
];

export default function UltraPremiumFavorites() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="p-6">
      <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-white/5">
        <div className="bg-black/60 dark:bg-neutral-900 backdrop-blur-2xl text-white rounded-[32px] p-8 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold tracking-wide">
              علاقه‌مندی‌ها
            </h2>
            <button className="text-sm text-gray-400 hover:text-white transition">
              مشاهده همه
            </button>
          </div>

          {/* Favorites Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-3 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Product Info */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition">
                    <X size={16} />
                  </button>
                </div>

                {/* Price */}
                <div className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {item.price} تومان
                </div>

                {/* Stock Badge */}
                <div
                  className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full border ${
                    item.inStock
                      ? "bg-green-500/10 text-green-400 border-green-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.inStock ? "bg-green-400" : "bg-red-400"
                    } animate-pulse`}
                  ></span>
                  {item.inStock ? "موجود" : "ناموجود"}
                </div>

                {/* Favorite Button */}
                <button
                  className="mt-3 relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-slate-800 to-slate-900
                  hover:from-slate-700 hover:to-slate-800
                  transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Heart size={16} className="text-red-400" />
                  مشاهده جزئیات
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Product Details */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-neutral-900 text-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedItem(null)}
              >
                <X size={22} />
              </button>

              <h3 className="text-xl font-semibold mb-4">
                {selectedItem.name}
              </h3>
              <p className="mb-4">{selectedItem.description}</p>
              <div className="font-bold text-lg mb-4">
                {selectedItem.price} تومان
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full border ${
                  selectedItem.inStock
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedItem.inStock ? "bg-green-400" : "bg-red-400"
                  } animate-pulse`}
                ></span>
                {selectedItem.inStock ? "موجود" : "ناموجود"}
              </div>

              <button className="mt-5 w-full px-5 py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all font-medium">
                افزودن به سبد خرید
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
