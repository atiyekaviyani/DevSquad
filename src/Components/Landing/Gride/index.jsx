import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar, FaRegStar } from "react-icons/fa";


function RatingStars({ count, onChange }) {
  const totalStars = 5;

  return (
    <div className="flex gap-1 mt-1 select-none">
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= count;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starIndex)}
            className="focus:outline-none"
            aria-label={`${starIndex} ستاره`}
          >
            {filled ? (
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

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({}); // نگهداری ستاره‌های تعاملی

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // تغییر ستاره‌ها برای محصول مشخص
  const handleRatingChange = (productId, newRating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: newRating,
    }));
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 py-10 mt-20">
      {/* سر تیتر */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="border border-gray-400 px-4 py-1 rounded-full text-sm
                    transition duration-300 ease-in-out
                    hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
                    flex gap-2 h-10 items-center"
        >
          <GoArrowUpRight size={20} />
          مشاهده بیشتر
        </button>
        <h2 className="text-xl md:text-2xl font-bold relative left">
          تخفیف ویژه لونا
        </h2>
      </div>

      {/* گرید */}
      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {products.map((item) => {
          // ستاره داینامیک: اگر ستاره جدیدی برای محصول ذخیره شده، از اون استفاده کن، در غیر این صورت مقدار API یا 0
          const currentRating = ratings[item.id] ?? Math.floor(item.rating?.rate || 0);

          return (
            <div
              key={item.id}
              className="relative border rounded-xl bg-[#ececec] p-3 shadow-sm hover:shadow-lg transition"
            >
              {/* درصد تخفیف */}
              <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                15%
              </span>

              {/* عکس */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-contain mb-1"
              />

            <div className="flex flex-col items-end">
                <RatingStars
                count={currentRating}
                onChange={(newCount) => handleRatingChange(item.id, newCount)}
              />

            
              <p className="text-sm text-gray-600 font-medium h-12 overflow-hidden mt-2">
                {item.title}
              </p>

            
              <p className="text-gray-900 text-sm mt-2">
                {Math.floor(item.price * 60000)} تومان
              </p> 
            </div>
           
            </div>
          );
        })}
      </div>
    </div>
  );
}


