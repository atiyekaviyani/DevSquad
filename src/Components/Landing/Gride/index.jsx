import { useEffect, useState, useContext } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CartContext } from "../../../context/CartContext";

/* ================= Rating Stars ================= */
function RatingStars({ count, onChange }) {
  return (
    <div className="flex gap-1 mt-1 select-none">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`${index} ستاره`}
          >
            {index <= count ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-yellow-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ================= Product Grid ================= */
export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [addedIds, setAddedIds] = useState({}); // نگهداری وضعیت افزودن برای هر محصول

  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRatingChange = (id, rating) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const handleAddToCart = (product) => {
    // اگر قبلاً اضافه شده بود، هیچ کاری نکن
    if (addedIds[product.id]) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: Math.floor(product.price * 60000),
      image: product.image,
      quantity: 1,
    });

    // به عنوان "اضافه شده" علامت بزن
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    // نمایش پیام Toast کلی
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    // بعد از 3 ثانیه وضعیت "اضافه شده" را حذف کن تا بتوان دوباره کلیک کرد
    setTimeout(() => {
      setAddedIds((prev) => {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      });
    }, 3000);
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 py-10 mt-20 relative">
      <button
        className="border mb-10 border-gray-400 px-4 py-1 rounded-full text-sm
                   transition duration-300 ease-in-out
                   hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
                   flex gap-2 h-10 items-center -ml-10"
        aria-label="مشاهده بیشتر"
        type="button"
      >
        <GoArrowUpRight size={20} />
        مشاهده بیشتر
      </button>
      {/* Toast */}
      {showToast && (
        <div
          className="
            fixed bottom-6 right-6 z-50
            bg-gray-900 text-white
            px-4 py-3 rounded-lg
            shadow-lg text-sm
            animate-fadeIn
          "
        >
          ✅ به سبد خرید اضافه شد
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          const currentRating =
            ratings[item.id] ?? Math.floor(item.rating?.rate || 0);

          // آیا محصول الان اضافه شده؟
          const isAdded = addedIds[item.id] === true;

          return (
            <div
              key={item.id}
              className="
                group relative bg-[#ececec]
                rounded-xl p-3
                shadow-sm hover:shadow-lg transition
                flex flex-col
              "
            >
              {/* تخفیف */}
              <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                15%
              </span>

              {/* تصویر */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-contain"
              />

              {/* محتوا */}
              <div className="flex flex-col items-end flex-1 mt-2">
                {/* <RatingStars
                  count={currentRating}
                  onChange={(val) => handleRatingChange(item.id, val)}
                /> */}

                <p className="text-sm text-gray-700 mt-2 h-12 overflow-hidden text-right">
                  {item.title}
                </p>

                <span className="text-xs text-gray-500 mt-1">
                  کد محصول: <b>LN-{item.id}</b>
                </span>

                <p className="text-sm font-bold text-gray-900 mt-2">
                  {Math.floor(item.price * 60000).toLocaleString()} تومان
                </p>
              </div>

              {/* دکمه خرید – دسکتاپ hover */}
              <button
                onClick={() => handleAddToCart(item)}
                disabled={isAdded}
                className={`
                  hidden sm:flex
                  absolute bottom-3 left-3 right-3
                  py-2 rounded-lg text-sm font-semibold
                  items-center justify-center gap-2
                  transition-all duration-300
                  ${
                    isAdded
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-gray-900 text-white group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-3"
                  }
                `}
              >
                {isAdded ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
                <GoArrowUpRight size={18} />
              </button>

              {/* دکمه خرید – موبایل */}
              <button
                onClick={() => handleAddToCart(item)}
                disabled={isAdded}
                className={`
                  sm:hidden mt-3 py-2 rounded-lg text-sm font-semibold
                  flex items-center justify-center gap-2
                  ${isAdded ? "bg-green-600 cursor-not-allowed" : "bg-gray-900"}
                  text-white
                `}
              >
                {isAdded ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
                <GoArrowUpRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
