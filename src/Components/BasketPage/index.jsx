// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../../src/context/CartContext";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// export default function BasketPage() {
//   const { cartItems, removeFromCart, updateQuantity, clearCart } =
//     useContext(CartContext);
//   const [localCart, setLocalCart] = useState([]);
//   const [boughtProducts, setBoughtProducts] = useState([]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cartItems"));
//     if (savedCart) {
//       setLocalCart(savedCart);
//     } else {
//       setLocalCart(cartItems);
//     }
//   }, [cartItems]);

//   // Save cart to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     setLocalCart(cartItems);
//   }, [cartItems]);

//   // محاسبه مجموع قیمت کل
//   const totalPrice = localCart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // تعداد کل اقلام
//   const totalQuantity = localCart.reduce((sum, item) => sum + item.quantity, 0);

//   // تکمیل فرایند خرید (شبیه‌سازی)
//   const handleCheckout = () => {
//     if (localCart.length === 0) return alert("سبد خرید خالی است!");
//     setBoughtProducts(localCart);
//     clearCart();
//     localStorage.removeItem("cartItems");
//     alert("خرید شما با موفقیت ثبت شد!");
//   };

//   // اگر سبد خالیه و خرید هم نشده
//   if (localCart.length === 0 && boughtProducts.length === 0) {
//     return (
//       <div
//         className="p-10 text-center text-gray-600 text-lg font-semibold border-2 h-64"
//         dir="rtl"
//       >
//         سبد خرید شما خالی است.
//         <Link to="/" className="text-gray-700 underline mx-2">
//           بازگشت به صفحه محصولات
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div
//         className="max-w-7xl mx-auto p-6 text-right flex flex-col lg:flex-row gap-8"
//         dir="rtl"
//       >
//         {/* بخش اصلی سبد خرید */}
//         <div className="flex-1 space-y-6 bg-white p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold mb-6">سبد خرید شما</h1>

//           {localCart.length > 0 ? (
//             <>
//               {localCart.map((item) => (
//                 <div
//                   key={`${item.id}-${item.color}-${item.size}`}
//                   className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
//                 >
//                   {/* اسلایدر تصاویر */}
//                   <div className="w-full sm:w-40">
//                     <Swiper
//                       modules={[Navigation]}
//                       navigation
//                       spaceBetween={10}
//                       slidesPerView={1}
//                       className="rounded-lg"
//                     >
//                       {/* فرض بر این است که item.images یک آرایه عکس باشد */}
//                       {(item.images?.length ? item.images : [item.image]).map(
//                         (img, i) => (
//                           <SwiperSlide key={i}>
//                             <img
//                               src={img}
//                               alt={`${item.title} - ${i + 1}`}
//                               className="w-full h-32 object-contain rounded-lg"
//                             />
//                           </SwiperSlide>
//                         )
//                       )}
//                     </Swiper>
//                   </div>

//                   {/* مشخصات محصول */}
//                   <div className="flex-1 flex flex-col gap-1">
//                     <h2 className="font-semibold text-lg">{item.title}</h2>
//                     <p className="text-gray-500 text-sm">
//                       دسته‌بندی: {item.category || "—"}
//                     </p>
//                     <p className="text-green-600 font-semibold">
//                       {(item.price * 1).toLocaleString()} تومان
//                     </p>
//                     <p className="text-sm">
//                       رنگ:{" "}
//                       <span
//                         className="inline-block w-5 h-5 rounded-full border"
//                         style={{ backgroundColor: item.color }}
//                       />
//                     </p>
//                     <p className="text-sm">سایز: {item.size}</p>
//                   </div>

//                   {/* کنترل تعداد */}
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() =>
//                         updateQuantity(
//                           item,
//                           item.quantity > 1 ? item.quantity - 1 : 1
//                         )
//                       }
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                     >
//                       -
//                     </button>
//                     <span className="w-6 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item, item.quantity + 1)}
//                       className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                     >
//                       +
//                     </button>
//                   </div>

//                   {/* حذف محصول */}
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="text-black hover:text-red-700 text-lg font-bold px-3 py-1 rounded-md transition"
//                     title="حذف محصول"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}

//               {/* اطلاعات کلی سبد */}
//               <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center">
//                 <div>
//                   <p className="text-lg font-semibold">
//                     تعداد کل اقلام:{" "}
//                     <span className="text-blue-600">{totalQuantity}</span>
//                   </p>
//                   <p className="text-lg font-semibold">
//                     مجموع قیمت کل:{" "}
//                     <span className="text-green-600">
//                       {totalPrice.toLocaleString()} تومان
//                     </span>
//                   </p>
//                 </div>

//                 <div className="flex gap-4 mt-4 sm:mt-0">
//                   <button
//                     onClick={clearCart}
//                     className="bg-blue-400 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
//                   >
//                     خالی کردن سبد
//                   </button>

//                   <Link
//                     to="/"
//                     className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
//                   >
//                     ادامه خرید
//                   </Link>

//                   <button
//                     onClick={() => alert("درگاه پرداختی یافت نشد!")}
//                     className="bg-gray-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
//                   >
//                     پرداخت
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p className="text-center py-10 text-gray-500 text-lg">
//               شما قبلا خرید خود را انجام داده‌اید.
//             </p>
//           )}
//         </div>

//         {/* سایدبار فاکتور */}
//         <aside className="w-full lg:w-96 bg-gray-50 rounded-lg p-6 shadow-md sticky top-20 h-max">
//           <h2 className="text-2xl font-bold mb-4">فاکتور خرید</h2>

