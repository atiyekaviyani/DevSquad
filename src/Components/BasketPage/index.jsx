// import React, { useContext, useEffect, useState, useCallback } from "react";
// import { CartContext } from "../../../src/context/CartContext";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { getAddresses } from "../../Core/Services/api/addressApi";
// import { submitCheckout, payOrder } from "../../Core/Services/api/checkoutApi";
// import { getCart, deleteCartItem } from "../../Core/Services/api/cartApi";

// export default function BasketPage() {
//   const { cartItems, clearCart } = useContext(CartContext);

//   const [localCart, setLocalCart] = useState([]);

//   const [backendCart, setBackendCart] = useState({
//     id: null,
//     total_price: "0",
//     cart_items: [],
//   });

//   const [cartLoading, setCartLoading] = useState(true);

//   const [cartError, setCartError] = useState("");

//   const [addresses, setAddresses] = useState([]);

//   const [selectedAddressId, setSelectedAddressId] = useState("");

//   const [checkoutLoading, setCheckoutLoading] = useState(false);

//   const [checkoutError, setCheckoutError] = useState("");

//   const [checkoutSuccess, setCheckoutSuccess] = useState("");

//   const [orderInfo, setOrderInfo] = useState(null);

//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const [paymentError, setPaymentError] = useState("");

//   const [deletingItemId, setDeletingItemId] = useState(null);

//   useEffect(() => {
//     try {
//       const savedCart = JSON.parse(localStorage.getItem("cartItems"));

//       if (Array.isArray(savedCart)) {
//         setLocalCart(savedCart);
//       } else if (Array.isArray(cartItems)) {
//         setLocalCart(cartItems);
//       }
//     } catch (error) {
//       console.error("LOCAL CART ERROR:", error);

//       if (Array.isArray(cartItems)) {
//         setLocalCart(cartItems);
//       }
//     }
//   }, [cartItems]);

//   const loadBackendCart = useCallback(async () => {
//     try {
//       setCartLoading(true);
//       setCartError("");

//       const response = await getCart();

//       console.log("BACKEND CART RESPONSE:", JSON.stringify(response, null, 2));

//       const data = response?.data;

//       if (data && !Array.isArray(data)) {
//         setBackendCart({
//           id: data.id ?? null,

//           total_price: data.total_price ?? "0",

//           cart_items: Array.isArray(data.cart_items) ? data.cart_items : [],
//         });

//         return;
//       }

//       if (Array.isArray(data)) {
//         setBackendCart({
//           id: null,
//           total_price: "0",
//           cart_items: data,
//         });

//         return;
//       }

//       setBackendCart({
//         id: null,
//         total_price: "0",
//         cart_items: [],
//       });
//     } catch (error) {
//       console.error("GET CART ERROR:", error);

//       setCartError(error?.message || "دریافت سبد خرید با خطا مواجه شد.");

//       setBackendCart({
//         id: null,
//         total_price: "0",
//         cart_items: [],
//       });
//     } finally {
//       setCartLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadBackendCart();
//   }, [loadBackendCart]);

//   useEffect(() => {
//     let mounted = true;

//     const loadAddresses = async () => {
//       try {
//         const response = await getAddresses();

//         console.log("CHECKOUT ADDRESSES:", JSON.stringify(response, null, 2));

//         const data = Array.isArray(response?.data) ? response.data : [];

//         if (!mounted) {
//           return;
//         }

//         setAddresses(data);

//         if (data.length > 0) {
//           setSelectedAddressId(String(data[0].id));
//         }
//       } catch (error) {
//         console.error("ADDRESS ERROR:", error);
//       }
//     };

//     loadAddresses();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const backendItems = Array.isArray(backendCart?.cart_items)
//     ? backendCart.cart_items
//     : [];

//   const backendTotalPrice =
//     Number(String(backendCart?.total_price ?? "0").replace(/,/g, "")) || 0;

//   const totalQuantity = backendItems.reduce(
//     (sum, item) => sum + Number(item?.quantity || 0),
//     0,
//   );

//   const getLocalItem = (backendItem) => {
//     return localCart.find((localItem) => {
//       const sameTitle = localItem?.title === backendItem?.product_name;

//       const sameColor =
//         localItem?.color === backendItem?.color_name ||
//         localItem?.color === backendItem?.color ||
//         !backendItem?.color_name;

//       const sameSize =
//         localItem?.size === backendItem?.size || !backendItem?.size;

//       return sameTitle && sameColor && sameSize;
//     });
//   };

//   const displayItems = backendItems.map((backendItem) => {
//     const localItem = getLocalItem(backendItem);

//     return {
//       ...backendItem,

//       title: backendItem?.product_name || "محصول",

//       image: localItem?.image || "/Product2.png",

//       images: localItem?.images || [],

