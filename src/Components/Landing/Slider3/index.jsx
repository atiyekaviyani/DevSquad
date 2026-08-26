// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { GoArrowUpRight } from "react-icons/go";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { CartContext } from "../../../context/CartContext";

// function RatingStars({ count, onChange }) {
//   const totalStars = 5;
//   return (
//     <div className="flex gap-1 mt-2 select-none">
//       {[...Array(totalStars)].map((_, i) => {
//         const starIndex = i + 1;
//         return (
//           <button
//             key={i}
//             onClick={() => onChange(starIndex)}
//             className="focus:outline-none"
//             aria-label={`${starIndex} ستاره`}
//             type="button"
//           >
//             {starIndex <= count ? (
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
//   const [ratings, setRatings] = useState({});
//   const [addedStatus, setAddedStatus] = useState({});

//   const nextBtn = useRef(null);
//   const prevBtn = useRef(null);
//   const swiperRef = useRef(null);

//   const { addToCart, cartItems } = useContext(CartContext);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=4")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   useEffect(() => {
//     if (swiperRef.current && nextBtn.current && prevBtn.current) {
//       swiperRef.current.params.navigation.nextEl = nextBtn.current;
//       swiperRef.current.params.navigation.prevEl = prevBtn.current;
//       swiperRef.current.navigation.destroy();
//       swiperRef.current.navigation.init();
//       swiperRef.current.navigation.update();
//     }
//   }, [products]);

//   const handleRatingChange = (id, count) => {
//     setRatings((prev) => ({ ...prev, [id]: count }));
//   };

//   const getQuantityInCart = (productId) => {
//     const item = cartItems.find((ci) => ci.id === productId);
//     return item ? item.quantity : 0;
//   };

//   const handleAddToCart = (product) => {
//     const quantityInCart = getQuantityInCart(product.id);
//     if (quantityInCart > 0) {
//       alert("این محصول قبلاً به سبد اضافه شده است.");
//       return;
//     }

//     addToCart({
//       id: product.id,
//       title: product.title,
//       price: Math.floor(product.price * 60000),
//       image: product.image,
//       quantity: 1,
//     });

//     setAddedStatus((prev) => ({ ...prev, [product.id]: true }));

//     setTimeout(() => {
//       setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
//     }, 3000);
//   };

//   return (
//     <div className="relative px-6 md:px-12 lg:px-20 py-10">
//       {/* هدر و دکمه مشاهده بیشتر */}
//       <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-6 m-auto w-full px-4">
//         <button
//           className="border border-gray-400 px-4 py-1 rounded-full text-sm
//            transition duration-300 ease-in-out
//            hover:bg-gray-100 hover:text-gray-800 hover:shadow-md
//            flex gap-2 h-10 items-center
//            mt-4 md:mt-0 self-start md:self-auto"
//           aria-label="مشاهده بیشتر"
//           type="button"
//         >
//           <GoArrowUpRight size={20} />
//           مشاهده بیشتر
//         </button>

//         <div className="text-right w-full md:w-auto">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             محصولات ویژه
//           </h2>
//           <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
//         </div>
//       </div>

//       {/* ناوبری اسلایدر */}
//       <div className="flex justify-between items-center mt-4 px-4">
//         <button
//           ref={prevBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید قبلی"
//           type="button"
//         >
//           <IoChevronBack size={22} />
//         </button>

//         <button
//           ref={nextBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید بعدی"
//           type="button"
//         >
//           <IoChevronForward size={22} />
//         </button>
//       </div>

//       {/* اسلایدر */}
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={20}
//         slidesPerView={1.2}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         className="pb-8 mt-4"
//       >
//         {products.map((product) => {
//           const currentRating =
//             ratings[product.id] ?? Math.floor(product.rating?.rate || 0);
//           const quantityInCart = getQuantityInCart(product.id);
//           const isAdded = quantityInCart > 0;

//           return (
//             <SwiperSlide
//               key={product.id}
//               className="group bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md flex flex-col relative"
//             >
//               <div className="mt-3">
//                 <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
//                   جدید
//                 </span>
//               </div>

//               <div className="w-full h-60 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.image}
//                   className="object-contain w-full h-full"
//                   alt={product.title}
//                 />
//               </div>

