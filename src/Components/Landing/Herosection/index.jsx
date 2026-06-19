// import React from "react";
// import { ArrowUpRight, Dot } from "lucide-react";
// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";

// export default function HeroSection() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.25,
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.section
//       className="w-[90%] mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-24"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Left Images */}
//       <motion.div
//         className="relative lg:w-1/2 flex justify-center"
//         variants={itemVariants}
//       >
//         <img
//           src="/imgHer1.png"
//           alt="model"
//           className="hidden sm:block sm:w-96 h-auto border border-black object-cover"
//         />

//         <img
//           src="/imgher2.png"
//           alt="small"
//           className="hidden sm:block sm:w-56 h-auto object-cover absolute -bottom-6 -right-4 shadow-lg"
//         />
//       </motion.div>

//       {/* Right Content */}
//       <motion.div
//         className="lg:w-1/2 flex flex-col items- text-right"
//         variants={itemVariants}
//       >
//         <motion.button
//           className="w-56 flex items-center gap-2 border-2 bg-gray-200 px-4 py-2 rounded-full text-sm"
//           variants={itemVariants}
//         >
//           <Dot className="w-4 h-4" />! مد را هدفمندانه کشف کن
//         </motion.button>

//         <motion.h1
//           className="text-3xl sm:text-4xl font-bold mt-4 leading-snug"
//           variants={itemVariants}
//         >
//           کالکشن ویژه لباس مردانه و <br /> زنانه ترند روز
//         </motion.h1>

//         <motion.p
//           className="text-gray-500 mt-4 leading-relaxed text-sm sm:text-base"
//           variants={itemVariants}
//         >
//           از انتخاب های خاص ما برای استایل برتر و خوش پوشی بی نهایت بهره مند
//           شوید. خریدی آسان با ارسال سریع و تضمین رضایت شما. با ما همیشه بدرخشید
//           و خوشتیپ بمانید!
//         </motion.p>

//         {/* Stats */}
//         <motion.div
//           className="grid grid-cols-3 gap-6 w-full mt-10 text-center"
//           variants={itemVariants}
//         >
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               3000+
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-500">رضایت مشتریان</p>
//           </div>
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               500+
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-500">محصولات جدید</p>
//           </div>
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               5000
//             </h3>
//             <p className="text-xs sm:text-sm text-gray-500">کاربران فروشگاه</p>
//           </div>
//         </motion.div>

//         {/* Buttons */}
//         <motion.div
//           className="flex gap-4 mt-10 justify-start lg:justify-end w-full"
//           variants={itemVariants}
//         >
//           <NavLink to="/store">
//             <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm hover:opacity-80 transition">
//               فروشگاه <ArrowUpRight className="w-4 h-4" />
//             </button>
//           </NavLink>

//           <button className="flex items-center gap-2 border border-black px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition">
//             کالکشن جدید <ArrowUpRight className="w-4 h-4" />
//           </button>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }

// import React from "react";
// import { ArrowUpRight, Dot } from "lucide-react";
// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";

// export default function HeroSection() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.25,
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.section
//       className="w-[90%] mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-24"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Left Images */}
//       <motion.div
//         className="relative lg:w-1/2 flex justify-center"
//         variants={itemVariants}
//       >
//         <img
//           src="/imgHer1.png"
//           alt="model"
//           className="hidden sm:block sm:w-96 h-auto rounded-xl shadow-2xl object-cover border border-gray-200"
//         />
//         <img
//           src="/imgher2.png"
//           alt="small"
//           className="hidden sm:block sm:w-56 h-auto object-cover absolute -bottom-6 -right-4 shadow-2xl rounded-lg border border-gray-200"
//         />
//       </motion.div>

//       {/* Right Content */}
//       <motion.div
//         className="lg:w-1/2 flex flex-col items-end text-right"
//         variants={itemVariants}
//       >
//         <motion.button
//           className="w-56 flex items-center gap-2 border-2 border-indigo-500 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 px-4 py-2 rounded-full text-sm font-semibold text-indigo-800 shadow-md hover:shadow-lg transition"
//           variants={itemVariants}
//         >
//           <Dot className="w-4 h-4 text-indigo-600 animate-pulse" />! مد را هدفمندانه کشف کن
//         </motion.button>

