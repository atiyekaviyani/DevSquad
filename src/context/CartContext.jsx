// // import React, { createContext, useState } from "react";

// // export const CartContext = createContext();

// // export function CartProvider({ children }) {
// //   const [cartItems, setCartItems] = useState([]);

// //   // اضافه کردن محصول به سبد
// //   function addToCart(product) {
// //     setCartItems((prev) => {
// //       // اگه محصول با همان رنگ و سایز قبلا بود، تعدادش رو زیاد کن
// //       const existingIndex = prev.findIndex(
// //         (item) =>
// //           item.id === product.id &&
// //           item.color === product.color &&
// //           item.size === product.size
// //       );
// //       if (existingIndex !== -1) {
// //         const updated = [...prev];
// //         updated[existingIndex].quantity += 1;
// //         return updated;
// //       } else {
// //         return [...prev, { ...product, quantity: 1 }];
// //       }
// //     });
// //   }

// //   // حذف محصول از سبد
// //   function removeFromCart(productToRemove) {
// //     setCartItems((prev) =>
// //       prev.filter(
// //         (item) =>
// //           !(
// //             item.id === productToRemove.id &&
// //             item.color === productToRemove.color &&
// //             item.size === productToRemove.size
// //           )
// //       )
// //     );
// //   }

// //   // تغییر تعداد محصول در سبد (اختیاری)
// //   function updateQuantity(productToUpdate, quantity) {
// //     setCartItems((prev) =>
// //       prev.map((item) =>
// //         item.id === productToUpdate.id &&
// //         item.color === productToUpdate.color &&
// //         item.size === productToUpdate.size
// //           ? { ...item, quantity }
// //           : item
// //       )
// //     );
// //   }

// //   return (
// //     <CartContext.Provider
// //       value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }


// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     // بارگذاری اولیه از localStorage
//     const saved = localStorage.getItem("cartItems");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ذخیره خودکار در localStorage وقتی cartItems تغییر کنه
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // افزودن یا افزایش تعداد محصول
//   function addToCart(product) {
//     setCartItems((prev) => {
//       const existingIndex = prev.findIndex(
//         (item) =>
//           item.id === product.id &&
//           item.color === product.color &&
//           item.size === product.size
//       );
//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         updated[existingIndex].quantity += 1;
//         return updated;
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   }

//   // حذف محصول
//   function removeFromCart(productToRemove) {
//     setCartItems((prev) =>
//       prev.filter(
//         (item) =>
//           !(
//             item.id === productToRemove.id &&
//             item.color === productToRemove.color &&
//             item.size === productToRemove.size
//           )
//       )
//     );
//   }

//   // تغییر تعداد محصول
//   function updateQuantity(productToUpdate, quantity) {
//     if (quantity < 1) return; // حداقل 1
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productToUpdate.id &&
//         item.color === productToUpdate.color &&
//         item.size === productToUpdate.size
//           ? { ...item, quantity }
//           : item
//       )
//     );
//   }

//   // خالی کردن کل سبد
//   function clearCart() {
//     setCartItems([]);
//   }

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }


import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(productToRemove) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productToRemove.id &&
            item.color === productToRemove.color &&
            item.size === productToRemove.size
          )
      )
    );
  }

  function updateQuantity(productToUpdate, quantity) {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productToUpdate.id &&
        item.color === productToUpdate.color &&
        item.size === productToUpdate.size
          ? { ...item, quantity }
          : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
