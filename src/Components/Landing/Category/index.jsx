// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay } from "swiper/modules";
// // import "swiper/css";
// // import {
// //   FaShippingFast,
// //   FaUndoAlt,
// //   FaTag,
// //   FaCheckCircle,
// // } from "react-icons/fa";
// // import { MdVerified } from "react-icons/md";
// // import { SlBadge } from "react-icons/sl";
// // import { TbRosetteDiscountCheck } from "react-icons/tb";
// // import { LiaShippingFastSolid } from "react-icons/lia";
// // import { GoCheckCircle } from "react-icons/go";
// // import { IoMdReturnLeft } from "react-icons/io";
// // import { LuBadgeDollarSign } from "react-icons/lu";

// // const slidesData = [
// //   {
// //     text: "گارانتی یک ساله",
// //     icon: <SlBadge className="w-6 h-6" />,
// //   },
// //   {
// //     text: "۱۰% تخفیف روی همه کالاها",
// //     icon: <TbRosetteDiscountCheck className="w-6 h-6" />,
// //   },
// //   {
// //     text: "امکان مرجوع کالا تا ۲۴ ساعت",
// //     icon: <IoMdReturnLeft className="w-6 h-6" />,
// //   },
// //   {
// //     text: "ارسال رایگان",
// //     icon: <LiaShippingFastSolid className="w-6 h-6" />,
// //   },
// //   {
// //     text: "پشتیبانی ۲۴ ساعته",
// //     icon: <GoCheckCircle className="w-6 h-6" />,
// //   },
// //   {
// //     text: "پرداخت امن و آسان",
// //     icon: <LuBadgeDollarSign className="w-6 h-6" />,
// //   },
// // ];

// // export default function CustomSwiper() {
// //   return (
// //     <>
// //       {/* 📌 فقط برای تغییر سایز فونت — بدون دستکاری inline style */}
// //       <style>
// //         {`
// //           @media (max-width: 480px) {
// //             .slide-text {
// //               font-size: 14px !important;
// //             }
// //           }

// //           @media (max-width: 360px) {
// //             .slide-text {
// //               font-size: 12px !important;
// //             }
// //           }
// //         `}
// //       </style>

