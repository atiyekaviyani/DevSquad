import {
  Bell,
  Search,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link, useNavigate } from "react-router-dom";

const pageTitles = {
  "/panel": "داشبورد",
  "/panel/orders": "سفارش‌ها",
  "/panel/favorites": "علاقه‌مندی‌ها",
  "/panel/settings": "تنظیمات",
};

export default function PremiumPanelHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const title = pageTitles[location.pathname] || "پنل کاربری";

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  // تابع خروج
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/");
  };

  return (
    <>
      <header className="hidden lg:flex top-0 z-50 items-center justify-between px-6 md:px-12 h-16 md:h-20 bg-gradient-to-r from-neutral-900 to-neutral-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-white">
              {title}
            </h1>
            <p className="text-xs text-gray-400 hidden md:block">
              مدیریت کامل حساب کاربری شما
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-neutral-700/40 backdrop-blur-sm rounded-full px-4 py-2 w-80 border border-neutral-600 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-gray-400 text-white"
            />
          </motion.div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative p-2 rounded-full hover:bg-neutral-700/50 transition-all"
          >
            <Bell size={22} className="text-gray-200" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-xs flex items-center justify-center shadow-lg">
              2
            </span>
          </motion.button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-neutral-700 shadow-md"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white font-semibold">
                    A
                  </div>
                )}
              </motion.div>
              <ChevronDown
                size={16}
                className={`text-gray-200 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute z-50 left-2 mt-6 w-64 bg-slate-950 border border-neutral-700 rounded-xl p-2 shadow-lg"
                >
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="block w-full text-right text-white px-4 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    تغییر عکس پروفایل
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <Link
                    to="/panel/profile"
                    className="flex items-center text-white gap-2 px-4 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <User size={16} /> پروفایل
                  </Link>

                  <Link
                    to="/panel/settings"
                    className="flex items-center text-white gap-2 px-4 py-2 text-sm hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <Settings size={16} /> تنظیمات
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-900/20 rounded-lg w-full transition-all"
                  >
                    <LogOut size={16} /> خروج
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