//         <motion.h1
//           className="text-3xl sm:text-4xl font-extrabold mt-4 leading-snug text-gray-900"
//           variants={itemVariants}
//         >
//           کالکشن ویژه لباس مردانه و <br /> زنانه ترند روز
//         </motion.h1>

//         <motion.p
//           className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base max-w-lg"
//           variants={itemVariants}
//         >
//           از انتخاب های خاص ما برای استایل برتر و خوش پوشی بی‌نهایت بهره‌مند شوید. خریدی آسان با ارسال سریع و تضمین رضایت شما. با ما همیشه بدرخشید و خوشتیپ بمانید!
//         </motion.p>

//         {/* Stats */}
//         <motion.div
//           className="grid grid-cols-3 gap-6 w-full mt-10 text-center"
//           variants={itemVariants}
//         >
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">3000+</h3>
//             <p className="text-xs sm:text-sm text-gray-500">رضایت مشتریان</p>
//           </div>
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">500+</h3>
//             <p className="text-xs sm:text-sm text-gray-500">محصولات جدید</p>
//           </div>
//           <div>
//             <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">5000</h3>
//             <p className="text-xs sm:text-sm text-gray-500">کاربران فروشگاه</p>
//           </div>
//         </motion.div>

//         {/* Buttons */}
//         <motion.div
//           className="flex gap-4 mt-10 justify-start lg:justify-end w-full"
//           variants={itemVariants}
//         >
//           <NavLink to="/store">
//             <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform">
//               فروشگاه <ArrowUpRight className="w-4 h-4" />
//             </button>
//           </NavLink>

//           <button className="flex items-center gap-2 border border-indigo-500 text-indigo-700 px-6 py-3 rounded-full text-sm font-semibold hover:bg-indigo-50 transition">
//             کالکشن جدید <ArrowUpRight className="w-4 h-4" />
//           </button>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }

import React from "react";
import { ArrowUpRight, Dot } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.25,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="w-[90%] mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Images */}
      <motion.div
        className="relative lg:w-1/2 flex justify-center"
        variants={itemVariants}
      >
        <img
          src="/imgHer1.png"
          alt="model"
          className="hidden sm:block sm:w-96 h-auto rounded shadow-2xl object-cover border hover:scale-95 transition-transform duration-500"
        />
        <img
          src="/imgher2.png"
          alt="small"
          className="hidden sm:block sm:w-56 h-auto object-cover absolute -bottom-6 -right-4 shadow-2xl rounded border  hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      <motion.div
        className="lg:w-1/2 flex flex-col items-end text-right"
        variants={itemVariants}
      >
        <motion.button
          className="w-56 flex items-center gap-2 border-2 border-gray-600 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 px-4 py-2 rounded-full text-sm font-semibold text-gray-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          variants={itemVariants}
        >
          <Dot className="w-4 h-4 text-gray-700 animate-pulse" />! مد را
          هدفمندانه کشف کن
        </motion.button>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mt-4 leading-snug text-gray-800"
          variants={itemVariants}
        >
          کالکشن ویژه لباس مردانه و <br /> زنانه ترند روز
        </motion.h1>

        <motion.p
          className="text-gray-700 mt-4 leading-relaxed text-sm sm:text-base max-w-lg"
          variants={itemVariants}
        >
          از انتخاب های خاص ما برای استایل برتر و خوش پوشی بی‌نهایت بهره‌مند
          شوید. خریدی آسان با ارسال سریع و تضمین رضایت شما. با ما همیشه بدرخشید
          و خوشتیپ بمانید!
        </motion.p>

        <motion.div
          className="grid grid-cols-3 gap-6 w-full mt-10 text-center"
          variants={itemVariants}
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-700">
              3000+
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">رضایت مشتریان</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-700">
              500+
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">محصولات جدید</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-700">
              5000
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">کاربران فروشگاه</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 mt-10 justify-start lg:justify-end w-full"
          variants={itemVariants}
        >
          <NavLink to="/store">
           
            <div className="group relative inline-block">
              <button className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-transform duration-300">
                فروشگاه <ArrowUpRight className="w-4 h-4" />
                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none"></span>
              </button>
            </div>{" "}
          </NavLink>

          <button className="flex items-center gap-2 border border-gray-600 text-gray-700 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 hover:text-white transition duration-300">
            کالکشن جدید <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
