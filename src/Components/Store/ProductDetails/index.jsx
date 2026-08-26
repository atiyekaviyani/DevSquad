// import { useState } from "react";
// import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

// const images = [
//   "/Product2.png",
//   "/Product3.png",
//   "/Product4.png",
//   "/Product5.png",
// ];

// const colors = [
//   "bg-gray-300",
//   "bg-gray-500",
//   "bg-black",
//   "bg-emerald-200",
//   "bg-white border",
//   "bg-yellow-400",
// ];

// const sizes = ["XS", "S", "M", "L", "XL", "2X"];

// export default function ProductDetails() {
//   const [activeImage, setActiveImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColor, setSelectedColor] = useState(0);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div className="border rounded-2xl p-6 space-y-5">
//           <div className="flex justify-between items-start">
//             <h1 className="text-xl font-semibold">کت جین زنانه مدل یارا</h1>
//             <Heart className="text-gray-400 cursor-pointer" />
//           </div>

//           <div className="text-sm text-gray-600 space-y-1">
//             <p>دسته بندی: جین</p>
//             <p>کد: 34567</p>
//             <p>جنس: جین</p>
//             <p>سایزبندی: XS تا 2X</p>
//             <p>قد: 45 - 50</p>
//           </div>

//           <div className="text-lg font-bold">1,245,000 تومان</div>

//           <div>
//             <p className="mb-2 font-medium">رنگ</p>
//             <div className="flex gap-3">
//               {colors.map((color, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedColor(index)}
//                   className={`w-8 h-8 rounded
//                   ${color}
//                   ${selectedColor === index ? "ring-2 ring-orange-400" : ""}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Sizes */}
//           <div>
//             <p className="mb-2 font-medium">سایز</p>
//             <div className="flex flex-wrap gap-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded
//                   ${
//                     selectedSize === size
//                       ? "bg-black text-white"
//                       : "hover:border-black"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             <p className="text-xs text-gray-400 mt-1">راهنمای اندازه‌گیری</p>
//           </div>

//           <button className="w-full bg-gray-300 py-3 rounded-lg font-medium hover:bg-gray-400 transition">
//             افزودن به سبد خرید
//           </button>
//         </div>
//         <div className="flex gap-4">
//           <div className="hidden sm:flex flex-col gap-3">
//             {images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveImage(index)}
//                 className={`w-20 h-24 rounded-xl overflow-hidden border
//                 ${
//                   activeImage === index
//                     ? "border-orange-400"
//                     : "border-transparent"
//                 }`}
//               >
//                 <img src={img} alt="" className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
//             <img
//               src={images[activeImage]}
//               alt=""
//               className="w-full h-full object-cover"
//             />

//             <button
//               onClick={() => setActiveImage((prev) => Math.max(prev - 1, 0))}
//               className="absolute left-4 bg-white p-2 rounded-full shadow"
//             >
//               <ChevronLeft />
//             </button>

//             <button
//               onClick={() =>
//                 setActiveImage((prev) => Math.min(prev + 1, images.length - 1))
//               }
//               className="absolute right-4 bg-white p-2 rounded-full shadow"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const images = [
  "/Product2.png",
  "/Product3.png",
  "/Product4.png",
  "/Product5.png",
];

