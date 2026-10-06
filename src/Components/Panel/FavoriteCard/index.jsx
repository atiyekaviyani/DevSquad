import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";

export default function FavoriteCard({
  item,
  index = 0,
  onDelete,
  onViewDetails,
  deletingId,
}) {
  // اگر آیتم وجود نداشت، چیزی رندر نکن
  if (!item) {
    return null;
  }

  const images = Array.isArray(item.images)
    ? item.images
    : [];

  const mainImage =
    images.find(
      (image) => image?.is_main === 1
    )?.path ||
    images[0]?.path ||
    null;

  const isDeleting =
    deletingId === item.id;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.1,
      }}
      whileHover={{
        y: -4,
      }}
      onClick={() =>
        onViewDetails?.(item)
      }
      className="group relative bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-3 cursor-pointer"
    >
      {/* تصویر محصول */}
      <div className="w-full h-56 rounded-xl overflow-hidden bg-white/5">
        {mainImage ? (
          <img
            src={mainImage}
            alt={item.name || "محصول"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            تصویر ندارد
          </div>
        )}
      </div>

      {/* نام و حذف */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-lg truncate">
          {item.name || "محصول بدون نام"}
        </h3>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e, item.id);
          }}
          disabled={isDeleting}
          className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <span className="text-xs">
              ...
            </span>
          ) : (
            <X size={18} />
          )}
        </button>
      </div>

      {/* قیمت */}
      <div className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        {Number(
          item.price || 0
        ).toLocaleString("fa-IR")}{" "}
        تومان
      </div>

      {/* دسته بندی و برند */}
      {(item.category?.name ||
        item.brand?.name) && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {item.category?.name && (
            <span>
              {item.category.name}
            </span>
          )}

          {item.category?.name &&
            item.brand?.name && (
              <span>•</span>
            )}

          {item.brand?.name && (
            <span>
              {item.brand.name}
            </span>
          )}
        </div>
      )}

      {/* امتیاز */}
      <div className="flex items-center gap-1 text-sm text-yellow-400">
        <span>★</span>

        <span>
          {item.rating ?? 0}
        </span>
      </div>

      {/* توضیحات */}
      {item.description && (
        <p className="text-sm text-gray-500 line-clamp-2 leading-6">
          {item.description}
        </p>
      )}

      {/* دکمه مشاهده جزئیات */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails?.(item);
        }}
        className="mt-auto relative overflow-hidden px-5 py-3 rounded-xl text-sm font-medium
        bg-gradient-to-r from-slate-800 to-slate-900
        hover:from-slate-700 hover:to-slate-800
        transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Heart
          size={16}
          className="text-red-400"
        />

      مشاهده جزئیات

        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700" />
      </button>
    </motion.div>
  );
}