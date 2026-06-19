import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "داشبورد", path: "/panel", icon: LayoutDashboard },
  { name: "سفارش‌ها", path: "/panel/orders", icon: ShoppingBag, badge: 3 },
  { name: "علاقه‌مندی‌ها", path: "/panel/favorites", icon: Heart },
  { name: "آدرس‌ها", path: "/panel/addresses", icon: MapPin },
  { name: "پروفایل", path: "/panel/profile", icon: User },
];

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true",
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleLogout = () => navigate("/");

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-5">
      <div>
        {/* Mini Profile */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } mb-10`}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold shadow-lg">
            A
          </div>
          {!collapsed && (
            <div className="text-right">
              <p className="text-sm text-white font-medium">علی رضایی</p>
              <p className="text-xs text-white/50">کاربر ویژه</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/panel"}
                className={({ isActive }) =>
                  `group relative flex ${
                    collapsed ? "justify-center" : "flex-row-reverse"
                  } items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#1e293b] text-white shadow-lg"
                      : "text-white/60 hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-2xl bg-[#1e293b]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon size={18} className="relative z-10" />
                    {!collapsed && (
                      <span className="relative z-10 text-sm font-light">
                        {item.name}
                      </span>
                    )}
                    {item.badge && !collapsed && (
                      <span className="ml-auto text-xs bg-slate-700 text-white px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && (
                      <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition bg-slate-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="space-y-2 border-t border-white/10 pt-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex justify-center py-2 text-white/60 hover:text-white transition"
        >
          <ChevronLeft
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
        <NavLink
          to="/panel/settings"
          className="flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-white/60 hover:bg-white/5 transition"
        >
          <Settings size={18} />
          {!collapsed && <span className="text-sm">تنظیمات</span>}
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm">خروج</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 flex items-center justify-between p-4 bg-[#0f172a] border-b border-white/10 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" />
        </button>
        <span className="text-white font-light"></span>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col ${
          collapsed ? "w-24" : "w-72"
        } min-h-screen fixed top-0 right-0 bg-[#0f172a] border-l border-white/10 z-50`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          // <>
          //   <motion.div
          //     initial={{ opacity: 0 }}
          //     animate={{ opacity: 1 }}
          //     exit={{ opacity: 0 }}
          //     onClick={() => setOpen(false)}
          //     className=" inset-0 bg-black/60 backdrop-blur-sm z-40"
          //   />
          //   <motion.aside
          //     initial={{ x: 300 }}
          //     animate={{ x: 0 }}
          //     exit={{ x: 300 }}
          //     transition={{ type: "spring", stiffness: 260, damping: 25 }}
          //     className="fixed top-0 right-0 w-72 h-full bg-[#0f172a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
          //   >
          //     {/* Mobile header inside drawer */}
          //     <div className="flex justify-between items-center p-4 border-b border-white/10">
          //       <span className="text-white"></span>
          //       <button onClick={() => setOpen(false)}>
          //         <X className="text-white" />
          //       </button>
          //     </div>
          //     {/* Search box */}
          //     <div className="p-4">
          //       <div className="flex items-center bg-neutral-700/40 backdrop-blur-sm rounded-full px-4 py-2 w-full border border-neutral-600">
          //         <Search size={18} className="text-gray-300" />
          //         <input
          //           type="text"
          //           placeholder="جستجو..."
          //           className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-gray-400 text-white"
          //         />
          //       </div>
          //     </div>
          //     <SidebarContent />
          //   </motion.aside>
          // </>
          <>
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 w-72 h-full bg-[#0f172a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              {/* Mobile header inside drawer */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <span className="text-white"></span>
                <button onClick={() => setOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>

              {/* Search box */}
              <div className="p-4">
                <div className="flex items-center bg-neutral-700/40 backdrop-blur-sm rounded-full px-4 py-2 w-full border border-neutral-600">
                  <Search size={18} className="text-gray-300" />
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-gray-400 text-white"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className={`flex-1 pt-16 lg:pt-0 ${
          collapsed ? "lg:mr-24" : "lg:mr-72"
        } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}
