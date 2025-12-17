export default function ArticleSection() {
  return (
    <div className="">
      <div>
        <img
          src="Blog.png"
          alt="blog banner"
          className="w-full h-40 object-cover"
        />
      </div>

      <section className="px-4 py-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-14">
          <div className="relative bg-white shadow rounded-2xl overflow-hidden h-[490px]">
            <img
              src="Frame 3.png"
              alt="article 1"
              className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
            />
            <div className="absolute bottom-3 left-5 right-5 bg-black/40 backdrop-blur-md text-white px-5 py-3 rounded-xl">
              <div className="text-xs opacity-80">مد و فشن</div>
              <div className="font-semibold mt-1">
                از پاریس تا لندن؛ بهترین‌های کالکشن بهار و تابستان ۲۰۲۵
              </div>
              <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                مشاهده همه
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative bg-white shadow rounded-2xl overflow-hidden h-52">
                <img
                  src="Frame 5.png"
                  alt="article 2"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl">
                  <div className="text-xs">مد و پوشاک</div>
                  <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                    مشاهده همه
                  </button>
                </div>
              </div>

              <div className="relative bg-white shadow rounded-2xl overflow-hidden h-52">
                <img
                  src="Frame 6.png"
                  alt="article 3"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl">
                  <div className="text-xs">راهنمای خرید</div>
                  <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                    مشاهده همه
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-white shadow rounded-2xl overflow-hidden h-64">
              <img
                src="Frame 8.png"
                alt="article 4"
                className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-xl">
                <div className="text-xs">طراحی و دوخت لباس</div>
                <div className="font-semibold text-sm mt-1">
                  تحولات طراحی دوخت
                </div>
                <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                  مشاهده همه
                </button>
              </div>
            </div>
          </div>
                 <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              

              <div className="relative bg-white shadow rounded-2xl overflow-hidden h-52 w-96">
                <img
                  src="Frame 6.png"
                  alt="article 3"
                  className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl">
                  <div className="text-xs">راهنمای خرید</div>
                  <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                    مشاهده همه
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-white shadow rounded-2xl overflow-hidden h-64 w-96">
              <img
                src="Frame 8.png"
                alt="article 4"
                className="w-full h-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-xl">
                <div className="text-xs">طراحی و دوخت لباس</div>
                <div className="font-semibold text-sm mt-1">
                  تحولات طراحی دوخت
                </div>
                <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                  مشاهده همه
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
