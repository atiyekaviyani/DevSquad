// import { useEffect, useState, useContext } from "react";
// import { GoArrowUpRight } from "react-icons/go";
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

// export default function ProductGrid() {
//   const [products, setProducts] = useState([]);
//   const [added, setAdded] = useState({});
//   const [toast, setToast] = useState(false);

//   const { addToCart } = useContext(CartContext);

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

//   const buy = (item) => {
//     if (added[item.id]) return;

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

//     setToast(true);

//     setTimeout(() => setToast(false), 2000);

//     setTimeout(() => {
//       setAdded((prev) => {
//         const copy = { ...prev };

//         delete copy[item.id];

//         return copy;
//       });
//     }, 3000);
//   };

//   return (
//     <section
//       className="
// max-w-[1300px]
// mx-auto
// px-5
// mt-32
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
//             COLLECTION
//           </p>

//           <h2
//             className="
// text-3xl
// font-semibold
// "
//           >
//             جدیدترین محصولات
//           </h2>
//         </div>

//         <button
//           className="
// flex
// items-center
// gap-2
// text-sm
// border-b
// border-black
// pb-1
// hover:gap-4
// transition-all
// "
//         >
//           مشاهده همه
//           <GoArrowUpRight />
//         </button>
//       </div>

//       {toast && (
//         <div
//           className="
// fixed
// bottom-7
// right-7
// bg-black
// text-white
// px-5
// py-3
// rounded-full
// text-sm
// z-50
// "
//         >
//           به سبد خرید اضافه شد
//         </div>
//       )}

//       <div
//         className="
// grid
// grid-cols-1
// sm:grid-cols-2
// lg:grid-cols-4
// gap-x-7
// gap-y-14
// "
//       >
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="
// group
// relative
// "
//           >
//             <div
//               className="
// relative
// bg-[#faf9f7]
// rounded-[34px]
// overflow-hidden
// aspect-[4/5]
// flex
// items-center
// justify-center
// "
//             >
//               <div
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
//               </div>

//               <img
//                 src={item.thumbnail}
//                 className="
// w-[85%]
// h-[85%]
// object-contain
// transition
// duration-700
// group-hover:scale-105
// "
//               />

//               <button
//                 onClick={() => buy(item)}
//                 className={`
// absolute
// bottom-5
// left-5
// right-5
// h-12
// rounded-full
// text-sm
// transition
// duration-300

// ${
//   added[item.id]
//     ? "bg-green-600 text-white"
//     : "bg-black text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
// }

// `}
//               >
//                 {added[item.id] ? "اضافه شد" : "افزودن به سبد"}
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
//                 <RatingStars count={Math.round(item.rating)} />

//                 <span
//                   className="
// text-[11px]
// text-gray-400
// "
//                 >
//                   LN-{item.id}
//                 </span>
//               </div>

//               <h3
//                 className="
// font-medium
// text-sm
// line-clamp-2
// leading-6
// "
//               >
//                 {item.title}
//               </h3>

//               <p
//                 className="
// mt-3
// font-semibold
// "
//               >
//                 {(item.price * 60000).toLocaleString()}
//                 تومان
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // import { useEffect, useState, useContext } from "react";
// // import { GoArrowUpRight } from "react-icons/go";
// // import { FaStar } from "react-icons/fa";
// // import { CartContext } from "../../../context/CartContext";

// // function RatingStars({ count }) {
// //   return (
// //     <div className="flex gap-1">
// //       {[...Array(5)].map((_, i) => (
// //         <FaStar
// //           key={i}
// //           className={`text-[12px] ${
// //             i < count ? "text-black" : "text-gray-300"
// //           }`}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// // export default function ProductGrid() {
// //   const [products, setProducts] = useState([]);
// //   const [showToast, setShowToast] = useState(false);
// //   const [addedIds, setAddedIds] = useState({});

// //   const { addToCart } = useContext(CartContext);

// //   useEffect(() => {
// //     fetch("https://fakestoreapi.com/products?limit=8")
// //       .then((res) => res.json())
// //       .then((data) => setProducts(data));
// //   }, []);

// //   const addProduct = (item) => {
// //     if (addedIds[item.id]) return;

// //     addToCart({
// //       id: item.id,
// //       title: item.title,
// //       image: item.image,
// //       price: Math.floor(item.price * 60000),
// //       quantity: 1,
// //     });

// //     setAddedIds((prev) => ({
// //       ...prev,
// //       [item.id]: true,
// //     }));

// //     setShowToast(true);

// //     setTimeout(() => {
// //       setShowToast(false);
// //     }, 2000);

// //     setTimeout(() => {
// //       setAddedIds((prev) => {
// //         const copy = { ...prev };
// //         delete copy[item.id];
// //         return copy;
// //       });
// //     }, 3000);
// //   };

// //   return (
// //     <div
// //       className="
// // w-full max-w-[1300px]
// // mx-auto
// // px-5
// // mt-28
// // relative
// // "
// //     >
// //       <div className="flex justify-between items-center mb-10">
// //         <h2
// //           className="
// // text-2xl
// // font-semibold
// // tracking-tight
// // "
// //         >
// //           جدیدترین محصولات
// //         </h2>

// //         <button
// //           className="
// // flex items-center gap-2
// // border border-gray-300
// // rounded-full
// // px-5 py-2
// // text-sm
// // hover:bg-black
// // hover:text-white
// // transition
// // "
// //         >
// //           مشاهده بیشتر
// //           <GoArrowUpRight />
// //         </button>
// //       </div>