//               <div className="flex flex-col items-end flex-1 mt-2">
//                 {/* <RatingStars
//                   count={currentRating}
//                   onChange={(c) => handleRatingChange(product.id, c)}
//                 /> */}

//                 <p className="mt-2 text-gray-600 text-sm text-right">
//                   {product.title.length > 35
//                     ? product.title.slice(0, 32) + "..."
//                     : product.title}
//                 </p>

//                 <p className="font-bold text-sm mt-1 text-gray-900">
//                   {(product.price * 60000).toLocaleString()} تومان
//                 </p>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={isAdded}
//                   aria-label={
//                     isAdded ? "محصول در سبد موجود است" : "افزودن به سبد خرید"
//                   }
//                   type="button"
//                   className={`
//                     w-full mt-3 py-2 rounded-lg text-sm font-semibold
//                     flex items-center justify-center gap-2
//                     transition-all duration-300
//                     ${
//                       isAdded
//                         ? "bg-blue-600 text-white cursor-not-allowed shadow-lg opacity-100 pointer-events-auto"
//                         : `bg-gray-900 text-white
//                            opacity-0 pointer-events-none
//                            group-hover:opacity-100 group-hover:pointer-events-auto
//                            hover:bg-indigo-600 hover:shadow-xl hover:scale-[1.05] active:scale-95`
//                     }
//                   `}
//                 >
//                   {addedStatus[product.id] ? (
//                     <>
//                       به سبد اضافه شد{" "}
//                       <span className="sm:hidden mt-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
//                         {quantityInCart}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       افزودن به سبد خرید <GoArrowUpRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }

// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { GoArrowUpRight } from "react-icons/go";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { CartContext } from "../../../context/CartContext";

// function RatingStars({ count, onChange }) {
//   const totalStars = 5;
//   return (
//     <div className="flex gap-1 mt-2 select-none">
//       {[...Array(totalStars)].map((_, i) => {
//         const starIndex = i + 1;
//         return (
//           <button
//             key={i}
//             onClick={() => onChange(starIndex)}
//             className="focus:outline-none"
//             aria-label={`${starIndex} ستاره`}
//             type="button"
//           >
//             {starIndex <= count ? (
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
//   const [ratings, setRatings] = useState({});
//   const [addedStatus, setAddedStatus] = useState({});

//   const nextBtn = useRef(null);
//   const prevBtn = useRef(null);
//   const swiperRef = useRef(null);

//   const { addToCart, cartItems } = useContext(CartContext);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=4")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   useEffect(() => {
//     if (swiperRef.current && nextBtn.current && prevBtn.current) {
//       swiperRef.current.params.navigation.nextEl = nextBtn.current;
//       swiperRef.current.params.navigation.prevEl = prevBtn.current;
//       swiperRef.current.navigation.destroy();
//       swiperRef.current.navigation.init();
//       swiperRef.current.navigation.update();
//     }
//   }, [products]);

//   const handleRatingChange = (id, count) => {
//     setRatings((prev) => ({ ...prev, [id]: count }));
//   };

//   const getQuantityInCart = (productId) => {
//     const item = cartItems.find((ci) => ci.id === productId);
//     return item ? item.quantity : 0;
//   };

//   const handleAddToCart = (product) => {
//     const quantityInCart = getQuantityInCart(product.id);
//     if (quantityInCart > 0) {
//       alert("این محصول قبلاً به سبد اضافه شده است.");
//       return;
//     }

//     addToCart({
//       id: product.id,
//       title: product.title,
//       price: Math.floor(product.price * 60000),
//       image: product.image,
//       quantity: 1,
//     });

//     setAddedStatus((prev) => ({ ...prev, [product.id]: true }));

//     setTimeout(() => {
//       setAddedStatus((prev) => ({ ...prev, [product.id]: false }));
//     }, 3000);
//   };

//   return (
//     <div className="relative px-6 md:px-12 lg:px-20 py-10">
//       {/* هدر و دکمه مشاهده بیشتر */}
//       <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between mb-6 m-auto w-full px-4">
//         <button
//           className="border border-gray-400 px-4 py-1 rounded-full text-sm
//            transition duration-300 ease-in-out
//            hover:bg-gray-100 hover:text-gray-800 hover:shadow-md
//            flex gap-2 h-10 items-center
//            mt-4 md:mt-0 self-start md:self-auto"
//           aria-label="مشاهده بیشتر"
//           type="button"
//         >
//           <GoArrowUpRight size={20} />
//           مشاهده بیشتر
//         </button>

