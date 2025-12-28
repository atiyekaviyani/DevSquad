import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
 
  "/Product2.png",
  "/Product3.png",
  "/Product4.png",
  "/Product5.png",
];

const colors = [
  "bg-gray-300",
  "bg-gray-500",
  "bg-black",
  "bg-emerald-200",
  "bg-white border",
  "bg-yellow-400",
];

const sizes = ["XS", "S", "M", "L", "XL", "2X"];

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="border rounded-2xl p-6 space-y-5">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold">کت جین زنانه مدل یارا</h1>
            <Heart className="text-gray-400 cursor-pointer" />
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>دسته بندی: جین</p>
            <p>کد: 34567</p>
            <p>جنس: جین</p>
            <p>سایزبندی: XS تا 2X</p>
            <p>قد: 45 - 50</p>
          </div>

          <div className="text-lg font-bold">1,245,000 تومان</div>

          <div>
            <p className="mb-2 font-medium">رنگ</p>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded 
                  ${color}
                  ${selectedColor === index ? "ring-2 ring-orange-400" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2 font-medium">سایز</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded 
                  ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">راهنمای اندازه‌گیری</p>
          </div>

          <button className="w-full bg-gray-300 py-3 rounded-lg font-medium hover:bg-gray-400 transition">
            افزودن به سبد خرید
          </button>
        </div>
        <div className="flex gap-4">
          <div className="hidden sm:flex flex-col gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-20 h-24 rounded-xl overflow-hidden border 
                ${
                  activeImage === index
                    ? "border-orange-400"
                    : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={images[activeImage]}
              alt=""
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => setActiveImage((prev) => Math.max(prev - 1, 0))}
              className="absolute left-4 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() =>
                setActiveImage((prev) => Math.min(prev + 1, images.length - 1))
              }
              className="absolute right-4 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}







// // /Api/ 

// import { useEffect, useState } from "react";
// import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

// export default function ProductDetails() {
//   const [product, setProduct] = useState(null);
//   const [activeImage, setActiveImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Mock API (بعداً URL خودتو بذار)
//   useEffect(() => {
//     fetch("https://mock-api/product/1")
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         setSelectedColor(data.colors?.[0]);
//         setSelectedSize(data.sizes?.[0]);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <div className="text-center py-20">در حال بارگذاری...</div>;
//   }

//   if (!product) {
//     return <div className="text-center py-20">محصولی یافت نشد</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* Images */}
//         <div className="flex gap-4">
//           {/* Thumbnails */}
//           <div className="hidden sm:flex flex-col gap-3">
//             {product.images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveImage(index)}
//                 className={`w-20 h-24 rounded-xl overflow-hidden border
//                 ${activeImage === index ? "border-orange-400" : "border-transparent"}`}
//               >
//                 <img src={img} alt="" className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-gray-100">
//             <img
//               src={product.images[activeImage]}
//               alt={product.title}
//               className="w-full h-full object-cover"
//             />

//             <button
//               onClick={() =>
//                 setActiveImage((prev) => Math.max(prev - 1, 0))
//               }
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//             >
//               <ChevronLeft />
//             </button>

//             <button
//               onClick={() =>
//                 setActiveImage((prev) =>
//                   Math.min(prev + 1, product.images.length - 1)
//                 )
//               }
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* Info */}
//         <div className="border rounded-2xl p-6 space-y-5">
//           <div className="flex justify-between items-start">
//             <h1 className="text-xl font-semibold">{product.title}</h1>
//             <Heart className="text-gray-400 cursor-pointer" />
//           </div>

//           <div className="text-sm text-gray-600 space-y-1">
//             <p>دسته بندی: {product.category}</p>
//             <p>کد: {product.code}</p>
//             <p>جنس: {product.material}</p>
//             <p>قد: {product.height}</p>
//           </div>

//           <div className="text-lg font-bold">
//             {product.price.toLocaleString()} تومان
//           </div>

//           {/* Colors */}
//           <div>
//             <p className="mb-2 font-medium">رنگ</p>
//             <div className="flex gap-3">
//               {product.colors.map((color, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedColor(color)}
//                   style={{ backgroundColor: color }}
//                   className={`w-8 h-8 rounded border
//                   ${selectedColor === color ? "ring-2 ring-orange-400" : ""}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Sizes */}
//           <div>
//             <p className="mb-2 font-medium">سایز</p>
//             <div className="flex flex-wrap gap-2">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded
//                   ${selectedSize === size
//                       ? "bg-black text-white"
//                       : "hover:border-black"}`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             <p className="text-xs text-gray-400 mt-1">راهنمای اندازه‌گیری</p>
//           </div>

//           <button
//             onClick={() =>
//               console.log({
//                 productId: product.id,
//                 color: selectedColor,
//                 size: selectedSize,
//               })
//             }
//             className="w-full bg-gray-300 py-3 rounded-lg font-medium hover:bg-gray-400 transition"
//           >
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