// //       <Swiper
// //         modules={[Autoplay]}
// //         spaceBetween={16}
// //         slidesPerView={5}
// //         loop={true}
// //         autoplay={{ delay: 3000, disableOnInteraction: false }}
// //         className="py-4 mt-16"
// //         breakpoints={{
// //           0: { slidesPerView: 2 },
// //           480: { slidesPerView: 3 },
// //           640: { slidesPerView: 4 },
// //           768: { slidesPerView: 5 },
// //           1024: { slidesPerView: 6 },
// //         }}
// //       >
// //         {slidesData.map(({ text, icon }, index) => (
// //           <SwiperSlide
// //             key={index}
// //             style={{
// //               width: 215,
// //               height: 47,
// //               display: "flex",
// //               flexDirection: "row",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               gap: 8,
// //               borderRadius: 8,
// //               padding: "0 12px",
// //               userSelect: "none",
// //               whiteSpace: "nowrap",
// //               color: "#2C2C2C",
// //             }}
// //           >
// //             {icon}
// //             <span
// //               className="slide-text"
// //               style={{ fontSize: 18, fontWeight: 500 }}
// //             >
// //               {text}
// //             </span>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </>
// //   );
// // }

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import {
//   FaShippingFast,
//   FaUndoAlt,
//   FaTag,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
// import { SlBadge } from "react-icons/sl";
// import { TbRosetteDiscountCheck } from "react-icons/tb";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import { GoCheckCircle } from "react-icons/go";
// import { IoMdReturnLeft } from "react-icons/io";
// import { LuBadgeDollarSign } from "react-icons/lu";

// const slidesData = [
//   {
//     text: "گارانتی یک ساله",
//     icon: <SlBadge className="w-6 h-6" />,
//   },
//   {
//     text: "۱۰% تخفیف   ",
//     icon: <TbRosetteDiscountCheck className="w-6 h-6" />,
//   },
//   {
//     text: "امکان مرجوع کالا  ",
//     icon: <IoMdReturnLeft className="w-6 h-6" />,
//   },
//   {
//     text: "ارسال رایگان",
//     icon: <LiaShippingFastSolid className="w-6 h-6" />,
//   },
//   {
//     text: "پشتیبانی ۲۴ ساعته",
//     icon: <GoCheckCircle className="w-6 h-6" />,
//   },
//   {
//     text: "پرداخت امن و آسان",
//     icon: <LuBadgeDollarSign className="w-6 h-6" />,
//   },
// ];

// export default function CustomSwiper() {
//   return (
//     <>
//       {/* فقط اضافه کردن ریسپانسیو فونت بدون دستکاری کد اصلی */}
//       <style>
//         {`
//           @media (max-width: 768px) {
//             .slide-text {
//               font-size: 16px !important;
//             }
//           }
//           @media (max-width: 480px) {
//             .slide-text {
//               font-size: 14px !important;
//             }
//           }
//           @media (max-width: 360px) {
//             .slide-text {
//               font-size: 12px !important;
//             }
//           }
//         `}
//       </style>

//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={16}
//         slidesPerView={5}
//         loop={true}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         className="py-4 mt-16"
//         breakpoints={{
//           0: { slidesPerView: 2 },
//           480: { slidesPerView: 3 },
//           640: { slidesPerView: 4 },
//           768: { slidesPerView: 5 },
//           1024: { slidesPerView: 6 },
//         }}
//       >
//         {slidesData.map(({ text, icon }, index) => (
//           <SwiperSlide
//             key={index}
//             style={{
//               width: 215,
//               height: 47,
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 8,
//               borderRadius: 8,
//               padding: "0 12px",
//               userSelect: "none",
//               whiteSpace: "nowrap",
//               color: "#2C2C2C",
//             }}
//           >
//             {icon}
//             <span className="slide-text" style={{ fontSize: 18, fontWeight: 500 }}>
//               {text}
//             </span>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }



import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  FaShippingFast,
  FaUndoAlt,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { IoMdReturnLeft } from "react-icons/io";
import { LuBadgeDollarSign } from "react-icons/lu";

const slidesData = [
  {
    text: "گارانتی یک ساله",
    icon: <SlBadge className="w-6 h-6" />,
  },
  {
    text: "۱۰% تخفیف   ",
    icon: <TbRosetteDiscountCheck className="w-6 h-6" />,
  },
  {
    text: "امکان مرجوع کالا  ",
    icon: <IoMdReturnLeft className="w-6 h-6" />,
  },
  {
    text: "ارسال رایگان",
    icon: <LiaShippingFastSolid className="w-6 h-6" />,
  },
  {
    text: "پشتیبانی ۲۴ ساعته",
    icon: <GoCheckCircle className="w-6 h-6" />,
  },
  {
    text: "پرداخت امن و آسان",
    icon: <LuBadgeDollarSign className="w-6 h-6" />,
  },
];

export default function CustomSwiper() {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .slide-text {
              font-size: 16px !important;
            }
          }
          @media (max-width: 480px) {
            .slide-text {
              font-size: 14px !important;
            }
          }
          @media (max-width: 360px) {
            .slide-text {
              font-size: 12px !important;
            }
          }
        `}
      </style>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        loop={true}
autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: false }}
        className="py-4 mt-16"
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {slidesData.map(({ text, icon }, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: 215,
              height: 47,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderRadius: 8,
              padding: "0 12px",
              userSelect: "none",
              whiteSpace: "nowrap",
              color: "#2C2C2C",
            }}
          >
            {icon}
            <span className="slide-text" style={{ fontSize: 18, fontWeight: 500 }}>
              {text}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}