//       category: localItem?.category || "",

//       colorName:
//         backendItem?.color_name || localItem?.color || backendItem?.color || "",

//       size: backendItem?.size || localItem?.size || "",
//     };
//   });

//   const handleDeleteItem = async (backendItem) => {
//     if (!backendItem?.id) {
//       setCartError("شناسه آیتم سبد خرید پیدا نشد.");

//       return;
//     }

//     try {
//       setDeletingItemId(backendItem.id);

//       setCartError("");

//       console.log("DELETE CART ITEM:", backendItem.id);

//       await deleteCartItem(backendItem.id);

//       await loadBackendCart();

//       const updatedLocalCart = localCart.filter((localItem) => {
//         const sameTitle = localItem?.title === backendItem?.product_name;

//         const sameColor =
//           localItem?.color === backendItem?.color_name ||
//           localItem?.color === backendItem?.color ||
//           !backendItem?.color_name;

//         const sameSize =
//           localItem?.size === backendItem?.size || !backendItem?.size;

//         return !(sameTitle && sameColor && sameSize);
//       });

//       setLocalCart(updatedLocalCart);

//       localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart));
//     } catch (error) {
//       console.error("DELETE CART ITEM ERROR:", error);

//       setCartError(error?.message || "حذف محصول از سبد خرید با خطا مواجه شد.");
//     } finally {
//       setDeletingItemId(null);
//     }
//   };

//   const handleClearLocalCart = () => {
//     clearCart();

//     setLocalCart([]);

//     localStorage.removeItem("cartItems");
//   };

//   const handleCheckout = async () => {
//     setCheckoutError("");
//     setCheckoutSuccess("");
//     setPaymentError("");
//     setOrderInfo(null);

//     if (backendItems.length === 0) {
//       setCheckoutError("سبد خرید شما خالی است.");

//       return;
//     }

//     if (!selectedAddressId) {
//       setCheckoutError("لطفاً یک آدرس برای ارسال انتخاب کنید.");

//       return;
//     }

//     try {
//       setCheckoutLoading(true);

//       const checkoutData = {
//         recipient_type: "self",

//         address_id: Number(selectedAddressId),

//         discount_code: null,
//       };

//       console.log("CHECKOUT REQUEST:", JSON.stringify(checkoutData, null, 2));

//       const response = await submitCheckout(checkoutData);

//       console.log("CHECKOUT RESPONSE:", JSON.stringify(response, null, 2));

//       const orderData = response?.data;

//       if (orderData && !Array.isArray(orderData) && orderData.order_id) {
//         setOrderInfo(orderData);

//         setCheckoutSuccess(
//           response?.message || "سفارش شما با موفقیت ثبت شد و آماده پرداخت است.",
//         );

//         clearCart();

//         setLocalCart([]);

//         localStorage.removeItem("cartItems");

//         await loadBackendCart();
//       } else {
//         throw new Error("ثبت سفارش انجام نشد: API اطلاعات order_id برنگرداند.");
//       }
//     } catch (error) {
//       console.error("CHECKOUT ERROR:", error);

//       setCheckoutError(error?.message || "ثبت سفارش با خطا مواجه شد.");
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     setPaymentError("");
//     setCheckoutError("");

//     const orderId = orderInfo?.order_id;

//     if (!orderId) {
//       setPaymentError("شناسه سفارش برای پرداخت پیدا نشد.");

//       return;
//     }

//     try {
//       setPaymentLoading(true);

//       console.log("PAYMENT REQUEST ORDER ID:", orderId);

//       const response = await payOrder(orderId);

//       console.log("PAYMENT RESPONSE:", JSON.stringify(response, null, 2));

//       const paymentData = response?.data;

//       const paymentUrl =
//         paymentData?.payment_url ||
//         paymentData?.redirect_url ||
//         paymentData?.url ||
//         response?.payment_url ||
//         response?.redirect_url ||
//         response?.url;

//       if (paymentUrl) {
//         console.log("PAYMENT URL:", paymentUrl);

//         window.location.href = paymentUrl;

//         return;
//       }

//       throw new Error("پرداخت ایجاد شد اما لینک درگاه در پاسخ API وجود ندارد.");
//     } catch (error) {
//       console.error("PAYMENT ERROR:", error);

//       setPaymentError(error?.message || "پرداخت سفارش با خطا مواجه شد.");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   if (cartLoading) {
//     return (
//       <div
//         dir="rtl"
//         className="flex min-h-[500px] items-center justify-center bg-[#faf9f6]"
//       >
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

//           <p className="text-sm text-gray-500">در حال دریافت سبد خرید...</p>
//         </div>
//       </div>
//     );
//   }

