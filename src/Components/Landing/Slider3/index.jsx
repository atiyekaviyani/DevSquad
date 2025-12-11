// // import { useEffect, useState } from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import { Navigation } from "swiper/modules";
// // import { GoArrowUpRight } from "react-icons/go";

// // export default function ProductsSlider() {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     // 📌 API خودت را اینجا قرار بده
// //     fetch("https://fakestoreapi.com/products?limit=4")
// //       .then((res) => res.json())
// //       .then((data) => setProducts(data));
// //   }, []);

// //   return (
// //     <div className="w-full px-6 md:px-12 lg:px-20 py-10">
// //       {/* Title */}
// //       <div className="flex items-center justify-between mb-6 w-[90%] m-auto">
// //         <button
// //           className="border border-gray-400 px-4 py-1 rounded-full text-sm
// //                     transition duration-300 ease-in-out
// //                     hover:bg-gray-100 hover:text-gray-800 hover:shadow-md
// //                     flex gap-2 h-10 items-center"
// //         >
// //           <GoArrowUpRight size={20} />
// //           مشاهده بیشتر
// //         </button>

// //         <div>
// //           <h2 className="text-3xl font-extrabold text-gray-900">
// //             محصولات ویژه
// //           </h2>
// //           <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
// //         </div>
// //       </div>

// //       {/* Slider */}
// //       <Swiper
// //         modules={[Navigation]}
// //         navigation
// //         spaceBetween={20}
// //         slidesPerView={1.2}
// //         breakpoints={{
// //           640: { slidesPerView: 2 },
// //           1024: { slidesPerView: 4 },
// //         }}
// //         className="pb-8"
// //       >
// //         {products.map((product) => (
// //           <SwiperSlide
// //             key={product.id}
// //             className="bg-white rounded-lg shadow-sm p-4 cursor-pointer
// //                        transition hover:shadow-md"
// //           >
// //             {" "}
// //             {/* New badge */}
// //             <div className="mt-3">
// //               <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
// //                 جدید
// //               </span>
// //             </div>
// //             {/* Image */}
// //             <div className="w-full h-60 flex items-center justify-center overflow-hidden">
// //               <img
// //                 src={product.image}
// //                 className="object-contain w-full h-full"
// //                 alt=""
// //               />
// //             </div>
// //             <div
// //               className="flex flex-col items-end">
// //               {/* Star Rating */}

// //               {/* Title */}
// //               <p className="mt-2 text-gray-600 text-sm">
// //                 {product.title.slice(0, 35)}
// //               </p>
// //               {/* Price */}
// //               <p className="font-bold text-lg mt-1 text-gray-900">
// //                 {(product.price * 50_000).toLocaleString()} تومان
// //               </p>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { GoArrowUpRight } from "react-icons/go";
// import { FaStar, FaRegStar } from "react-icons/fa";

// // کامپوننت ستاره تعاملی
// function RatingStars({ count, onChange }) {
//   const totalStars = 5;

//   return (
//     <div className="flex gap-1 mt-2 select-none">
//       {[...Array(totalStars)].map((_, i) => {
//         const starIndex = i + 1;
//         const filled = starIndex <= count;
//         return (
//           <button
//             key={i}
//             type="button"
//             onClick={() => onChange(starIndex)}
//             className="focus:outline-none"
//             aria-label={`${starIndex} ستاره`}
//           >
//             {filled ? (
//               <FaStar className="text-yellow-400" />
//             ) : (
//               <FaRegStar className="text-yellow-400" />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function ProductsSlider() {
//   const [products, setProducts] = useState([]);
//   // نگهداری ستاره های هر محصول (id: count)
//   const [ratings, setRatings] = useState({});

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=4")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   // تغییر تعداد ستاره برای محصول خاص
//   const handleRatingChange = (productId, newCount) => {
//     setRatings((prev) => ({
//       ...prev,
//       [productId]: newCount,
//     }));
//   };

//   return (
//     <div className="m-auto px-6 md:px-12 lg:px-20 py-10">
//       {/* Title */}
//       <div className="flex items-center justify-between mb-6 ml-10 m-auto">
//         <button
//           className="border border-gray-400 px-4 py-1 rounded-full text-sm
//                     transition duration-300 ease-in-out
//                     hover:bg-gray-100 hover:text-gray-800 hover:shadow-md
//                     flex gap-2 h-10 items-center"
//         >
//           <GoArrowUpRight size={20} />
//           مشاهده بیشتر
//         </button>

