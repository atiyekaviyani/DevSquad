

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
