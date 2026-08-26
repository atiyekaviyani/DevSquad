// // 



// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// export default function ModernProductSlider() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   return (
//     <div className="m-auto px-6 mt-20" dir="rtl">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 w-[90%] m-auto">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
//           انواع تیشرت
//         </h2>
//         <button
//           onClick={() => navigate("/store")}
//           className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded-full hover:shadow-md hover:bg-gray-100 transition duration-300 font-medium"
//         >
//           مشاهده بیشتر
//         </button>
//       </div>

//       {/* Swiper */}
//       <Swiper
//         modules={[Navigation]}
//         navigation={{ prevEl: "#prevBtn", nextEl: "#nextBtn" }}
//         spaceBetween={20}
//         slidesPerView={4}
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="pb-10"
//       >
//         {products.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div
//               onClick={() => navigate(`/ProductDetail/${item.id}`)}
//               className="group cursor-pointer flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
//             >
//               <div className="relative w-full h-64 sm:h-72 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-contain max-h-full transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <h3 className="mt-3 text-sm font-semibold text-gray-800 w-full truncate text-center">
//                 {item.title}
//               </h3>

//               <p className="mt-1 text-gray-500 text-xs text-center">
//                 کد: {item.id}
//               </p>

//               <p className="mt-1 text-gray-900 font-bold text-sm text-center">
//                 {Math.floor(item.price * 50000).toLocaleString()} تومان
//               </p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Navigation */}
//       <div className="flex justify-center gap-6 mt-6">
//         <button
//           id="prevBtn"
//           className=" rounded-full hover:bg-gray-200 text-xl transition duration-300 "
//         >
//           &#10094;
//         </button>
//         <button
//           id="nextBtn"
//           className=" rounded-full hover:bg-gray-200 text-xl transition duration-300 "
//         >
//           &#10095;
//         </button>
//       </div>
//     </div>
//   );
// }


export { default } from "./ProductSlider";