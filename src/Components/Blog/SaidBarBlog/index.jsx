import React, { useEffect, useState } from "react";
import TagsFilter from "../../Blog/TagsFilter";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-row-reverse items-center gap-4 p-3 bg-white border rounded-xl"
        >
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* سایدبار */}

      <section className="">
        <div className="min-h-[300px] flex flex-col text-right order-2 lg:order-1 gap-6">
          <label className="input h-12 w-72 flex items-center gap-2 bg-white shadow rounded-full px-3 py-2 border mx-auto">
            <svg
              className="h-[1.2em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              placeholder="... جستجو مقاله"
              className="w-full text-right outline-none bg-transparent"
            />
          </label>

          <div className="w-full">
            <h1 className="text-xl font-bold mb-3 text-right">
              دسته بندی مقالات
            </h1>

            <ul
              dir="rtl"
              className="
      menu bg-base-200 rounded-box w-full
      border-t-2 shadow-sm
      flex flex-col gap-2
      px-4 py-3
      text-right
    "
            >
              {[
                "مد و فشن",
                "طراحی دوخت و لباس",
                "راهنمای خرید لباس",
                "سبک زندگی",
                "مد و پوشاک",
              ].map((item, index) => (
                <li key={index} className="w-full">
                  <a
                    className="
            block w-full text-right
            cursor-pointer
            text-gray-700
            transition-all duration-200
            hover:text-blue-600
            hover:pr-2
          "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h1 className="text-xl font-bold mb-4 text-right">محصولات ویژه</h1>

            {loading ? (
              <ProductSkeleton />
            ) : (
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "تیشرت سفید نخ پنبه مدل کارا",
                    img: "image1.png",
                  },
                  {
                    title: "تیشرت چاپی نخ پنبه مدل نیوا",
                    img: "image2.png",
                  },
                  {
                    title: "تیشرت طرح چاپ نخ پنبه مدل یارا",
                    img: "image3.png",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex flex-row-reverse items-center gap-4 p-3 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.img}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-700 leading-6 text-right transition-colors duration-300 group-hover:text-blue-600">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <TagsFilter />
        </div>
      </section>
    </div>
  );
};

export default Index;