//         <div className="text-right w-full md:w-auto">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             محصولات ویژه
//           </h2>
//           <p className="text-gray-500 mt-1">جدیدترین کالکشن های فروشگاه لونا</p>
//         </div>
//       </div>

//       {/* ناوبری اسلایدر */}
//       <div className="flex justify-between items-center mt-4 px-4">
//         <button
//           ref={prevBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید قبلی"
//           type="button"
//         >
//           <IoChevronBack size={22} />
//         </button>

//         <button
//           ref={nextBtn}
//           className="w-10 h-10 flex items-center justify-center border-2
//                      hover:scale-110 transition text-gray-700"
//           aria-label="اسلاید بعدی"
//           type="button"
//         >
//           <IoChevronForward size={22} />
//         </button>
//       </div>

//       {/* اسلایدر */}
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={20}
//         slidesPerView={1.2}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         className="pb-8 mt-4"
//       >
//         {products.map((product) => {
//           const currentRating =
//             ratings[product.id] ?? Math.floor(product.rating?.rate || 0);
//           const quantityInCart = getQuantityInCart(product.id);
//           const isAdded = quantityInCart > 0;
//           const justAdded = addedStatus[product.id];

//           return (
//             <SwiperSlide
//               key={product.id}
//               className="group bg-[#ececec] rounded-lg shadow-sm p-4 cursor-pointer transition hover:shadow-md flex flex-col relative"
//             >
//               <div className="mt-3">
//                 <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-e-md">
//                   جدید
//                 </span>
//               </div>

//               <div className="w-full h-60 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={product.image}
//                   className="object-contain w-full h-full"
//                   alt={product.title}
//                 />
//               </div>

//               <div className="flex flex-col items-end flex-1 mt-2">
//                 {/* <RatingStars
//                   count={currentRating}
//                   onChange={(c) => handleRatingChange(product.id, c)}
//                 /> */}

//                 <p className="mt-2 text-gray-600 text-sm text-right">
//                   {product.title.length > 35
//                     ? product.title.slice(0, 32) + "..."
//                     : product.title}
//                 </p>

//                 <p className="font-bold text-sm mt-1 text-gray-900">
//                   {(product.price * 60000).toLocaleString()} تومان
//                 </p>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={isAdded}
//                   aria-label={
//                     isAdded
//                       ? "محصول در سبد موجود است"
//                       : " به سبد خرید اضافه شد "
//                   }
//                   type="button"
//                   className={`
//                     w-full mt-3 py-2 rounded-lg text-sm font-semibold
//                     flex items-center justify-center gap-2
//                     transition-all duration-300
//                     ${
//                       isAdded
//                         ? justAdded
//                           ? "bg-gray-900 text-white cursor-not-allowed shadow-lg opacity-100 pointer-events-auto"
//                           : "bg-gray-900 text-white cursor-not-allowed shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-indigo-600 hover:shadow-xl hover:scale-[1.05] active:scale-95"
//                         : `bg-gray-900 text-white
//                            opacity-0 pointer-events-none
//                            group-hover:opacity-100 group-hover:pointer-events-auto
//                            hover:hover:shadow-xl hover:scale-[1.05] active:scale-95`
//                     }
//                   `}
//                 >
//                   {justAdded ? (
//                     <>
//                       به سبد اضافه شد{" "}
//                       <span className="sm:hidden mt-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
//                         {quantityInCart}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       افزودن به سبد خرید <GoArrowUpRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { GoArrowUpRight } from "react-icons/go";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../../context/CartContext";

function RatingStars({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-[11px] ${
            i < count ? "text-black" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);

  const nextBtn = useRef(null);
  const prevBtn = useRef(null);
  const swiperRef = useRef(null);

  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/mens-shirts").then((r) =>
        r.json(),
      ),

      fetch("https://dummyjson.com/products/category/womens-dresses").then(
        (r) => r.json(),
      ),
    ])

      .then(([men, women]) => {
        setProducts([...men.products, ...women.products].slice(0, 8));
      });
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.nextEl = nextBtn.current;

      swiperRef.current.params.navigation.prevEl = prevBtn.current;

      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [products]);

  const inCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <section
      className="
