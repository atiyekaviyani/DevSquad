import React from "react";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MenuColumn({ title, items }) {
  const menuItems = Array.isArray(items) ? items : [];

  return (
    <div className="min-w-[150px]">
      <div className="mb-6">
        <h3
          className="
            text-[14px]
            font-semibold
            tracking-tight
            text-[#1F2240]
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-3
            w-8
            h-[1px]
            bg-[#1F2240]/80
          "
        />
      </div>

      <ul className="space-y-0.5">
        {menuItems.map((item, index) => {
          const label = typeof item === "string" ? item : item?.label || "";

          const slug = typeof item === "string" ? "" : item?.slug || "";

          const storeUrl = slug
            ? `/Store?category=${encodeURIComponent(slug)}`
            : "/Store";

          return (
            <li key={`${label}-${slug}-${index}`}>
              <NavLink
                to={storeUrl}
                className="
                  group
                  relative
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-3
                  py-[7px]
                  px-3
                  rounded-[8px]
                  text-right
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:bg-white/65
                "
              >
                <span
                  className="
                    relative
                    text-[12.5px]
                    font-light
                    text-[#1F2240]/65
                    leading-6
                    transition-colors
                    duration-300
                    group-hover:text-[#1F2240]
                  "
                >
                  {label}

                  <span
                    className="
                      absolute
                      right-0
                      -bottom-0.5
                      h-[1px]
                      w-0
                      bg-[#1F2240]
                      transition-all
                      duration-500
                      ease-out
                      group-hover:w-full
                    "
                  />
                </span>

                <ChevronLeft
                  size={14}
                  strokeWidth={1.3}
                  className="
                    shrink-0
                    text-[#1F2240]/20
                    opacity-0
                    translate-x-1
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    group-hover:text-[#1F2240]/80
                  "
                />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
