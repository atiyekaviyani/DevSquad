export default function ArticleSection() {
  return (
    <div>
      <div className="">
        <img src="Blog.png" alt="" className="w-full h-40" />
      </div>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 relative left-36">
          <div className="relative bg-white shadow rounded-2xl overflow-hidden">
            <img
              src="Frame 3.png"
              className="w-full h-[480px] object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
              alt=""
            />
            <div className="absolute bottom-3 bg-black/40 backdrop-blur-md text-white px-5 py-3 rounded-xl">
              <div className="text-xs opacity-80">مد و فشن</div>
              <div className="font-semibold mt-1">
                از پاریس تا لندن؛ بهترین‌های کالکشن بهار و تابستان ۲۰۲۵
              </div>

              <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                مشاهده همه
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative bg-white shadow rounded-2xl overflow-hidden">
                <img
                  src="Frame 5.png"
                  className="w-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                  alt=""
                />
                <div className="absolute bottom-4 left-4 backdrop-blur-md text-white px-3 py-2 rounded-xl">
                  <div className="text-xs">مد و پوشاک</div>
                  <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                    مشاهده همه
                  </button>
                </div>
              </div>

              <div className="relative bg-white shadow rounded-2xl overflow-hidden">
                <img
                  src="Frame 6.png"
                  className="w-full object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                  alt=""
                />
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl">
                  <div className="text-xs">راهنمای خرید</div>
                  <button className="mt-2 text-sm border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition">
                    مشاهده همه
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-white shadow rounded-2xl overflow-hidden">
              <img
                src="Frame 8.png"
                className="w-full h-60 object-cover transition-transform shadow-md hover:shadow-2xl duration-300 ease-in-out hover:scale-105"
                alt=""
              />
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white px-4 py-3 rounded-xl">
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
