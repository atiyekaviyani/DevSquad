import React, { useState, useContext } from "react";
import { CartContext } from "../../../../src/context/CartContext";
import { Menu } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { PiUserLight } from "react-icons/pi";
import { BsBag } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import MegaMenu from "../../Common/MegaMenu";

import { motion, AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { X } from "lucide-react";
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { cartItems } = useContext(CartContext); // دریافت داده های سبد خرید از کانتکست

  // محاسبه تعداد کل اقلام در سبد
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      dir="rtl"
      className="w-full  font-yekan absolute inset-x-0 top-0 z-50"
    >
      <div className="bg-[#1f2240] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 mr-12">
            <button
              aria-label="change-language"
              className="flex items-center gap-2  px-3 py-1 rounded-full text-xs"
            >
              <span className="hidden sm:inline">IRAN | Per</span>
            </button>{" "}
            <div className="avatar">
              <div className="ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                <img src="langu.png" className="" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <img src="/Bus.svg" alt="" />
            <span className="hidden md:inline">
              هزینه ارسال برای سفارش های بالای ۲ میلیون رایگان
            </span>
            <span className="md:hidden">ارسال رایگان بالای ۲M</span>
          </div>

          <div className="flex items-center gap-3 ">
            {/* شبکه‌های اجتماعی */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center md:gap-3 ">
                {/* TikTok */}
                <div className="w-8 h-8  bg-gray-700 rounded-full border border-gray-300 flex items-center justify-center text-white hover:bg-white hover:text-[#151538] transition">
                  <FaTiktok size={18} />
                </div>{" "}
                {/* YouTube */}
                <div className="w-8 h-8  bg-gray-700 rounded-full border border-gray-300 flex items-center justify-center text-white hover:bg-white hover:text-[#151538] transition">
                  <FaYoutube size={18} />
                </div>{" "}
                {/* Instagram */}
                <div className="w-8 h-8  bg-gray-700 rounded-full border border-gray-300 flex items-center justify-center text-white hover:bg-white hover:text-[#151538] transition">
                  <FaInstagram size={18} />
                </div>
                {/* Facebook */}
                <div className="w-8 h-8  bg-gray-700 rounded-full border border-gray-300 flex items-center justify-center text-white hover:bg-white hover:text-[#151538] transition">
                  <FaFacebookF size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 mr-8">
            <a href="#" className="flex items-center gap-2">
              <div className="hidden sm:block text-white text-xl font-medium -ml-2">
                ONASHOOP
              </div>{" "}
              <div className="bg-slate-900 text-white rounded-full px-3 py-1 font-semibold">
                L
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {/* <a href="Landing" className="text-white hover:text-indigo-600">
              صفحه اصلی
            </a> */}

            {/* <a href="Store" className="text-gray-700 hover:text-indigo-600">
              فروشگاه
            </a> */}

            {/*           
<MegaMenu/> */}

            <div className="" onMouseEnter={() => setMegaOpen(true)}>
              {/* <NavLink to="/Store">
                <button className="text-white hover:text-indigo-600">
                  فروشگاه
                </button>
              </NavLink> */}

              
              {megaOpen && (
                <div className="" onMouseLeave={() => setMegaOpen(false)}>
                  {/* <MegaMenu /> */}
                </div>
              )}
            </div>

            <NavLink to="/Store">
                <button className="text-white hover:text-indigo-600">
                  مردانه
                </button>
              </NavLink>

              <NavLink to="/Store">
                <button className="text-white hover:text-indigo-600">
                  زنانه
                </button>
              </NavLink>


            <a href="blog" className="text-white hover:text-indigo-600">
              وبلاگ
            </a>
            <a href="About" className="text-white hover:text-indigo-600">
              درباره ما
            </a>
            <a
              href="/ContactPage"
              className="text-white hover:text-indigo-600"
            >
              ارتباط باما
            </a>
          </nav>

          <div className="flex items-center gap-3">
           <AnimatePresence>
  {openSearch && (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
      absolute
      inset-0
      top-0
      h-[110px]
      bg-white
      z-50
      flex
      items-center
      border-b
      border-gray-900/10
      "
    >

      <div
        className="
        max-w-[1450px]
        mx-auto
        w-full
        px-6
        lg:px-14
        flex
        items-center
        gap-8
        "
      >

        {/* Search Icon */}

        <div
          className="
          flex
          items-center
          justify-center
          w-12
          h-12
          rounded-full
          border
          border-gray-900/10
          "
        >
          <CiSearch
            size={25}
            className="text-gray-800"
          />
        </div>


        {/* Input Area */}

        <div className="flex-1">

          <input
            autoFocus
            type="text"
            placeholder="جستجوی محصول، کالکشن یا دسته‌بندی..."
            className="
            w-full
            bg-transparent
            outline-none
            text-[22px]
            font-light
            tracking-tight
            text-white
            placeholder:text-gray-300
            text-right
            "
          />


          <div
            className="
            mt-3
            w-full
            h-px
            bg-gray-900/20
            "
          />

        </div>


        {/* Quick Text */}

        <span
          className="
          hidden
          xl:block
          text-[11px]
          tracking-[4px]
          uppercase
          text-gray-400
          "
        >
          Search
        </span>


        {/* Close */}

        <button
          onClick={() => setOpenSearch(false)}
          className="
          group
          w-12
          h-12
          rounded-full
          border
          border-gray-900/10
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:bg-gray-900
          hover:text-white
          "
        >

          <X
            size={22}
            strokeWidth={1.4}
            className="
            transition-transform
            duration-300
            group-hover:rotate-90
            "
          />

        </button>


      </div>

    </motion.div>
  )}
</AnimatePresence>
            <button
              onClick={() => setOpenSearch(true)}
              className="
 p-2
 hover:opacity-50
 transition
 "
            >
              <CiSearch size={28} className="text-white" />
            </button>

            <button
              aria-label="profile"
              className="p-2 rounded-full  hidden sm:inline-flex"
            >
              <NavLink to="/Login">
                <PiUserLight size={28} className="text-white" />
              </NavLink>
            </button>

            <NavLink to="Basket">
              <button aria-label="cart" className="p-2 rounded-full relative">
                <BsBag size={24} className="text-white" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -left-1 bg-black text-white text-xs rounded-full px-1.5 min-w-[18px] h-5 flex items-center justify-center font-semibold">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </NavLink>

            <button
              className="md:hidden p-2 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="menu"
            >
              <Menu size={20}  />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {" "}
              <div className="flex items-center gap-2">
                <Search size={16} />
                <input
                  dir="rtl"
                  placeholder="جستجو"
                  className="flex-1 outline-none text-sm text-white"
                />
              </div>
              {/* <a href="#" className="block py-2 font-yekan">
                صفحه اصلی
              </a> */}
              <a href="#" className="block py-2">
                فروشگاه
              </a>
              <a href="#" className="block py-2">
                وبلاگ
              </a>
              <a href="#" className="block py-2">
                درباره ما
              </a>
              <div className="pt-2 border-t"></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