//           {boughtProducts.length > 0 ? (
//             <ul className="divide-y divide-gray-300 max-h-[60vh] overflow-y-auto">
//               {boughtProducts.map((item, i) => (
//                 <li key={i} className="py-3 flex justify-between items-center">
//                   <span className="font-semibold text-sm max-w-[60%] truncate">
//                     {item.title}
//                   </span>
//                   <span className="text-green-600 font-semibold">
//                     {(item.price * item.quantity).toLocaleString()} تومان
//                   </span>
//                 </li>
//               ))}

//               <li className="pt-3 border-t mt-3 flex justify-between font-bold text-lg">
//                 <span>مجموع:</span>
//                 <span>
//                   {boughtProducts
//                     .reduce((sum, item) => sum + item.price * item.quantity, 0)
//                     .toLocaleString()}{" "}
//                   تومان
//                 </span>
//               </li>
//             </ul>
//           ) : (
//             <p className="text-gray-500">هیچ خریدی ثبت نشده است.</p>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }



import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../src/context/CartContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

export default function BasketPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const [localCart, setLocalCart] = useState([]);
  const [boughtProducts, setBoughtProducts] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setLocalCart(savedCart);
    } else {
      setLocalCart(cartItems);
    }
  }, [cartItems]);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setLocalCart(cartItems);
  }, [cartItems]);

  // محاسبه مجموع قیمت کل
  const totalPrice = localCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // تعداد کل اقلام
  const totalQuantity = localCart.reduce((sum, item) => sum + item.quantity, 0);

  // تکمیل فرایند خرید (شبیه‌سازی)
  const handleCheckout = () => {
    if (localCart.length === 0) return alert("سبد خرید خالی است!");
    setBoughtProducts(localCart);
    clearCart();
    localStorage.removeItem("cartItems");
    alert("خرید شما با موفقیت ثبت شد!");
  };

  // اگر سبد خالیه و خرید هم نشده
  if (localCart.length === 0 && boughtProducts.length === 0) {
    return (
      <div
        className="p-10 text-center text-gray-600 text-lg font-semibold border-2 h-64 flex flex-col items-center justify-center gap-6"
        dir="rtl"
      >
        <motion.img
          src="/Basket.svg"
          alt="سبد خرید خالی"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: 100, height: 100 }}
        />
        <div>سبد خرید شما خالی است.</div>
        <Link to="/" className="text-gray-700 underline mx-2">
      <button className="bg-slate-900 w-28 h-11 text-white rounded-lg">بازگشت</button>
           
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className="max-w-7xl mx-auto p-6 text-right flex flex-col lg:flex-row gap-8"
        dir="rtl"
      >
        {/* بخش اصلی سبد خرید */}
        <div className="flex-1 space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">سبد خرید شما</h1>

          {localCart.length > 0 ? (
            <>
              {localCart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
                >
                  {/* اسلایدر تصاویر */}
                  <div className="w-full sm:w-40">
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={10}
                      slidesPerView={1}
                      className="rounded-lg"
                    >
                      {/* فرض بر این است که item.images یک آرایه عکس باشد */}
                      {(item.images?.length ? item.images : [item.image]).map(
                        (img, i) => (
                          <SwiperSlide key={i}>
                            <img
                              src={img}
                              alt={`${item.title} - ${i + 1}`}
                              className="w-full h-32 object-contain rounded-lg"
                            />
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>

                  {/* مشخصات محصول */}
                  <div className="flex-1 flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500 text-sm">
                      دسته‌بندی: {item.category || "—"}
                    </p>
                    <p className="text-green-600 font-semibold">
                      {(item.price * 1).toLocaleString()} تومان
                    </p>
                    <p className="text-sm">
                      رنگ:{" "}
                      <span
                        className="inline-block w-5 h-5 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                    </p>
                    <p className="text-sm">سایز: {item.size}</p>
                  </div>

                  {/* کنترل تعداد */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item,
                          item.quantity > 1 ? item.quantity - 1 : 1
                        )
                      }
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* حذف محصول */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-black hover:text-red-700 text-lg font-bold px-3 py-1 rounded-md transition"
                    title="حذف محصول"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* اطلاعات کلی سبد */}
              <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    تعداد کل اقلام:{" "}
                    <span className="text-blue-600">{totalQuantity}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    مجموع قیمت کل:{" "}
                    <span className="text-green-600">
                      {totalPrice.toLocaleString()} تومان
                    </span>
                  </p>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={clearCart}
                    className="bg-blue-400 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  >
                    خالی کردن سبد
                  </button>

                  <Link
                    to="/"
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition"
                  >
                    ادامه خرید
                  </Link>

                  <button
                    onClick={() => alert("درگاه پرداختی یافت نشد!")}
                    className="bg-gray-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                  >
                    پرداخت
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-10 text-gray-500 text-lg">
              شما قبلا خرید خود را انجام داده‌اید.
            </p>
          )}
        </div>

        {/* سایدبار فاکتور */}
        <aside className="w-full lg:w-96 bg-gray-50 rounded-lg p-6 shadow-md sticky top-20 h-max">
          <h2 className="text-2xl font-bold mb-4">فاکتور خرید</h2>

          {boughtProducts.length > 0 ? (
            <ul className="divide-y divide-gray-300 max-h-[60vh] overflow-y-auto">
              {boughtProducts.map((item, i) => (
                <li key={i} className="py-3 flex justify-between items-center">
                  <span className="font-semibold text-sm max-w-[60%] truncate">
                    {item.title}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {(item.price * item.quantity).toLocaleString()} تومان
                  </span>
                </li>
              ))}

              <li className="pt-3 border-t mt-3 flex justify-between font-bold text-lg">
                <span>مجموع:</span>
                <span>
                  {boughtProducts
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toLocaleString()}{" "}
                  تومان
                </span>
              </li>
            </ul>
          ) : (
            <p className="text-gray-500">هیچ خریدی ثبت نشده است.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