//   if (backendItems.length === 0 && !orderInfo) {
//     return (
//       <div dir="rtl" className="min-h-screen bg-[#faf9f6]">
//         <div className="w-full">
//           <img
//             src="/Blog.png"
//             alt="banner"
//             className="h-40 w-full object-cover"
//           />
//         </div>

//         <div className="mx-auto max-w-7xl px-5 py-10">
//           <nav
//             aria-label="مسیر صفحه"
//             className="mb-8 flex items-center gap-2 text-sm"
//           >
//             <Link
//               to="/Store"
//               className="text-gray-400 transition hover:text-black"
//             >
//               فروشگاه
//             </Link>

//             <span className="text-gray-300">←</span>

//             <span className="font-medium text-gray-800">سبد خرید</span>
//           </nav>

//           <div className="">
//             <div className="flex-1 rounded-[30px] bg-white p-6 shadow-sm">
//               <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   سبد خرید شما
//                 </h1>

//                 {backendItems.length > 0 && (
//                   <p className="mt-2 text-sm text-gray-400">
//                     {totalQuantity.toLocaleString("fa-IR")} قلم کالا
//                   </p>
//                 )}
//               </div>
//             </div>

//             <aside className="sticky top-20 h-max w-full rounded-[30px] bg-white p-6 shadow-sm lg:w-96"></aside>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div dir="rtl" className="min-h-screen bg-[#faf9f6] ">
//       <div>
//         <img
//           src="/Blog.png"
//           alt="banner"
//           className="h-40 w-full object-cover"
//         />
//       </div>

//       <div className="mx-auto max-w-7xl px-5 py-10">
//         {/* Breadcrumb */}
//         <nav
//           aria-label="مسیر صفحه"
//           className="mb-8 flex items-center gap-2 text-sm"
//         >
//           <Link
//             to="/Store"
//             className="text-gray-400 transition hover:text-black"
//           >
//             فروشگاه
//           </Link>

//           <span className="text-gray-300">←</span>

//           <span className="font-medium text-gray-800">سبد خرید</span>
//         </nav>

//         {/* Basket Content */}
//         <div className="flex flex-col gap-8 lg:flex-row"></div>
//         <div className="flex-1 rounded-[30px] bg-white p-6 shadow-sm">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">سبد خرید شما</h1>

//             {backendItems.length > 0 && (
//               <p className="mt-2 text-sm text-gray-400">
//                 {totalQuantity.toLocaleString("fa-IR")} قلم کالا
//               </p>
//             )}
//           </div>

//           {cartError && (
//             <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//               {cartError}
//             </div>
//           )}

//           {checkoutSuccess && (
//             <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
//               <p>{checkoutSuccess}</p>

//               {orderInfo?.order_id && (
//                 <p className="mt-2 font-semibold">
//                   شماره سفارش: {orderInfo.order_id}
//                 </p>
//               )}

//               {orderInfo?.amount && (
//                 <p className="mt-1">مبلغ سفارش: {orderInfo.amount} تومان</p>
//               )}
//             </div>
//           )}

//           {checkoutError && (
//             <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//               {checkoutError}
//             </div>
//           )}

//           {paymentError && (
//             <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//               {paymentError}
//             </div>
//           )}

//           {backendItems.length > 0 && (
//             <div className="space-y-6">
//               {displayItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center"
//                 >
//                   <div className="h-32 w-full overflow-hidden rounded-2xl bg-[#f5f4f1] sm:w-32">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="h-full w-full object-contain"
//                     />
//                   </div>

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       {item.title}
//                     </h2>

//                     {item.colorName && (
//                       <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
//                         <span>رنگ:</span>

//                         <span
//                           className="h-5 w-5 rounded-full border border-gray-300"
//                           style={{
//                             backgroundColor: item.color,
//                           }}
//                         />

//                         <span>{item.colorName}</span>
//                       </div>
//                     )}

//                     {item.size && (
//                       <p className="mt-1 text-sm text-gray-400">
//                         سایز: {item.size}
//                       </p>
//                     )}

//                     <p className="mt-3 font-semibold text-green-600">
//                       {Number(
//                         String(item.price ?? "0").replace(/,/g, ""),
//                       ).toLocaleString("fa-IR")}{" "}
//                       تومان
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       disabled
//                       className="h-9 w-9 cursor-not-allowed rounded-full bg-gray-100 text-gray-400"
//                       title="API تغییر تعداد هنوز ارائه نشده"
//                     >
//                       -
//                     </button>

//                     <span className="w-8 text-center font-semibold">
//                       {Number(item.quantity || 0).toLocaleString("fa-IR")}
//                     </span>

