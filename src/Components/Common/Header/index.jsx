import React, { useState } from "react";
import { Menu} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { PiUserLight } from "react-icons/pi";
import { BsBag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header dir="rtl" className="w-full font-sans">
      {/* نوار اطلاع‌رسانی بالا */}
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
            <img src="/sentbas.png" alt="" />
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

      {/* ناوبری اصلی */}
      <div className=" bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-6">
          {/* لوگو */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="bg-black text-white rounded px-3 py-1 font-semibold">
                Lona
              </div>
              <div className="hidden sm:block text-indigo-700 text-lg font-medium">
                LonaShoop
              </div>
            </a>
          </div>

          {/* منوهای میانی (نمایش در md+) */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <a href="Landing" className="text-gray-700 hover:text-indigo-600">
              صفحه اصلی
            </a>
            <a href="Store" className="text-gray-700 hover:text-indigo-600">
              فروشگاه
            </a>
            <a href="blog" className="text-gray-700 hover:text-indigo-600">
              وبلاگ
            </a>
            <a href="About" className="text-gray-700 hover:text-indigo-600">
              درباره ما
            </a>
          </nav>

          {/* آیکون‌ها و سرچ */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center px-3 py-1 gap-2">
              <button
                onClick={() => setOpenSearch(!openSearch)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="search"
              >
              <CiSearch size={28} />

              </button>
              <div
                className={`absolute left-64 top-[123px] bg-white shadow-lg rounded-xl w-96  transition-all duration-300 ${
                  openSearch
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <input
                  type="text"
                  placeholder="جستجو کنید..."
                  className="w-full px-4 py-3 border  focus:ring-2 focus:ring-blue-800 outline-none"
                  autoFocus={openSearch}
                />
              </div>
            </div>

            {/* آیکون پروفایل */}
            <button
              aria-label="profile"
              className="p-2 rounded-full hover:bg-gray-100 hidden sm:inline-flex"
            >
              <PiUserLight size={28}/>
            </button>

            {/* آیکون سبد خرید */}
            <button
              aria-label="cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <BsBag size={24} />
              <span className="absolute -top-1 -left-1 bg-black text-white text-xs rounded-full px-1.5">
                1
              </span>
            </button>

            {/* دکمه منوی موبایل */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* موبایل منو */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {" "}
              <div className="flex items-center gap-2">
                <Search size={16} />
                <input
                  dir="rtl"
                  placeholder="جستجو"
                  className="flex-1 outline-none text-sm"
                />
              </div>
              <a href="#" className="block py-2">
                صفحه اصلی
              </a>
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
