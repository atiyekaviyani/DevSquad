import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";

import FavoriteCard from "../../Panel/FavoriteCard";
import { useNavigate } from "react-router-dom";
import {
  getFavorites,
  deleteFavorite,
} from "../../../Core/Services/api/favoriteApi";

export default function UltraPremiumFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFavorites();

      console.log("FAVORITES RESPONSE:", response);
      console.log("FAVORITES DATA:", response?.data);

      const favoritesData = Array.isArray(response?.data)
        ? response.data.flat().filter(Boolean)
        : [];

      console.log("FINAL FAVORITES DATA:", favoritesData);

      setFavorites(favoritesData);
    } catch (err) {
      console.error("Favorites Error:", err);

      setError(err?.message || "دریافت علاقه‌مندی‌ها با خطا مواجه شد.");

      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleDeleteFavorite = async (e, favoriteId) => {
    if (e) {
      e.stopPropagation();
      console.log("DELETE CLICKED");
      console.log("FAVORITE ID:", favoriteId);
    }

    if (!favoriteId) {
      return;
    }

    try {
      setDeletingId(favoriteId);
      setError("");

      await deleteFavorite(favoriteId);

      setFavorites((prev) => prev.filter((item) => item?.id !== favoriteId));

      if (selectedItem?.id === favoriteId) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error("Delete Favorite Error:", err);

      setError(err?.message || "حذف محصول از علاقه‌مندی‌ها با خطا مواجه شد.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewDetails = (item) => {
    if (!item) {
      return;
    }

    setSelectedItem(item);
  };

  return (
    <div className="p-6">
      <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 to-white/5">
        <div className="bg-black/60 dark:bg-neutral-900 backdrop-blur-2xl text-white rounded-[32px] p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold tracking-wide">
              علاقه‌مندی‌ها
            </h2>

            <span className="text-sm text-gray-400">
              {favorites.length} محصول
            </span>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[420px] rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <Heart size={36} className="text-gray-600" />
              </div>

              <h3 className="text-lg font-semibold mb-2">
                لیست علاقه‌مندی‌ها خالی است
              </h3>

              <p className="text-sm text-gray-500">
                محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item, index) => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  index={index}
                  onDelete={handleDeleteFavorite}
                  onViewDetails={handleViewDetails}
                  deletingId={deletingId}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-neutral-900 text-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
                onClick={() => setSelectedItem(null)}
              >
                <X size={22} />
              </button>

              {selectedItem.images?.length > 0 && (
                <div className="w-full h-60 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={
                      selectedItem.images.find((image) => image?.is_main === 1)
                        ?.path || selectedItem.images[0]?.path
                    }
                    alt={selectedItem.name || "محصول"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold mb-4">
                {selectedItem.name || "محصول بدون نام"}
              </h3>

              <p className="mb-4 text-gray-300 leading-7">
                {selectedItem.description ||
                  "توضیحی برای این محصول ثبت نشده است."}
              </p>

              <div className="font-bold text-lg mb-4">
                {Number(selectedItem.price || 0).toLocaleString("fa-IR")} تومان
              </div>

              <div className="text-sm text-gray-400 mb-2">
                دسته‌بندی:{" "}
                <span className="text-gray-200">
                  {selectedItem.category?.name || "-"}
                </span>
              </div>

              <div className="text-sm text-gray-400 mb-2">
                برند:{" "}
                <span className="text-gray-200">
                  {selectedItem.brand?.name || "-"}
                </span>
              </div>

              <div className="text-sm text-yellow-400 mb-5">
                امتیاز: {selectedItem.rating ?? 0}
              </div>

              <button
                type="button"
                onClick={() => navigate(`/ProductDetail/${selectedItem.id}`)}
                className="mt-3 w-full px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-all font-medium"
              >
                مشاهده صفحه کامل محصول
              </button>

              <button
                type="button"
                onClick={(e) => handleDeleteFavorite(e, selectedItem.id)}
                disabled={deletingId === selectedItem.id}
                className="mt-3 w-full px-5 py-3 rounded-xl text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === selectedItem.id
                  ? "در حال حذف..."
                  : "حذف از علاقه‌مندی‌ها"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