//                     <button
//                       type="button"
//                       disabled
//                       className="h-9 w-9 cursor-not-allowed rounded-full bg-gray-100 text-gray-400"
//                       title="API تغییر تعداد هنوز ارائه نشده"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => handleDeleteItem(item)}
//                     disabled={deletingItemId === item.id}
//                     className="rounded-full px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     {deletingItemId === item.id ? "در حال حذف..." : "حذف"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {backendItems.length > 0 && (
//             <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
//               <button
//                 type="button"
//                 onClick={handleClearLocalCart}
//                 className="rounded-full bg-gray-100 px-5 py-3 text-sm transition hover:bg-red-100 hover:text-red-600"
//               >
//                 پاک کردن سبد محلی
//               </button>

//               <Link
//                 to="/Store"
//                 className="rounded-full bg-gray-100 px-5 py-3 text-sm transition hover:bg-gray-200"
//               >
//                 ادامه خرید
//               </Link>
//             </div>
//           )}
//         </div>

//         <aside className="sticky top-20 h-max w-full rounded-[30px] bg-white p-6 shadow-sm lg:w-96">
//           <h2 className="mb-6 text-2xl font-bold">خلاصه سفارش </h2>

//           {backendItems.length > 0 && (
//             <div className="mb-6 rounded-2xl border border-gray-100 bg-[#faf9f6] p-4">
//               <label
//                 htmlFor="address"
//                 className="mb-3 block text-sm font-semibold text-gray-700"
//               >
//                 آدرس ارسال
//               </label>

//               {addresses.length > 0 ? (
//                 <select
//                   id="address"
//                   value={selectedAddressId}
//                   onChange={(e) => {
//                     setSelectedAddressId(e.target.value);

//                     setCheckoutError("");
//                   }}
//                   className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-black"
//                 >
//                   {addresses.map((address) => (
//                     <option key={address.id} value={address.id}>
//                       {address.province || address.province_name || ""} -{" "}
//                       {address.city || address.city_name || ""} -{" "}
//                       {address.address}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <div>
//                   <p className="text-sm text-red-500">
//                     ابتدا یک آدرس ثبت کنید.
//                   </p>

//                   <Link
//                     to="/panel/addresses"
//                     className="mt-3 inline-block rounded-xl bg-black px-4 py-2 text-sm text-white"
//                   >
//                     افزودن آدرس
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}

//           {backendItems.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex justify-between border-b border-gray-100 pb-4">
//                 <span className="text-sm text-gray-500">مبلغ کالاها</span>

//                 <span className="font-semibold">
//                   {backendTotalPrice.toLocaleString("fa-IR")} تومان
//                 </span>
//               </div>

//               <div className="flex justify-between border-b border-gray-100 pb-4">
//                 <span className="text-sm text-gray-500">هزینه ارسال</span>

//                 <span className="font-semibold text-gray-500">
//                   بعد از ثبت سفارش
//                 </span>
//               </div>

//               <div className="flex justify-between pt-2">
//                 <span className="text-lg font-bold">مبلغ نهایی</span>

//                 <span className="text-xl font-bold">
//                   {backendTotalPrice.toLocaleString("fa-IR")} تومان
//                 </span>
//               </div>
//             </div>
//           )}

//           {backendItems.length > 0 && (
//             <button
//               type="button"
//               onClick={handleCheckout}
//               disabled={checkoutLoading || addresses.length === 0}
//               className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               {checkoutLoading ? "در حال ثبت سفارش..." : "ثبت سفارش"}
//             </button>
//           )}

//           {orderInfo?.order_id && (
//             <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
//               <p className="text-sm font-semibold text-green-700">
//                 سفارش شما آماده پرداخت است.
//               </p>

//               <div className="mt-3 space-y-2 text-sm text-gray-600">
//                 <p>
//                   شماره سفارش:{" "}
//                   <span className="font-semibold text-gray-800">
//                     {orderInfo.order_id}
//                   </span>
//                 </p>

//                 {orderInfo.amount && (
//                   <p>
//                     مبلغ:{" "}
//                     <span className="font-semibold text-gray-800">
//                       {orderInfo.amount} تومان
//                     </span>
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={handlePayment}
//                 disabled={paymentLoading}
//                 className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-green-600 text-sm font-medium text-white transition hover:bg-green-700 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {paymentLoading ? "در حال انتقال به درگاه..." : "پرداخت سفارش"}
//               </button>
//             </div>
//           )}

//           {paymentError && (
//             <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//               {paymentError}
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }





import React, { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../../../src/context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getAddresses } from "../../Core/Services/api/addressApi";
import { submitCheckout, payOrder } from "../../Core/Services/api/checkoutApi";
import { getCart, deleteCartItem } from "../../Core/Services/api/cartApi";

