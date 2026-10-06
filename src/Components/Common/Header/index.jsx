import React, { useContext, useState } from "react";
import { CartContext } from "../../../../src/context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";

import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { PiUserLight, PiUserCircleLight } from "react-icons/pi";
import { BsBag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

import { NavLink } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import MegaMenu from "../../Common/MegaMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const { cartItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      dir="rtl"
      className="
        w-full
        font-yekan
        absolute
        inset-x-0
        top-0
        z-50
      "
    >
      <div className="bg-[#1f2240] text-white text-sm">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            md:px-6
            py-2
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-2 mr-12">
            <button
              aria-label="change-language"
              className="
                flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                text-xs
              "
            >
              <span className="hidden sm:inline">IRAN | Per</span>
            </button>

            <div className="avatar">
              <div
                className="
                  ring-offset-base-100
                  w-8
                  rounded-full
                  ring-2
                  ring-offset-2
                "
              >
                <img src="/langu.png" alt="language" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <img src="/Bus.svg" alt="ارسال" className="w-5 h-5" />

            <span className="hidden md:inline">
              هزینه ارسال برای سفارش های بالای ۲ میلیون رایگان
            </span>

            <span className="md:hidden">ارسال رایگان بالای ۲M</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <div
                className="
                  w-8
                  h-8
                  bg-gray-700
                  rounded-full
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-white
                  hover:text-[#151538]
                  transition
                "
              >
                <FaTiktok size={18} />
              </div>

              <div
                className="
                  w-8
                  h-8
                  bg-gray-700
                  rounded-full
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-white
                  hover:text-[#151538]
                  transition
                "
              >
                <FaYoutube size={18} />
              </div>

              <div
                className="
                  w-8
                  h-8
                  bg-gray-700
                  rounded-full
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-white
                  hover:text-[#151538]
                  transition
                "
              >
                <FaInstagram size={18} />
              </div>

              <div
                className="
                  w-8
                  h-8
                  bg-gray-700
                  rounded-full
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:bg-white
                  hover:text-[#151538]
                  transition
                "
              >
                <FaFacebookF size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            md:px-6
            py-4
            flex
            items-center
            justify-between
            gap-6
          "
        >
          <div className="flex items-center gap-4 mr-8">
            <NavLink to="/" className="flex items-center gap-2">
              <div
                className="
                  hidden
                  sm:block
                  text-white
                  text-xl
                  font-medium
                  -ml-2
                "
              >
                ONA SHOP
              </div>

              <div
                className="
                  bg-slate-900
                  text-white
                  rounded-full
                  px-3
                  py-1
                  font-semibold
                "
              >
                L
              </div>
            </NavLink>
          </div>

          <nav
            className="
              hidden
              md:flex
              items-center
              gap-8
              flex-1
              justify-center
            "
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `
                  transition-colors
                  ${isActive ? "text-white" : "text-white hover:text-gray-300"}
                `
              }
            >
              صفحه اصلی
            </NavLink>

            <div
              className="relative h-full"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <NavLink
                to="/Store"
                className={({ isActive }) =>
                  `
                    group
                    transition-colors
                    flex
                    items-center
                    gap-1.5
                    ${
                      isActive ? "text-white" : "text-white hover:text-gray-300"
                    }
                  `
                }
              >
                <span>فروشگاه</span>

                <ChevronDown
                  size={15}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:rotate-180
                  "
                  style={{
                    transform: megaOpen ? "rotate(180deg)" : undefined,
                  }}
                />
              </NavLink>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      fixed
                      top-[110px]
                      left-0
                      right-0
                      z-[90]
                      flex
                      justify-center
                      pt-4
                    "
                  >
                    <div
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <MegaMenu />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `
                  transition-colors
                  ${isActive ? "text-white" : "text-white hover:text-gray-300"}
                `
              }
            >
              وبلاگ
            </NavLink>

            <NavLink
              to="/About"
              className={({ isActive }) =>
                `
                  transition-colors
                  ${isActive ? "text-white" : "text-white hover:text-gray-300"}
                `
              }
            >
              درباره ما
            </NavLink>

            <NavLink
              to="/ContactPage"
              className={({ isActive }) =>
                `
                  transition-colors
                  ${isActive ? "text-white" : "text-white hover:text-gray-300"}
                `
              }
            >
              ارتباط با ما
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {openSearch && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-[110px]
                    bg-white
                    z-[100]
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
                      <CiSearch size={25} className="text-gray-800" />
                    </div>

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
                          text-gray-900
                          placeholder:text-gray-400
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

                    <button
                      onClick={() => setOpenSearch(false)}
                      aria-label="close search"
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
              aria-label="search"
              className="
                p-2
                hover:opacity-50
                transition
              "
            >
              <CiSearch size={28} className="text-white" />
            </button>

            {isLoggedIn ? (
              <NavLink
                to="/Panel"
                aria-label="panel"
                className="
      p-2
      rounded-full
      hidden
      sm:inline-flex
    "
              >
                <PiUserCircleLight size={28} className="text-white" />
              </NavLink>
            ) : (
              <NavLink
                to="/Login"
                aria-label="login"
                className="
      p-2
      rounded-full
      hidden
      sm:inline-flex
    "
              >
                <PiUserLight size={28} className="text-white" />
              </NavLink>
            )}

            <NavLink
              to="/Basket"
              aria-label="cart"
              className="
                p-2
                rounded-full
                relative
              "
            >
              <BsBag size={24} className="text-white" />

              {totalQuantity > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -left-1
                    bg-black
                    text-white
                    text-xs
                    rounded-full
                    px-1.5
                    min-w-[18px]
                    h-5
                    flex
                    items-center
                    justify-center
                    font-semibold
                  "
                >
                  {totalQuantity}
                </span>
              )}
            </NavLink>

            <button
              className="
                md:hidden
                p-2
                rounded
                text-white
              "
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                md:hidden
                bg-white
                border-t
                overflow-hidden
              "
            >
              <div
                className="
                  px-5
                  py-5
                  space-y-2
                "
              >
                {/* Search */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    pb-4
                    border-b
                  "
                >
                  <CiSearch size={22} className="text-gray-700" />

                  <input
                    dir="rtl"
                    placeholder="جستجو..."
                    className="
                      flex-1
                      outline-none
                      text-sm
                      text-gray-800
                      bg-transparent
                    "
                  />
                </div>

                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className="
                    block
                    py-3
                    text-gray-800
                  "
                >
                  صفحه اصلی
                </NavLink>

                <NavLink
                  to="/Store"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    items-center
                    justify-between
                    py-3
                    text-gray-800
                  "
                >
                  <span>فروشگاه</span>

                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    className="text-gray-500"
                  />
                </NavLink>

                <NavLink
                  to="/blog"
                  onClick={closeMobileMenu}
                  className="
                    block
                    py-3
                    text-gray-800
                  "
                >
                  وبلاگ
                </NavLink>

                <NavLink
                  to="/About"
                  onClick={closeMobileMenu}
                  className="
                    block
                    py-3
                    text-gray-800
                  "
                >
                  درباره ما
                </NavLink>

                <NavLink
                  to="/ContactPage"
                  onClick={closeMobileMenu}
                  className="
                    block
                    py-3
                    text-gray-800
                  "
                >
                  ارتباط با ما
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
