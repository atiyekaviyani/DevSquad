import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CategoryShowcase() {
  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              دسته‌بندی‌ها
            </h2>

            <p className="mt-4 text-gray-500 text-lg">
              انتخاب سبک مورد علاقه شما
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm border-b border-black pb-1">
            مشاهده همه
            <ArrowUpRight size={16}/>
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-gray-100">

            <img
              src="900.png"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

              <h3 className="text-3xl font-medium">
                مردانه
              </h3>

              <div className="
                mt-5 w-12 h-12 rounded-full
                bg-white text-black
                flex items-center justify-center
                opacity-0 translate-y-3
                group-hover:opacity-100
                group-hover:translate-y-0
                transition
              ">
                <ArrowUpRight size={20}/>
              </div>

            </div>

          </div>



          <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-gray-100">

            <img
              src="901.png"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

              <h3 className="text-3xl font-medium">
                زنانه
              </h3>

              <div className="
                mt-5 w-12 h-12 rounded-full
                bg-white text-black
                flex items-center justify-center
                opacity-0 translate-y-3
                group-hover:opacity-100
                group-hover:translate-y-0
                transition
              ">
                <ArrowUpRight size={20}/>
              </div>

            </div>

          </div>



          <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-gray-100">

            <img
              src="902.png"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">

              <h3 className="text-3xl font-medium">
                جدیدترین‌ها
              </h3>

              <div className="
                mt-5 w-12 h-12 rounded-full
                bg-white text-black
                flex items-center justify-center
                opacity-0 translate-y-3
                group-hover:opacity-100
                group-hover:translate-y-0
                transition
              ">
                <ArrowUpRight size={20}/>
              </div>

            </div>

          </div>


        </div>

      </div>
    </section>
  );
}