// import { ArrowUpRight } from "lucide-react";

// import heroImage from "../../../../public/style1.png";
// import shirt from "../../../../public/style2.png";
// import pants from "../../../../public/style3.png";
// import tshirt from "../../../../public/style4.png";
// import shoes from "../../../../public/style5.png";

// export default function HeroSection() {
//   const products = [
//     {
//       id: 1,
//       title: "پیراهن لینن",
//       color: "کرم",
//       price: "۱,۲۵۰,۰۰۰",
//       image: shirt,
//     },
//     {
//       id: 2,
//       title: "شلوار پارچه‌ای",
//       color: "مشکی",
//       price: "۱,۴۸۰,۰۰۰",
//       image: pants,
//     },
//     {
//       id: 3,
//       title: "تیشرت پنبه",
//       color: "سفید",
//       price: "۶۸۰,۰۰۰",
//       image: tshirt,
//     },
//     {
//       id: 4,
//       title: "کتونی مینیمال",
//       color: "سفید",
//       price: "۲,۳۹۰,۰۰۰",
//       image: shoes,
//     },
//   ];

//   return (
//     <section className="w-full bg-[#f5f5f3] py-10">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="grid grid-cols-12 gap-6">
//           {/* Left */}
//           <div className="col-span-5 flex flex-col">
//             <h2 className="mb-5 text-2xl font-bold">استایل امروز</h2>
//             <div className="space-y-3">
//               {products.map((item) => (
//                 <div
//                   key={item.id}
//                   className="group flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt=""
//                       className="h-16 w-16 rounded-xl object-cover"
//                     />
//                     <div>
//                       <h3 className="text-base font-bold">{item.title}</h3>
//                       <p className="text-xs text-gray-400">رنگ: {item.color}</p>
//                       <p className="mt-1 text-sm font-semibold">
//                         {item.price} تومان
//                       </p>
//                     </div>
//                   </div>
//                   <button className="flex items-center gap-1 text-sm font-medium transition group-hover:translate-x-0.5">
//                     مشاهده
//                     <ArrowUpRight size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button className="mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-black text-sm font-semibold text-white transition hover:opacity-90">
//               خرید این استایل
//               <ArrowUpRight size={18} />
//             </button>
//           </div>

//           {/* Right - با اندازه مناسب و نمایش کامل عکس */}
//           <div className="col-span-7">
//             <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-zinc-200">
//               <img
//                 src={heroImage}
//                 alt="Hero"
//                 className="h-full w-full object-contain transition duration-500 hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//               <div className="absolute left-6 top-6 rounded-full bg-white/80 px-4 py-1.5 backdrop-blur-sm">
//                 <p className="text-xs font-semibold">New Collection</p>
//               </div>
//               <div className="absolute bottom-8 right-8 left-8">
//                 <p className="mb-2 text-sm text-gray-200">
//                   کالکشن تابستان ۱۴۰۵
//                 </p>
//                 <h1 className="max-w-md text-3xl font-black leading-[1.2] text-white">
//                   استایل مینیمال،
//                   <br />
//                   ساده اما
//                   <br />
//                   ماندگار
//                 </h1>
//                 <p className="mt-4 max-w-md text-sm leading-7 text-gray-200">
//                   مجموعه‌ای از لباس‌های مینیمال با طراحی مدرن، پارچه‌های باکیفیت
//                   و رنگ‌های خنثی برای استفاده روزمره و استایل‌های خاص طراحی
//                   شده‌اند.
//                 </p>
//                 <button className="mt-6 flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold transition hover:scale-105">
//                   مشاهده کالکشن
//                   <ArrowUpRight size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import heroImage1 from "../../../../public/style1.png";
import heroImage2 from "../../../../public/style6.png";
import heroImage3 from "../../../../public/style11.png";


import shirt from "../../../../public/style2.png";
import pants from "../../../../public/style3.png";
import tshirt from "../../../../public/style4.png";
import shoes from "../../../../public/style5.png";



import shirt2 from "../../../../public/style7.png";
import pants2 from "../../../../public/style8.png";
import tshirt2 from "../../../../public/style9.png";
import shoes2 from "../../../../public/style10.png";


