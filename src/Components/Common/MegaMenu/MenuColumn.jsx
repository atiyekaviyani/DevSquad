// import React from "react";
// import { ChevronLeft } from "lucide-react";

// export default function MenuColumn({ title, items }) {
//   return (
//     <div className="min-w-[150px]">
//       {/* Column Title */}
//       <div className="mb-7">
//         <h3
//           className="
//             text-[15px]
//             font-semibold
//             text-[#1f2240]
//             tracking-tight
//           "
//         >
//           {title}
//         </h3>

//         {/* Elegant Divider */}
//         <div className="mt-3 w-7 h-[1px] bg-[#1f2240]" />
//       </div>

//       {/* Menu Items */}
//       <ul className="space-y-1">
//         {items.map((item, index) => (
//           <li key={`${item}-${index}`}>
//             <button
//               type="button"
//               className="
//                 group
//                 w-full
//                 flex
//                 items-center
//                 justify-between
//                 gap-3
//                 py-2
//                 px-2
//                 rounded-lg
//                 text-right
//                 cursor-pointer
//                 transition-all
//                 duration-300
//                 hover:bg-zinc-50
//               "
//             >
//               {/* Item Text */}
//               <span
//                 className="
//                   relative
//                   text-[13px]
//                   font-light
//                   text-zinc-600
//                   leading-6
//                   transition-colors
//                   duration-300
//                   group-hover:text-[#1f2240]
//                 "
//               >
//                 {item}

//                 {/* Animated Underline */}
//                 <span
//                   className="
//                     absolute
//                     right-0
//                     -bottom-0.5
//                     h-[1px]
//                     w-0
//                     bg-[#1f2240]
//                     transition-all
//                     duration-500
//                     ease-out
//                     group-hover:w-full
//                   "
//                 />
//               </span>

//               {/* Arrow */}
//               <ChevronLeft
//                 size={14}
//                 strokeWidth={1.4}
//                 className="
//                   shrink-0
//                   text-zinc-300
//                   opacity-0
//                   translate-x-1
//                   transition-all
//                   duration-300
//                   group-hover:opacity-100
//                   group-hover:translate-x-0
//                   group-hover:text-[#1f2240]
//                 "
//               />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import React from "react";
import { ChevronLeft } from "lucide-react";

export default function MenuColumn({ title, items }) {
  return (
    <div className="min-w-[150px]">
      {/* Title */}
      <div className="mb-7">
        <h3
          className="
            text-[15px]
            font-semibold
            text-[#1F2240]
            tracking-tight
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-3
            w-7
            h-[1px]
            bg-[#1F2240]
          "
        />
      </div>

      {/* Items */}
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            <button
              type="button"
              className="
                group
                w-full
                flex
                items-center
                justify-between
                gap-3
                py-2
                px-3
                rounded-lg
                text-right
                cursor-pointer
                transition-all
                duration-300
                hover:bg-white/70
              "
            >
              <span
                className="
                  relative
                  text-[13px]
                  font-light
                  text-[#1F2240]/65
                  leading-6
                  transition-colors
                  duration-300
                  group-hover:text-[#1F2240]
                "
              >
                {item}

                <span
                  className="
                    absolute
                    right-0
                    -bottom-0.5
                    h-[1px]
                    w-0
                    bg-[#1F2240]
                    transition-all
                    duration-500
                    ease-out
                    group-hover:w-full
                  "
                />
              </span>

              <ChevronLeft
                size={14}
                strokeWidth={1.4}
                className="
                  shrink-0
                  text-[#1F2240]/20
                  opacity-0
                  translate-x-1
                  transition-all
                  duration-300
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  group-hover:text-[#1F2240]
                "
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}