export default function BasketPage() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [localCart, setLocalCart] = useState([]);

  const [backendCart, setBackendCart] = useState({
    id: null,
    total_price: "0",
    cart_items: [],
  });

  const [cartLoading, setCartLoading] = useState(true);

  const [cartError, setCartError] = useState("");

  const [addresses, setAddresses] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [checkoutError, setCheckoutError] = useState("");

  const [checkoutSuccess, setCheckoutSuccess] = useState("");

  const [orderInfo, setOrderInfo] = useState(null);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [paymentError, setPaymentError] = useState("");

  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cartItems"));

      if (Array.isArray(savedCart)) {
        setLocalCart(savedCart);
      } else if (Array.isArray(cartItems)) {
        setLocalCart(cartItems);
      }
    } catch (error) {
      console.error("LOCAL CART ERROR:", error);

      if (Array.isArray(cartItems)) {
        setLocalCart(cartItems);
      }
    }
  }, [cartItems]);

  const loadBackendCart = useCallback(async () => {
    try {
      setCartLoading(true);
      setCartError("");

      const response = await getCart();

      console.log(
        "BACKEND CART RESPONSE:",
        JSON.stringify(response, null, 2),
      );

      const data = response?.data;

      if (data && !Array.isArray(data)) {
        setBackendCart({
          id: data.id ?? null,
          total_price: data.total_price ?? "0",
          cart_items: Array.isArray(data.cart_items)
            ? data.cart_items
            : [],
        });

        return;
      }

      if (Array.isArray(data)) {
        setBackendCart({
          id: null,
          total_price: "0",
          cart_items: data,
        });

        return;
      }

      setBackendCart({
        id: null,
        total_price: "0",
        cart_items: [],
      });
    } catch (error) {
      console.error("GET CART ERROR:", error);

      setCartError(error?.message || "دریافت سبد خرید با خطا مواجه شد.");

      setBackendCart({
        id: null,
        total_price: "0",
        cart_items: [],
      });
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBackendCart();
  }, [loadBackendCart]);

  useEffect(() => {
    let mounted = true;

    const loadAddresses = async () => {
      try {
        const response = await getAddresses();

        console.log(
          "CHECKOUT ADDRESSES:",
          JSON.stringify(response, null, 2),
        );

        const data = Array.isArray(response?.data) ? response.data : [];

        if (!mounted) {
          return;
        }

        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddressId(String(data[0].id));
        }
      } catch (error) {
        console.error("ADDRESS ERROR:", error);
      }
    };

    loadAddresses();

    return () => {
      mounted = false;
    };
  }, []);

  const backendItems = Array.isArray(backendCart?.cart_items)
    ? backendCart.cart_items
    : [];

  const backendTotalPrice =
    Number(String(backendCart?.total_price ?? "0").replace(/,/g, "")) || 0;

  const totalQuantity = backendItems.reduce(
    (sum, item) => sum + Number(item?.quantity || 0),
    0,
  );

  const getLocalItem = (backendItem) => {
    return localCart.find((localItem) => {
      const sameTitle = localItem?.title === backendItem?.product_name;

      const sameColor =
        localItem?.color === backendItem?.color_name ||
        localItem?.color === backendItem?.color ||
        !backendItem?.color_name;

      const sameSize =
        localItem?.size === backendItem?.size || !backendItem?.size;

      return sameTitle && sameColor && sameSize;
    });
  };

  const displayItems = backendItems.map((backendItem) => {
    const localItem = getLocalItem(backendItem);

    return {
      ...backendItem,

      title: backendItem?.product_name || "محصول",

      image: localItem?.image || "/Product2.png",

      images: localItem?.images || [],

      category: localItem?.category || "",

      colorName:
        backendItem?.color_name ||
        localItem?.color ||
        backendItem?.color ||
        "",

      size: backendItem?.size || localItem?.size || "",
    };
  });

  const handleDeleteItem = async (backendItem) => {
    if (!backendItem?.id) {
      setCartError("شناسه آیتم سبد خرید پیدا نشد.");

      return;
    }

    try {
      setDeletingItemId(backendItem.id);

      setCartError("");

      console.log("DELETE CART ITEM:", backendItem.id);

      await deleteCartItem(backendItem.id);

      await loadBackendCart();

      const updatedLocalCart = localCart.filter((localItem) => {
        const sameTitle = localItem?.title === backendItem?.product_name;

        const sameColor =
          localItem?.color === backendItem?.color_name ||
          localItem?.color === backendItem?.color ||
          !backendItem?.color_name;

        const sameSize =
          localItem?.size === backendItem?.size || !backendItem?.size;

        return !(sameTitle && sameColor && sameSize);
      });

      setLocalCart(updatedLocalCart);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedLocalCart),
      );
    } catch (error) {
      console.error("DELETE CART ITEM ERROR:", error);

      setCartError(
        error?.message || "حذف محصول از سبد خرید با خطا مواجه شد.",
      );
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleClearLocalCart = () => {
    clearCart();

    setLocalCart([]);

    localStorage.removeItem("cartItems");
  };

  const handleCheckout = async () => {
    setCheckoutError("");
    setCheckoutSuccess("");
    setPaymentError("");
    setOrderInfo(null);

    if (backendItems.length === 0) {
      setCheckoutError("سبد خرید شما خالی است.");

      return;
    }

    if (!selectedAddressId) {
      setCheckoutError("لطفاً یک آدرس برای ارسال انتخاب کنید.");

      return;
    }

    try {
      setCheckoutLoading(true);

      const checkoutData = {
        recipient_type: "self",
        address_id: Number(selectedAddressId),
        discount_code: null,
      };

      console.log(
        "CHECKOUT REQUEST:",
        JSON.stringify(checkoutData, null, 2),
      );

      const response = await submitCheckout(checkoutData);

      console.log(
        "CHECKOUT RESPONSE:",
        JSON.stringify(response, null, 2),
      );

      const orderData = response?.data;

      if (
        orderData &&
        !Array.isArray(orderData) &&
        orderData.order_id
      ) {
        setOrderInfo(orderData);

        setCheckoutSuccess(
          response?.message ||
            "سفارش شما با موفقیت ثبت شد و آماده پرداخت است.",
        );

        clearCart();

        setLocalCart([]);

        localStorage.removeItem("cartItems");

        await loadBackendCart();
      } else {
        throw new Error(
          "ثبت سفارش انجام نشد: API اطلاعات order_id برنگرداند.",
        );
      }
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setCheckoutError(
        error?.message || "ثبت سفارش با خطا مواجه شد.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentError("");
    setCheckoutError("");

    const orderId = orderInfo?.order_id;

    if (!orderId) {
      setPaymentError("شناسه سفارش برای پرداخت پیدا نشد.");

      return;
    }

    try {
      setPaymentLoading(true);

      console.log("PAYMENT REQUEST ORDER ID:", orderId);

      const response = await payOrder(orderId);

      console.log(
        "PAYMENT RESPONSE:",
        JSON.stringify(response, null, 2),
      );

      const paymentData = response?.data;

      const paymentUrl =
        paymentData?.payment_url ||
        paymentData?.redirect_url ||
        paymentData?.url ||
        response?.payment_url ||
        response?.redirect_url ||
        response?.url;

      if (paymentUrl) {
        console.log("PAYMENT URL:", paymentUrl);

        window.location.href = paymentUrl;

        return;
      }

      throw new Error(
        "پرداخت ایجاد شد اما لینک درگاه در پاسخ API وجود ندارد.",
      );
    } catch (error) {
      console.error("PAYMENT ERROR:", error);

      setPaymentError(
        error?.message || "پرداخت سفارش با خطا مواجه شد.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[600px] items-center justify-center bg-[#faf9f6]"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-gray-200 border-t-black" />

          <p className="text-sm text-gray-400">
            در حال دریافت سبد خرید...
          </p>
        </div>
      </div>
    );
  }

  if (backendItems.length === 0 && !orderInfo) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#faf9f6]"
      >
        {/* Banner */}
        <div className="w-full overflow-hidden">
          <img
            src="/Blog.png"
            alt="banner"
            className="h-40 w-full object-cover"
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-10">

          {/* Breadcrumb */}
          <nav
            aria-label="مسیر صفحه"
            className="mb-10 flex items-center gap-2 text-sm"
          >
            <Link
              to="/Store"
              className="text-gray-400 transition-colors hover:text-black"
            >
              فروشگاه
            </Link>

            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="text-gray-300"
            />

            <span className="font-medium text-gray-800">
              سبد خرید
            </span>
          </nav>

          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-[32px] border border-black/[0.04] bg-white px-8 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.04)]">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#f5f4f1]"
            >
              <motion.img
                src="/Basket.svg"
                alt="سبد خرید خالی"
                className="h-14 w-14"
              />
            </motion.div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              سبد خرید شما خالی است
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-400">
              محصولی برای خرید در سبد شما وجود ندارد.
              محصولات مورد علاقه‌ات را پیدا کن و به سبد خرید اضافه کن.
            </p>

            {cartError && (
              <div className="mt-6 w-full rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {cartError}
              </div>
            )}

            <Link
              to="/Store"
              className="mt-8 flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#171717]"
            >
              مشاهده فروشگاه
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf9f6]"
    >
      {/* ================= Banner ================= */}
      <div className="w-full overflow-hidden">
        <img
          src="/Blog.png"
          alt="banner"
          className="h-40 w-full object-cover"
        />
      </div>

      {/* ================= Main ================= */}
      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* ================= Breadcrumb ================= */}
        <nav
          aria-label="مسیر صفحه"
          className="mb-10 flex items-center gap-2 text-sm"
        >
          <Link
            to="/Store"
            className="text-gray-400 transition-colors hover:text-black"
          >
            فروشگاه
          </Link>

          <ArrowLeft
            size={15}
            strokeWidth={1.5}
            className="text-gray-300"
          />

          <span className="font-medium text-gray-800">
            سبد خرید
          </span>
        </nav>

        {/* ================= Basket Layout ================= */}
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* ================= Basket Card ================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="min-w-0 flex-1 overflow-hidden rounded-[32px] border border-black/[0.04] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.035)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-7 sm:px-8">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f4f1]">
                    <ShoppingBag
                      size={19}
                      strokeWidth={1.6}
                      className="text-gray-700"
                    />
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    سبد خرید شما
                  </h1>
                </div>

                {backendItems.length > 0 && (
                  <p className="mr-[52px] mt-2 text-sm text-gray-400">
                    {totalQuantity.toLocaleString("fa-IR")} قلم کالا
                  </p>
                )}
              </div>

              <div className="hidden rounded-full border border-gray-100 bg-[#faf9f6] px-4 py-2 text-xs text-gray-500 sm:block">
                خرید امن و مطمئن
              </div>
            </div>

            <div className="p-6 sm:p-8">

              {/* Errors */}
              {cartError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600">
                  {cartError}
                </div>
              )}

              {checkoutSuccess && (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-700">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={21}
                      className="mt-0.5 shrink-0"
                    />

                    <div>
                      <p className="font-medium">
                        {checkoutSuccess}
                      </p>

                      {orderInfo?.order_id && (
                        <p className="mt-2 font-semibold">
                          شماره سفارش: {orderInfo.order_id}
                        </p>
                      )}

                      {orderInfo?.amount && (
                        <p className="mt-1">
                          مبلغ سفارش: {orderInfo.amount} تومان
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {checkoutError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {checkoutError}
                </div>
              )}

              {paymentError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {paymentError}
                </div>
              )}

              {/* ================= Products ================= */}
              {backendItems.length > 0 && (
                <div className="space-y-1">
                  {displayItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.06,
                      }}
                      className="group flex flex-col gap-5 border-b border-gray-100 py-6 first:pt-0 last:border-b-0 sm:flex-row sm:items-center"
                    >
                      {/* Image */}
                      <Link
                        to={`/ProductDetail/${item.product_id || item.id}`}
                        className="relative h-36 w-full shrink-0 overflow-hidden rounded-[22px] bg-[#f5f4f1] sm:h-36 sm:w-36"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-black/[0.02] opacity-0 transition group-hover:opacity-100" />
                      </Link>

                      {/* Info */}
                      <div className="min-w-0 flex-1">

                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="mb-1 text-xs text-gray-400">
                              {item.category || "LONA COLLECTION"}
                            </p>

                            <h2 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h2>
                          </div>
                        </div>

                        {/* Color */}
                        {item.colorName && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                            <span>رنگ:</span>

                            <span
                              className="h-5 w-5 rounded-full border border-gray-300 shadow-sm"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />

                            <span className="text-gray-500">
                              {item.colorName}
                            </span>
                          </div>
                        )}

                        {/* Size */}
                        {item.size && (
                          <p className="mt-2 text-sm text-gray-400">
                            سایز:{" "}
                            <span className="text-gray-500">
                              {item.size}
                            </span>
                          </p>
                        )}

                        {/* Price */}
                        <p className="mt-4 text-base font-semibold text-gray-900">
                          {Number(
                            String(item.price ?? "0").replace(/,/g, ""),
                          ).toLocaleString("fa-IR")}{" "}
                          <span className="text-xs font-normal text-gray-400">
                            تومان
                          </span>
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">

                        <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-[#faf9f6]">
                          <button
                            type="button"
                            disabled
                            className="flex h-9 w-9 cursor-not-allowed items-center justify-center text-gray-300"
                            title="API تغییر تعداد هنوز ارائه نشده"
                          >
                            −
                          </button>

                          <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-200 px-2 text-sm font-semibold text-gray-700">
                            {Number(
                              item.quantity || 0,
                            ).toLocaleString("fa-IR")}
                          </span>

                          <button
                            type="button"
                            disabled
                            className="flex h-9 w-9 cursor-not-allowed items-center justify-center text-gray-300"
                            title="API تغییر تعداد هنوز ارائه نشده"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item)}
                          disabled={deletingItemId === item.id}
                          className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={15} strokeWidth={1.7} />

                          {deletingItemId === item.id
                            ? "در حال حذف..."
                            : "حذف محصول"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ================= Bottom Actions ================= */}
              {backendItems.length > 0 && (
                <div className="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <button
                    type="button"
                    onClick={handleClearLocalCart}
                    className="order-2 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:order-1"
                  >
                    <Trash2 size={16} strokeWidth={1.7} />
                    پاک کردن سبد محلی
                  </button>

                  <Link
                    to="/Store"
                    className="order-1 flex items-center justify-center gap-2 rounded-full bg-[#f5f4f1] px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#ecebe7] sm:order-2"
                  >
                    ادامه خرید
                    <ArrowLeft size={16} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* ================= Summary ================= */}
          <motion.aside
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.1,
            }}
            className="h-max w-full lg:sticky lg:top-20 lg:w-96"
          >
            <div className="overflow-hidden rounded-[32px] border border-black/[0.04] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.04)]">

              {/* Summary Header */}
              <div className="border-b border-gray-100 px-6 py-6">
                <h2 className="text-xl font-bold text-gray-900">
                  خلاصه سفارش
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  بررسی اطلاعات قبل از ثبت سفارش
                </p>
              </div>

              <div className="p-6">

                {/* Address */}
                {backendItems.length > 0 && (
                  <div className="mb-6 rounded-[22px] border border-gray-100 bg-[#faf9f6] p-4">

                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                        <MapPin
                          size={17}
                          strokeWidth={1.6}
                          className="text-gray-600"
                        />
                      </div>

                      <label
                        htmlFor="address"
                        className="text-sm font-semibold text-gray-800"
                      >
                        آدرس ارسال
                      </label>
                    </div>

                    {addresses.length > 0 ? (
                      <select
                        id="address"
                        value={selectedAddressId}
                        onChange={(e) => {
                          setSelectedAddressId(e.target.value);

                          setCheckoutError("");
                        }}
                        className="w-full rounded-2xl border border-gray-200 bg-white p-3.5 text-sm text-gray-700 outline-none transition focus:border-black"
                      >
                        {addresses.map((address) => (
                          <option
                            key={address.id}
                            value={address.id}
                          >
                            {address.province ||
                              address.province_name ||
                              ""}{" "}
                            -{" "}
                            {address.city ||
                              address.city_name ||
                              ""}{" "}
                            - {address.address}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div>
                        <p className="text-sm leading-6 text-red-500">
                          ابتدا یک آدرس ثبت کنید.
                        </p>

                        <Link
                          to="/panel/addresses"
                          className="mt-3 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm text-white transition hover:bg-[#171717]"
                        >
                          افزودن آدرس
                          <ArrowLeft size={15} />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Details */}
                {backendItems.length > 0 && (
                  <div className="space-y-4">

                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="text-sm text-gray-500">
                        مبلغ کالاها
                      </span>

                      <span className="text-sm font-semibold text-gray-800">
                        {backendTotalPrice.toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <span className="text-sm text-gray-500">
                        هزینه ارسال
                      </span>

                      <span className="text-xs font-medium text-gray-400">
                        بعد از ثبت سفارش
                      </span>
                    </div>

                    <div className="rounded-2xl bg-[#f5f4f1] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-gray-900">
                          مبلغ نهایی
                        </span>

                        <div className="text-left">
                          <span className="block text-xl font-bold text-gray-900">
                            {backendTotalPrice.toLocaleString("fa-IR")}
                          </span>

                          <span className="text-[11px] text-gray-400">
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Checkout */}
                {backendItems.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={
                      checkoutLoading || addresses.length === 0
                    }
                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        در حال ثبت سفارش...
                      </>
                    ) : (
                      <>
                        <CreditCard
                          size={17}
                          strokeWidth={1.7}
                        />
                        ثبت سفارش
                      </>
                    )}
                  </button>
                )}

                {/* Payment */}
                {orderInfo?.order_id && (
                  <div className="mt-6 rounded-[24px] border border-green-200 bg-green-50 p-5">

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                        <ShieldCheck
                          size={18}
                          className="text-green-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-green-700">
                          سفارش آماده پرداخت است
                        </p>

                        <div className="mt-3 space-y-2 text-xs leading-6 text-gray-500">
                          <p>
                            شماره سفارش:{" "}
                            <span className="font-semibold text-gray-800">
                              {orderInfo.order_id}
                            </span>
                          </p>

                          {orderInfo.amount && (
                            <p>
                              مبلغ:{" "}
                              <span className="font-semibold text-gray-800">
                                {orderInfo.amount} تومان
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={paymentLoading}
                      className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentLoading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          در حال انتقال به درگاه...
                        </>
                      ) : (
                        <>
                          <CreditCard size={17} />
                          پرداخت سفارش
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Trust Features */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">

                  <div className="flex items-center gap-2">
                    <Truck
                      size={16}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />

                    <span className="text-[11px] text-gray-400">
                      ارسال مطمئن
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />

                    <span className="text-[11px] text-gray-400">
                      خرید امن
                    </span>
                  </div>
                </div>

                {paymentError && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {paymentError}
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}