// //       {showToast && (
// //         <div
// //           className="
// // fixed bottom-6 right-6
// // bg-black text-white
// // px-5 py-3
// // rounded-full
// // text-sm
// // z-50
// // shadow-xl
// // "
// //         >
// //           محصول به سبد اضافه شد
// //         </div>
// //       )}

// //       <div
// //         className="
// // grid
// // grid-cols-1
// // sm:grid-cols-2
// // lg:grid-cols-4
// // gap-x-6
// // gap-y-10
// // "
// //       >
// //         {products.map((item) => {
// //           const added = addedIds[item.id];

// //           return (
// //             <div
// //               key={item.id}
// //               className="
// // group
// // relative
// // "
// //             >
// //               <div
// //                 className="
// // relative
// // bg-[#f6f6f4]
// // rounded-[28px]
// // overflow-hidden
// // h-[390px]
// // flex
// // items-center
// // justify-center
// // transition-all
// // duration-500
// // group-hover:shadow-2xl
// // "
// //               >
// //                 <span
// //                   className="
// // absolute top-5 left-5
// // bg-white
// // text-xs
// // px-3 py-1
// // rounded-full
// // shadow-sm
// // "
// //                 >
// //                   جدید
// //                 </span>

// //                 <img
// //                   src={item.image}
// //                   className="
// // h-[270px]
// // object-contain
// // transition duration-700
// // group-hover:scale-110
// // "
// //                 />

// //                 <button
// //                   onClick={() => addProduct(item)}
// //                   disabled={added}
// //                   className={`
// // absolute
// // bottom-5
// // left-5
// // right-5
// // h-12
// // rounded-full
// // text-sm
// // font-medium
// // transition-all
// // duration-300

// // ${
// //   added
// //     ? "bg-green-600 text-white"
// //     : "bg-black text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0"
// // }

// // `}
// //                 >
// //                   {added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
// //                 </button>
// //               </div>

// //               <div
// //                 className="
// // mt-5
// // flex
// // flex-col
// // gap-2
// // text-right
// // "
// //               >
// //                 <div className="flex justify-between items-center">
// //                   <RatingStars count={Math.floor(item.rating?.rate || 0)} />

// //                   <span
// //                     className="
// // text-xs
// // text-gray-400
// // "
// //                   >
// //                     LN-{item.id}
// //                   </span>
// //                 </div>

// //                 <h3
// //                   className="
// // text-sm
// // font-medium
// // line-clamp-2
// // leading-6
// // "
// //                 >
// //                   {item.title}
// //                 </h3>

// //                 <div
// //                   className="
// // flex justify-between items-center
// // mt-1
// // "
// //                 >
// //                   <p
// //                     className="
// // font-bold
// // text-base
// // "
// //                   >
// //                     {Math.floor(item.price * 60000).toLocaleString()}
// //                     تومان
// //                   </p>

// //                   <span
// //                     className="
// // text-xs
// // text-gray-400
// // "
// //                   >
// //                     موجود
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }





















import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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



export default function ProductGrid() {


const [products,setProducts]=useState([]);

const navigate = useNavigate();



useEffect(()=>{


Promise.all([

fetch("https://dummyjson.com/products/category/mens-shirts")
.then(r=>r.json()),


fetch("https://dummyjson.com/products/category/womens-dresses")
.then(r=>r.json())

])


.then(([men,women])=>{


setProducts(
[
...men.products,
...women.products
].slice(0,8)
)


})


},[])




return (


<section
className="
max-w-[1300px]
mx-auto
px-5
mt-32
"
>




<div className="
flex
justify-between
items-end
mb-12
">


<div>


<p className="
text-xs
tracking-[4px]
text-gray-400
mb-3
"
>
COLLECTION
</p>



<h2
className="
text-3xl
font-semibold
"
>

جدیدترین محصولات

</h2>


</div>




<button

className="
flex
items-center
gap-2
text-sm
border-b
border-black
pb-1
hover:gap-4
transition-all
"

>

مشاهده همه

<GoArrowUpRight/>

</button>


</div>






<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-x-7
gap-y-14
"
>




{
products.map((item)=>(



<div

key={item.id}

onClick={()=>navigate(`/ProductDetail/${item.id}`)}

className="
group
relative
cursor-pointer
"

>





<div

className="
relative
bg-[#faf9f7]
rounded-[34px]
overflow-hidden
aspect-[4/5]
flex
items-center
justify-center
"

>




<div

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

</div>







<img

src={item.thumbnail}

alt={item.title}

className="
w-[85%]
h-[85%]
object-contain
transition
duration-700
group-hover:scale-105
"

/>








<button


onClick={(e)=>{

e.stopPropagation();

navigate(`/ProductDetail/${item.id}`)

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
transition-all
duration-300
opacity-0
translate-y-4
group-hover:opacity-100
group-hover:translate-y-0
"

>


مشاهده محصول

<GoArrowUpRight className="inline ml-1"/>


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


<RatingStars

count={Math.round(item.rating)}

/>



<span

className="
text-[11px]
text-gray-400
"

>

LN-{item.id}

</span>



</div>







<h3

className="
font-medium
text-sm
line-clamp-2
leading-6
"

>

{item.title}

</h3>





<p

className="
mt-3
font-semibold
"

>

{(item.price*60000).toLocaleString()}

تومان

</p>





</div>






</div>



))

}





</div>





</section>


)

}
