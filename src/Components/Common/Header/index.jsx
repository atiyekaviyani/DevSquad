import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import React from "react";

const index = () => {
  return (
    <div className="border-2 border-gray-100 w-screen h-20 shadow-md flex justify-around">
      <div className="border-2 border-transparent w-fit flex justify-center gap-3 mt-6">
        <div className="border-2 border-transparent w-16 h-10">
          <UserOutlined style={{ fontSize: "28px", color: "gray" }} />
        </div>
        <div className="border-2 border-transparent w-16 h-10">
          <ShoppingOutlined style={{ fontSize: "28px", color: "gray" }} />
        </div>

        <div className="flex items-center justify-center w-full py-10 ">
          <div className="relative w-full max-w-md -mt-12" dir="rtl">
            {/* input */}
            <input
              type="text"
              placeholder="دنبال چی می‌گردی ...؟"
              className="w-full shadow-2xl rounded-full border  border-gray-300 py-3 pr-5 pl-12 text-gray-700 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all duration-200 placeholder-gray-400"
            />

            <div className="absolute  left-3 w-9 h-9 top-1/2 -translate-y-1/2  bg-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white mr-1 mt-"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-transparent w-96">
        <Link to="/" className="">
          <div className="border-2 border-transparent w-36 relative left-[100px]">
            <img src="./Frame 2.png"></img>
          </div>
        </Link>
      </div>

      <div className="border-2 border-transparent w-[500px]">
        <div className="w-full mx-auto flex justify-center gap-6 mt-7">
           <NavLink
            to={"conect"}
            className={({ isActive }) =>
              `${
                isActive &&
               "text-gray-950 border-b-4 border-orange-500 h-14 relative from-inherit text-base"
              } whitespace-normal hover:text-slate-800 font-sans text-gray-700 dark:text-white`
            }
          >
         تماس باما{" "}
          </NavLink>
           <NavLink
            to={"about"}
            className={({ isActive }) =>
              `${
                isActive &&
              "text-gray-950 border-b-4  border-orange-500 h-14 relative from-inherit text-base"
              } whitespace-normal hover:text-slate-800 font-sans  text-gray-700 dark:text-white`
            }
          >
         درباره ما{" "}
          </NavLink>
          <NavLink
            to={"article"}
            className={({ isActive }) =>
              `${
                isActive &&
                "text-gray-950 border-b-4 border-orange-500 h-14 relative from-inherit text-base"
              } whitespace-normal hover:text-slate-800 font-sans  text-gray-700 dark:text-white`
            }
          >
            وبلاگ{" "}
          </NavLink>



          <NavLink
            to={"/store"}
            className={({ isActive }) =>
              `${
                isActive &&
               "text-gray-950 border-b-4 border-orange-500 h-14 relative from-inherit text-base"
              } whitespace-normal hover:text-slate-800  font-sans  text-gray-700 dark:text-white`
            }
          >
         فروشگاه{" "}
          </NavLink>



          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${
                isActive &&
                "text-gray-950 border-b-4 border-orange-500 h-14 relative from-inherit text-base"
              } whitespace-normal hover:text-slate-800  font-sans text-gray-700 dark:text-white`
            }
          >
            صفحه اصلی{" "}
          </NavLink>



          <div></div>
        </div>
      </div>
    </div>
  );
};

export default index;