//       <div className="text-right">
//   <h2 className="text-3xl font-extrabold text-gray-900">
//     محصولات ویژه
//   </h2>
//   <p className="text-gray-500 mt-1">
//     جدیدترین کالکشن های فروشگاه لونا
//   </p>
// </div>

//       </div>

//       {/* Slider */}
//       <Swiper
//         modules={[Navigation]}
//         navigation
//         spaceBetween={20}
//         slidesPerView={1.2}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         className="pb-8"
//       >
//         {products.map((product) => {
//           // تعداد ستاره پیشفرض یا مقدار ذخیره شده
//           const currentRating =
//             ratings[product.id] ?? Math.floor(product.rating?.rate || 0);

//           return (
//             <SwiperSlide
//               key={product.id}
//               className="bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer
//                        transition hover:shadow-md"
//             >
//               {" "}
//               {/* New badge */}
//               <div className="mt-3">
//                 <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
//                   جدید
//                 </span>
//               </div>
//               {/* Image */}
//               <div className="w-full h-60 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.image}
//                   className="object-contain w-full h-full"
//                   alt=""
//                 />
//               </div>
//               <div className="flex flex-col items-end">
//                 {/* ستاره تعاملی */}
//                 <RatingStars
//                   count={currentRating}
//                   onChange={(newCount) =>
//                     handleRatingChange(product.id, newCount)
//                   }
//                 />

//                 <div className="flex flex-col items-end">
//                   {/* Title */}
//                   <p className="mt-2 text-gray-600 text-sm">
//                     {product.title.slice(0, 35)}
//                   </p>
//                   {/* Price */}
//                   <p className="font-bold text-sm mt-1 text-gray-900">
//                     {(product.price * 50_000).toLocaleString()} تومان
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

// ستاره تعاملی
function RatingStars({ count, onChange }) {
  const totalStars = 5;

  return (
    <div className="flex gap-1 mt-2 select-none">
      {[...Array(totalStars)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <button
            key={i}
            onClick={() => onChange(starIndex)}
            className="focus:outline-none"
          >
            {starIndex <= count ? (
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

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});

  // 👉 رفرنس دکمه‌های کاستوم
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRatingChange = (id, count) => {
    setRatings((prev) => ({ ...prev, [id]: count }));
  };

  return (
    <div className="relative px-6 md:px-12 lg:px-20 py-10">
      {/* Title */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-6 m-auto w-full px-4">
        <button
          className="border border-gray-400 px-4 py-1 rounded-full text-sm
           transition duration-300 ease-in-out
           hover:bg-gray-100 hover:text-gray-800 hover:shadow-md 
           flex gap-2 h-10 items-center 
           mt-4 md:mt-0 self-start md:self-auto"
        >
          <GoArrowUpRight size={20} />
          مشاهده بیشتر
        </button>

        <div className="text-right w-full md:w-auto">
          <h2 className="text-3xl font-extrabold text-gray-900">
            محصولات ویژه
          </h2>
          <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <button
          ref={prevBtn}
          className="w-10 h-10 flex items-center justify-center border-2
                     hover:scale-110 transition text-gray-700"
        >
          <IoChevronBack size={22} />
        </button>

        <button
          ref={nextBtn}
          className="w-10 h-10 flex items-center justify-center border-2
                     hover:scale-110 transition text-gray-700"
        >
          <IoChevronForward size={22} />
        </button>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: nextBtn.current,
          prevEl: prevBtn.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = nextBtn.current;
          swiper.params.navigation.prevEl = prevBtn.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="pb-8 mt-4"
      >
        {products.map((product) => {
          const currentRating =
            ratings[product.id] ?? Math.floor(product.rating?.rate || 0);

          return (
            <SwiperSlide
              key={product.id}
              className="bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer 
                       transition hover:shadow-md"
            >
              <div className="mt-3">
                <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
                  جدید
                </span>
              </div>

              <div className="w-full h-60 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  className="object-contain w-full h-full"
                  alt=""
                />
              </div>

              <div className="flex flex-col items-end">
                <RatingStars
                  count={currentRating}
                  onChange={(c) => handleRatingChange(product.id, c)}
                />

                <p className="mt-2 text-gray-600 text-sm">
                  {product.title.slice(0, 35)}
                </p>

                <p className="font-bold text-sm mt-1 text-gray-900">
                  {(product.price * 50_000).toLocaleString()} تومان
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
