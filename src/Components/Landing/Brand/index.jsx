// // import React from "react";

// // const index = () => {
// //   return (
// //     <div className=" flex justify-center gap-16 h-28 mt-10 bg-gray-200 items-center">
// //       <div className="  w-[168px]">
// //         <img src="public/Brand1.png" alt="" />
// //       </div>
// //       <div className="w-[168px]">
// //         <img src="public/Brand2.png" alt="" />
// //       </div>
// //       <div className=" w-[168px]">
// //         <img src="public/Brand3.png" alt="" />
// //       </div>
// //       <div className=" w-[168px]">
// //         <img src="public/Brand4.png" alt="" />
// //       </div>
// //       <div className=" w-[168px]">
// //         <img src="public/Brand5.png" alt="" />
// //       </div>{" "}
// //       <div className=" w-[168px]">
// //         <img src="public/Brand6.png" alt="" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default index;


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
//       <div className="max-w-[1300px] mx-auto 
//                       grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
//                       gap-6 place-items-center">

//         {brands.map((src, index) => (
//           <div key={index} className="w-32">
//             <img 
//               src={src} 
//               alt={`brand-${index}`} 
//               className="w-full object-contain"
//             />
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }


import React from "react";

export default function BrandsRow() {
  const brands = [
    "/Brand1.png",
    "/Brand2.png",
    "/Brand3.png",
    "/Brand4.png",
    "/Brand5.png",
    "/Brand6.png",
  ];

  return (
    <div className="w-full bg-gray-200 py-6 mt-10">
      <div
        className="
          max-w-[1300px] mx-auto 
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
          gap-6 place-items-center
        "
      >
        {brands.map((src, index) => (
          <div
            key={index}
            className="
              group w-32 flex justify-center items-center
              transition-all duration-500
            "
          >
            <img
              src={src}
              alt={`brand-${index}`}
              className="
                w-full object-contain
                transition-all duration-500 ease-out
                group-hover:scale-110
                group-hover:rotate-[8deg]
                group-hover:opacity-90
                group-hover:shadow-xl
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