mt-32
px-5
max-w-[1300px]
mx-auto
"
    >
      <div
        className="
flex
justify-between
items-end
mb-12
"
      >
        <div>
          <p
            className="
text-xs
tracking-[4px]
text-gray-400
mb-3
"
          >
            FEATURED
          </p>

          <h2
            className="
text-3xl
font-semibold
"
          >
            محصولات ویژه
          </h2>
        </div>

        <button
          className="
flex
gap-2
items-center
text-sm
border-b
border-black
pb-1
hover:gap-4
transition
"
        >
          مشاهده همه
          <GoArrowUpRight />
        </button>
      </div>

      <div
        className="
flex
gap-3
justify-end
mb-6
"
      >
        <button
          ref={prevBtn}
          className="
w-11
h-11
rounded-full
bg-gray-100
flex
items-center
justify-center
hover:bg-black
hover:text-white
transition
"
        >
          <IoChevronBack />
        </button>

        <button
          ref={nextBtn}
          className="
w-11
h-11
rounded-full
bg-gray-100
flex
items-center
justify-center
hover:bg-black
hover:text-white
transition
"
        >
          <IoChevronForward />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 4,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/ProductDetail/${product.id}`)}
          >
            <div
              className="
relative
bg-[#f7f6f3]
rounded-[32px]
aspect-[4/5]
overflow-hidden
flex
items-center
justify-center
"
            >
              <span
                className="
absolute
top-5
right-5
bg-white
rounded-full
px-3
py-1
text-[11px]
shadow-sm
"
              >
                NEW
              </span>

              <img
                src={product.thumbnail}
                className="
w-[85%]
h-[85%]
object-contain
transition
duration-700
group-hover:scale-110
"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(`/ProductDetail/${product.id}`);
                }}
                className="
absolute
bottom-5
left-5
right-5
h-12
rounded-full
bg-black
text-white
text-sm
opacity-0
translate-y-4
group-hover:opacity-100
group-hover:translate-y-0
transition-all
duration-300
"
              >
                مشاهده محصول
                <GoArrowUpRight className="inline" />
              </button>
            </div>

            <div
              className="
mt-5
text-right
"
            >
              <div
                className="
flex
justify-between
items-center
mb-2
"
              >
                <RatingStars count={Math.round(product.rating)} />

                <span
                  className="
text-xs
text-gray-400
"
                >
                  LN-{product.id}
                </span>
              </div>

              <h3
                className="
text-sm
font-medium
line-clamp-2
leading-6
"
              >
                {product.title}
              </h3>

              <p
                className="
font-bold
mt-3
"
              >
                {(product.price * 60000).toLocaleString()}
                تومان
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";

// import { Navigation } from "swiper/modules";
// import { GoArrowUpRight } from "react-icons/go";
// import { IoChevronForward, IoChevronBack } from "react-icons/io5";
// import { FaStar } from "react-icons/fa";

// import { CartContext } from "../../../context/CartContext";

// function RatingStars({ count }) {
//   return (
//     <div className="flex gap-1">
//       {[...Array(5)].map((_, i) => (
//         <FaStar
//           key={i}
//           className={`text-[11px] ${
//             i < count ? "text-black" : "text-gray-200"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

// export default function ProductsSlider() {
//   const [products, setProducts] = useState([]);
//   const [added, setAdded] = useState({});

//   const nextBtn = useRef(null);
//   const prevBtn = useRef(null);
//   const swiperRef = useRef(null);

//   const { addToCart, cartItems } = useContext(CartContext);

//   useEffect(() => {
//     Promise.all([
//       fetch("https://dummyjson.com/products/category/mens-shirts").then((r) =>
//         r.json(),
//       ),

//       fetch("https://dummyjson.com/products/category/womens-dresses").then(
//         (r) => r.json(),
//       ),
//     ])

//       .then(([men, women]) => {
//         setProducts([...men.products, ...women.products].slice(0, 8));
//       });
//   }, []);

//   useEffect(() => {
//     if (swiperRef.current) {
//       swiperRef.current.params.navigation.nextEl = nextBtn.current;

//       swiperRef.current.params.navigation.prevEl = prevBtn.current;

//       swiperRef.current.navigation.init();
//       swiperRef.current.navigation.update();
//     }
//   }, [products]);

//   const inCart = (id) => {
//     return cartItems.some((item) => item.id === id);
//   };

//   const addProduct = (item) => {
//     if (inCart(item.id)) return;

//     addToCart({
//       id: item.id,
//       title: item.title,
//       image: item.thumbnail,
//       price: item.price * 60000,
//       quantity: 1,
//     });

//     setAdded((prev) => ({
//       ...prev,
//       [item.id]: true,
//     }));

//     setTimeout(() => {
//       setAdded((prev) => ({
//         ...prev,
//         [item.id]: false,
//       }));
//     }, 3000);
//   };

//   return (
//     <section
//       className="
// mt-32
// px-5
// max-w-[1300px]
// mx-auto
// "
//     >
//       <div
//         className="
// flex
// justify-between
// items-end
// mb-12
// "
//       >
//         <div>
//           <p
//             className="
// text-xs
// tracking-[4px]
// text-gray-400
// mb-3
// "
//           >
//             FEATURED
//           </p>

//           <h2
//             className="
// text-3xl
// font-semibold
// "
//           >
//             محصولات ویژه
//           </h2>
//         </div>

//         <button
//           className="
// flex
// gap-2
// items-center
// text-sm
// border-b
// border-black
// pb-1
// hover:gap-4
// transition
// "
//         >
//           مشاهده همه
//           <GoArrowUpRight />
//         </button>
//       </div>

//       <div
//         className="
// flex
// gap-3
// justify-end
// mb-6
// "
//       >
//         <button
//           ref={prevBtn}
//           className="
// w-11
// h-11
// rounded-full
// bg-gray-100
// flex
// items-center
// justify-center
// hover:bg-black
// hover:text-white
// transition
// "
//         >
//           <IoChevronBack />
//         </button>

//         <button
//           ref={nextBtn}
//           className="
// w-11
// h-11
// rounded-full
// bg-gray-100
// flex
// items-center
// justify-center
// hover:bg-black
// hover:text-white
// transition
// "
//         >
//           <IoChevronForward />
//         </button>
//       </div>

//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={24}
//         slidesPerView={1.2}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//           },

//           1024: {
//             slidesPerView: 4,
//           },
//         }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id} className="group">
//             <div
//               className="
// relative
// bg-[#f7f6f3]
// rounded-[32px]
// aspect-[4/5]
// overflow-hidden
// flex
// items-center
// justify-center
// "
//             >
//               <span
//                 className="
// absolute
// top-5
// right-5
// bg-white
// rounded-full
// px-3
// py-1
// text-[11px]
// shadow-sm
// "
//               >
//                 NEW
//               </span>

//               <img
//                 src={product.thumbnail}
//                 className="
// w-[85%]
// h-[85%]
// object-contain
// transition
// duration-700
// group-hover:scale-110
// "
//               />

//               <button
//                 onClick={() => addProduct(product)}
//                 className={`
// absolute
// bottom-5
// left-5
// right-5
// h-12
// rounded-full
// text-sm
// transition-all

// ${
//   added[product.id]
//     ? "bg-green-600 text-white"
//     : "bg-black text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
// }

// `}
//               >
//                 {added[product.id] ? "به سبد اضافه شد" : "افزودن به سبد"}
//               </button>
//             </div>

//             <div
//               className="
// mt-5
// text-right
// "
//             >
//               <div
//                 className="
// flex
// justify-between
// items-center
// mb-2
// "
//               >
//                 <RatingStars count={Math.round(product.rating)} />

//                 <span
//                   className="
// text-xs
// text-gray-400
// "
//                 >
//                   LN-{product.id}
//                 </span>
//               </div>

//               <h3
//                 className="
// text-sm
// font-medium
// line-clamp-2
// leading-6
// "
//               >
//                 {product.title}
//               </h3>

//               <p
//                 className="
// font-bold
// mt-3
// "
//               >
//                 {(product.price * 60000).toLocaleString()}
//                 تومان
//               </p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }
