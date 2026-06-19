import React from "react";
import { ChevronLeft } from "lucide-react";

export default function MenuColumn({ title, items }) {
  return (
    <div>
      <h3
        className="
        text-lg
        font-bold
        mb-8
      "
      >
        {title}
      </h3>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="
            group
            flex
            items-center
            justify-start
            cursor-pointer
            transition-all
            duration-300
            hover:-translate-x-1
          "
          >
            <ChevronLeft
              size={13}
              className="
              text-zinc-400
              group-hover:text-black
            "
            />

            <span
              className="
              relative
              text-zinc-700
              group-hover:text-black
            "
            >
              {item}

              <span
                className="
                absolute
                bottom-[-4px]
                right-0
                h-px
                w-0
                bg-black
                transition-all
                duration-300
                group-hover:w-full
              "
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