const colors = [
  {
    name: "طوسی",
    class: "bg-gray-300",
  },
  {
    name: "ذغالی",
    class: "bg-gray-700",
  },
  {
    name: "مشکی",
    class: "bg-black",
  },
  {
    name: "سبز",
    class: "bg-emerald-200",
  },
  {
    name: "سفید",
    class: "bg-white border",
  },
  {
    name: "زرد",
    class: "bg-yellow-400",
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "2X"];

export default function ProductDetails() {
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);

  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  const addProduct = () => {
    if (!selectedSize || selectedColor === null) {
      setError("لطفاً رنگ و سایز محصول را انتخاب کنید");

      setTimeout(() => setError(""), 2500);

      return;
    }

    addToCart({
      id: 34567,

      title: "کت جین زنانه مدل یارا",

      image: images[activeImage],

      price: 1245000,

      quantity: 1,

      size: selectedSize,

      color: colors[selectedColor].name,
    });

    navigate("/Basket");
  };

  return (
    <section
      className="
min-h-screen
bg-[#faf9f6]
py-16
px-5
"
    >
      <div
        className="
max-w-[1250px]
mx-auto
grid
grid-cols-1
lg:grid-cols-2
gap-14
items-start
"
      >
        {/* Gallery */}

        <div
          className="
order-2
lg:order-1
flex
gap-5
"
        >
          <div
            className="
hidden
sm:flex
flex-col
gap-4
"
          >
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`
w-24
h-28
rounded-2xl
overflow-hidden
transition

${activeImage === index ? "ring-2 ring-black" : "opacity-60 hover:opacity-100"}

`}
              >
                <img
                  src={img}
                  className="
w-full
h-full
object-cover
"
                />
              </button>
            ))}
          </div>

          <div
            className="
relative
flex-1
bg-[#f1f0ed]
rounded-[40px]
overflow-hidden
h-[650px]
flex
items-center
justify-center
"
          >
            <img
              src={images[activeImage]}
              className="
w-full
h-full
object-cover
transition
duration-700
"
            />

            <button
              onClick={() => setActiveImage((p) => Math.max(p - 1, 0))}
              className="
absolute
left-5
top-1/2
-translate-y-1/2
w-12
h-12
rounded-full
bg-white
shadow
flex
items-center
justify-center
"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() =>
                setActiveImage((p) => Math.min(p + 1, images.length - 1))
              }
              className="
absolute
right-5
top-1/2
-translate-y-1/2
w-12
h-12
rounded-full
bg-white
shadow
flex
items-center
justify-center
"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Info */}

        <div
          className="
order-1
lg:order-2
bg-white
rounded-[40px]
p-8
shadow-sm
"
        >
          <div
            className="
flex
justify-between
items-start
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
                NEW COLLECTION
              </p>

              <h1
                className="
text-3xl
font-semibold
"
              >
                کت جین زنانه مدل یارا
              </h1>
            </div>

            <Heart
              className="
text-gray-400
hover:text-black
cursor-pointer
transition
"
            />
          </div>

          <div
            className="
mt-8
space-y-3
text-sm
text-gray-500
"
          >
            <p>دسته بندی : جین</p>

            <p>جنس : جین premium</p>

            <p>کد محصول : 34567</p>
          </div>

          <p
            className="
text-2xl
font-bold
mt-8
"
          >
            1,245,000 تومان
          </p>

          <div
            className="
mt-8
"
          >
            <p
              className="
font-medium
mb-4
"
            >
              انتخاب رنگ
            </p>

            <div
              className="
flex
gap-4
"
            >
              {colors.map((color, index) => (
                <button
                  key={index}
                  title={color.name}
                  onClick={() => setSelectedColor(index)}
                  className={`
w-10
h-10
rounded-full
${color.class}

${selectedColor === index ? "ring-2 ring-black ring-offset-4" : ""}

`}
                />
              ))}
            </div>
          </div>

          <div
            className="
mt-8
"
          >
            <p
              className="
font-medium
mb-4
"
            >
              انتخاب سایز
            </p>

            <div
              className="
flex
flex-wrap
gap-3
"
            >
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
px-5
py-3
rounded-full
border
transition

${selectedSize === size ? "bg-black text-white" : "hover:border-black"}

`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div
              className="
mt-6
bg-red-50
text-red-600
rounded-xl
p-3
text-sm
"
            >
              {error}
            </div>
          )}

          <button
            onClick={addProduct}
            className="
mt-8
w-full
h-14
rounded-full
bg-black
text-white
flex
items-center
justify-center
gap-3
hover:scale-[1.02]
transition
"
          >
            <ShoppingBag size={20} />
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </section>
  );
}
