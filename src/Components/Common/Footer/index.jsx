// import React from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";

// const index = () => {
//   return (
//     <div>
//       <footer class="bg-[#202323]">
//         <div class="mx-auto w-full max-w-screen-xl text-[#F6F6F6] text-end">
//           <div class="grid grid-cols-2 px-4 py-6 lg:py-8 md:grid-cols-4 border-b-2 border-gray-400">
//             <div>
//               <h2 class="mb-6 text-lg font-semibold text-heading">مکان</h2>
//               <ul class="text-body font-medium">
//                 <li class="mb-4">
//                   <h href="#" class=" text-sm">
//                     مازندران ساری خیابان فرهنگ فروشگاه لونا شاپ
//                   </h>
//                 </li>

//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     دانلود اپلیکیشن
//                   </a>
//                 </li>
//                 <div className="">
//                   <div className=" w-full">
//                     <div className="max-w-6xl mx-auto text-center">
//                       {/* Stores */}
//                       <div className="flex flex-col gap-10 sm:flex-row justify-center items-center ">
//                         {/* App Store */}
//                         <a
//                           href="#"
//                           className="flex items-center gap-6 text-white hover:opacity-80 transition"
//                         >

//                           <div className="text-left leading-tight w-32">
//                             <p className="text-sm">Available on the</p>
//                             <p className="text-سئ font-semibold">App Store</p>
//                           </div><img
//                             src="AppStore.svg"
//                             alt="App Store"
//                             className="w- h-auto"
//                           />
//                         </a>

//                         {/* Google Play */}
//                         <a
//                           href="#"
//                           className="flex items-center gap-4 text-white hover:opacity-80 transition"
//                         >
//                           {" "}
//                           <div className="text-left leading-tight w-36">
//                             <p className="text-xs">android app on</p>
//                             <p className="text-xs font-semibold">Google Play</p>
//                           </div>  <img
//                             src="GooglePlay.svg"
//                             alt="Google Play"
//                             className="w-12 h-auto"
//                           />
//                         </a>

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ul>
//             </div>
//             <div>
//               <h2 class="mb-6 text-lg font-semibold text-heading ">
//                 اطلاعات بیشتر{" "}
//               </h2>
//               <ul class="text-body text-sm font-medium">
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     شرایط و ظوابط{" "}
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     سیاست حفظ حریم خصوصی
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     شیوه ارسال
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     نقشه سایت{" "}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h2 class="mb-6 text-lg font-semibold text-heading ">لونا شاپ</h2>
//               <ul class="text-body font-medium">
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     ارتباط باما{" "}
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     وبلاگ لونا شاپ
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     آدرس
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     همکاری
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     رسانه
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h2 class="mb-6 text-lg font-semibold text-heading ">
//                 ارتباط باما
//               </h2>
//               <ul class="text-body text-sm font-medium">
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     تماس باما
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     پیگیری سفارشات
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     بازگشت و بازپرداخت
//                   </a>
//                 </li>
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     سوالات متداول
//                   </a>
//                 </li>{" "}
//                 <li class="mb-4">
//                   <a href="#" class="hover:underline">
//                     فرصت های شغلی
//                   </a>
//                 </li>
//                 <div>
//                   <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-white ml-36 mt-7">
//                     <a
//                       href="https://facebook.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-blue-600 transition"
//                       aria-label="Facebook"
//                     >
//                       <FaFacebookF size={28} />
//                     </a>
//                     <a
//                       href="https://twitter.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-blue-400 transition"
//                       aria-label="Twitter"
//                     >
//                       <FaTwitter size={28} />
//                     </a>
//                     <a
//                       href="https://instagram.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-pink-500 transition"
//                       aria-label="Instagram"
//                     >
//                       <FaInstagram size={28} />
//                     </a>
//                     <a
//                       href="https://linkedin.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-blue-700 transition"
//                       aria-label="LinkedIn"
//                     >
//                       <FaLinkedinIn size={28} />
//                     </a>
//                   </div>
//                 </div>
//               </ul>
//             </div>
//           </div>
//           <div class="px-4 py-6 -secondary-soft md:flex md:items-center md:justify-between">

//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default index;

// src/components/common/Footer/index.jsx

import React from "react";
import {
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowUpLeft,
} from "lucide-react";

function Footer() {
  return (
    <footer
      dir="rtl"
      className="
        bg-[#0B1114]
        text-white
        mt-32
      "
    >
      <div
        className="
          max-w-[1400px]
          mx-auto
          px-6
          lg:px-10
        "
      >
        {/* Brand */}
        <div
          className="
            text-center
            py-20
            border-b
            border-white/10
          "
        >
          <h2
            className="
              text-5xl
              md:text-7xl
              font-light
              tracking-[18px]
            "
          >
            LONA
          </h2>

          <p
            className="
              mt-6
              text-xs
              tracking-[4px]
              text-white/50
            "
          >
            سادگی لوکس، کیفیت ماندگار
          </p>
        </div>

        {/* Columns */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
            py-16
            border-b
            border-white/10
          "
        >
          {/* Services */}
          <div>
            <h3 className="mb-8 text-base font-light">خدمات مشتریان</h3>

            <ul className="space-y-6 text-sm text-white/55">
              <li className="flex items-center gap-3 hover:text-white transition cursor-pointer">
                <Truck size={18} strokeWidth={1.4} />
                ارسال سفارش
              </li>

              <li className="flex items-center gap-3 hover:text-white transition cursor-pointer">
                <RotateCcw size={18} strokeWidth={1.4} />
                بازگشت کالا
              </li>

              <li className="flex items-center gap-3 hover:text-white transition cursor-pointer">
                <ShieldCheck size={18} strokeWidth={1.4} />
                ضمانت کیفیت
              </li>
            </ul>
          </div>

          {/* Collection */}
          <div>
            <h3 className="mb-8 text-base font-light">کالکشن‌ها</h3>

            <ul className="space-y-5 text-sm text-white/55">
              <li className="hover:text-white transition cursor-pointer">
                جدیدترین‌ها
              </li>

              <li className="hover:text-white transition cursor-pointer">
                زنانه
              </li>

              <li className="hover:text-white transition cursor-pointer">
                مردانه
              </li>

              <li className="hover:text-white transition cursor-pointer">
                پیشنهاد ویژه
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-8 text-base font-light">ارتباط با ما</h3>

            <ul className="space-y-6 text-sm text-white/55">
              <li className="flex items-center gap-3">
                <MapPin size={18} strokeWidth={1.4} />
                مازندران، ساری
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.4} />
                تماس با ما
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-8 text-base font-light">دنبال کنید</h3>

            <p
              className="
                text-sm
                text-white/50
                leading-7
                mb-8
              "
            >
              جدیدترین کالکشن‌ها و اخبار لونا را دنبال کنید.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition-all
                "
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition-all
                "
              >
                <Youtube size={18} />
              </a>

              <a
                href="#"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition-all
                "
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            py-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            text-xs
            text-white/40
          "
        >
          <span>© 2026 LONA SHOP</span>

          <span className="flex items-center gap-2">
            طراحی مینیمال، کیفیت ماندگار
            <ArrowUpLeft size={14} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