import shirt3 from "../../../../public/style12.png";
import pants3 from "../../../../public/style13.png";
import tshirt3 from "../../../../public/style14.png";
import shoes3 from "../../../../public/style15.png";

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      products: [
        {
          id: 1,
          title: "پیراهن لینن",
          color: "کرم",
          price: "۱,۲۵۰,۰۰۰",
          image: shirt,
        },
        {
          id: 2,
          title: "شلوار پارچه‌ای",
          color: "قهوای موکا",
          price: "۱,۴۸۰,۰۰۰",
          image: pants,
        },
        {
          id: 3,
          title: "تیشرت پنبه",
          color: "سفید",
          price: "۶۸۰,۰۰۰",
          image: tshirt,
        },
        {
          id: 4,
          title: "کتونی مینیمال",
          color: "سفید",
          price: "۲,۳۹۰,۰۰۰",
          image: shoes,
        },
      ],
      heroImage: heroImage1,
      badge: "New Collection",
      collection: "کالکشن تابستان ۱۴۰۵",
      title: "استایل مینیمال،",
      title2: "ساده اما",
      title3: "ماندگار",
      description:
        "مجموعه‌ای از لباس‌های مینیمال با طراحی مدرن، پارچه‌های باکیفیت و رنگ‌های خنثی برای استفاده روزمره و استایل‌های خاص طراحی شده‌اند.",
    },
    {
      id: 2,
      products: [
        {
          id: 5,
          title: "کت اسپرت",
          color: "آبی",
          price: "۲,۸۰۰,۰۰۰",
          image: shirt2,
        },
        {
          id: 6,
          title: "تیشرت نخ پنبه ",
          color: "سفید",
          price: "۱,۲۰۰,۰۰۰",
          image: pants2,
        },
        {
          id: 7,
          title: " شلوار جین",
          color: "آبی",
          price: "۹۵۰,۰۰۰",
          image: tshirt2,
        },
        {
          id: 8,
          title: "کفش اسپرت",
          color: "سفید",
          price: "۱,۸۵۰,۰۰۰",
          image: shoes2,
        },
      ],
      heroImage: heroImage2,
      badge: "Special Offer",
      collection: "کالکشن پاییز ۱۴۰۵",
      title: "استایل اسپرت،",
      title2: "راحت اما",
      title3: "جذاب",
      description:
        "ترکیبی از لباس‌های اسپرت با طراحی مدرن و پارچه‌های نرم برای استفاده روزمره   .",
    },
    {
      id: 3,
      products: [
        {
          id: 9,
          title: "کت بلیزر",
          color: "مشکی",
          price: "۳,۲۰۰,۰۰۰",
          image: shirt3,
        },
        {
          id: 10,
          title: "پیراهن مردانه ",
          color: "سفید",
          price: "۱,۷۵۰,۰۰۰",
          image: pants3,
        },
        {
          id: 11,
          title: " شلوار راسته رسمی",
          color: "مشکی",
          price: "۹۸۰,۰۰۰",
          image: tshirt3,
        },
        {
          id: 12,
          title: "کفش رسمی",
          color: "مشکی",
          price: "۲,۵۰۰,۰۰۰",
          image: shoes3,
        },
      ],
      heroImage: heroImage3,
      badge: "Premium",
      collection: "کالکشن رسمی ۱۴۰۵",
      title: "استایل رسمی،",
      title2: "شیک اما",
      title3: "کلاسیک",
      description:
        "مجموعه‌ای از لباس‌های رسمی با طراحی کلاسیک و پارچه‌های لوکس برای مجالس و مهمانی‌های خاص.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const data = slides[currentSlide];

  return (
    <section className="w-full bg-[#f5f5f3] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-12 gap-6">

          {/* Left */}
          <div className="col-span-5 flex flex-col">
            <h2 className="mb-5 text-2xl font-bold">استایل امروز</h2>
            <div className="space-y-3">
              {data.products.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold">{item.title}</h3>
                      <p className="text-xs text-gray-400">رنگ: {item.color}</p>
                      <p className="mt-1 text-sm font-semibold">{item.price} تومان</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-medium transition group-hover:translate-x-0.5">
                    مشاهده
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-black text-sm font-semibold text-white transition hover:opacity-90">
              خرید این استایل
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Right */}
          <div className="col-span-7">
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-zinc-200">
              <img
                src={data.heroImage}
                alt="Hero"
                className="h-full w-full object-contain transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-white/80 px-4 py-1.5 backdrop-blur-sm">
                <p className="text-xs font-semibold">{data.badge}</p>
              </div>
              <div className="absolute bottom-8 right-8 left-8">
                <p className="mb-2 text-sm text-gray-200">{data.collection}</p>
                <h1 className="max-w-md text-3xl font-black leading-[1.2] text-white">
                  {data.title}
                  <br />
                  {data.title2}
                  <br />
                  {data.title3}
                </h1>
                <p className="mt-4 max-w-md text-sm leading-7 text-gray-200">
                  {data.description}
                </p>
                <button className="mt-6 flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold transition hover:scale-105">
                  مشاهده کالکشن
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Slider Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}