// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import { motion } from "framer-motion";
// import { SlBadge } from "react-icons/sl";
// import { TbRosetteDiscountCheck } from "react-icons/tb";
// import { IoMdReturnLeft } from "react-icons/io";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import { GoCheckCircle } from "react-icons/go";
// import { LuBadgeDollarSign } from "react-icons/lu";

// const slidesData = [
//   {
//     text: "گارانتی یک ساله",
//     icon: <SlBadge className="w-5 h-5 text-gray-600" />,
//   },
//   {
//     text: "۱۰% تخفیف",
//     icon: <TbRosetteDiscountCheck className="w-5 h-5 text-gray-600" />,
//   },
//   {
//     text: "امکان مرجوع کالا",
//     icon: <IoMdReturnLeft className="w-5 h-5 text-gray-600" />,
//   },
//   {
//     text: "ارسال رایگان",
//     icon: <LiaShippingFastSolid className="w-5 h-5 text-gray-600" />,
//   },
//   {
//     text: "پشتیبانی ۲۴ ساعته",
//     icon: <GoCheckCircle className="w-5 h-5 text-gray-600" />,
//   },
//   {
//     text: "پرداخت امن و آسان",
//     icon: <LuBadgeDollarSign className="w-5 h-5 text-gray-600" />,
//   },
// ];

// const slideVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
//   }),
// };

// export default function CustomSwiper() {
//   return (
//     <>
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={20}
//         slidesPerView={5}
//         loop={true}
//         autoplay={{
//           delay: 1500,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: false,
//         }}
//         className="py-6 mt-16"
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
//             style={{ width: 210, height: 50, userSelect: "none" }}
//           >
//             <motion.div
//               custom={index}
//               variants={slideVariants}
//               initial="hidden"
//               animate="visible"
           
//               transition={{ type: "spring", stiffness: 300 }}
//               className="flex items-center gap-3 rounded-xl px-4 py-2 cursor-pointer bg-white border border-gray-200 text-gray-700 select-none"
//             >
//               {icon}
//               <span
//                 className="slide-text"
//                 style={{ fontSize: 14, fontWeight: 500, userSelect: "none" }}
//               >
//                 {text}
//               </span>
//             </motion.div>
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
import { motion } from "framer-motion";
import { SlBadge } from "react-icons/sl";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { IoMdReturnLeft } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoCheckCircle } from "react-icons/go";
import { LuBadgeDollarSign } from "react-icons/lu";

const slidesData = [
  {
    text: "گارانتی یک ساله",
    icon: <SlBadge className="w-5 h-5 text-gray-600" />,
  },
  {
    text: "۱۰% تخفیف",
    icon: <TbRosetteDiscountCheck className="w-5 h-5 text-gray-600" />,
  },
  {
    text: "امکان مرجوع کالا",
    icon: <IoMdReturnLeft className="w-5 h-5 text-gray-600" />,
  },
  {
    text: "ارسال رایگان",
    icon: <LiaShippingFastSolid className="w-5 h-5 text-gray-600" />,
  },
  {
    text: "پشتیبانی ۲۴ ساعته",
    icon: <GoCheckCircle className="w-5 h-5 text-gray-600" />,
  },
  {
    text: "پرداخت امن و آسان",
    icon: <LuBadgeDollarSign className="w-5 h-5 text-gray-600" />,
  },
];

const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function CustomSwiper() {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        className="py-6 mt-16"
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
            style={{ width: 210, height: 50, userSelect: "none" }}
          >
            <motion.div
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-3 rounded-xl px-4 py-2 bg-white border border-gray-200 text-gray-700 select-none"
            >
              {icon}
              <span
                className="slide-text"
                style={{ fontSize: 14, fontWeight: 500, userSelect: "none" }}
              >
                {text}
              </span>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
