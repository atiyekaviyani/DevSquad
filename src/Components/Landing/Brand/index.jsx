// import React from "react";

// export default function BrandsRow() {
//   const brands = [
//     "/Brand1.png",
//     "/Brand2.png",
//     "/Brand3.png",
//     "/Brand4.png",
//     "/Brand5.png",
//     "/Brand6.png",
//   ];

//   return (
//     <div className="w-full bg-gray-200 py-6 mt-10">
//       <div
//         className="
//           max-w-[1300px] mx-auto 
//           grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
//           gap-6 place-items-center
//         "
//       >
//         {brands.map((src, index) => (
//           <div
//             key={index}
//             className="
//               group w-32 flex justify-center items-center
//               transition-all duration-500
//             "
//           >
//             <img
//               src={src}
//               alt={`brand-${index}`}
//               className="
//                 w-full object-contain
//                 transition-all duration-500 ease-out
//               "
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
