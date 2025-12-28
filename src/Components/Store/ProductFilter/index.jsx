// import { useMemo, useState } from "react";
// import { Search, Heart } from "lucide-react";
// import BlogShop from "../../Store/BlogShop";
// import { NavLink } from "react-router-dom";

// const PRODUCTS = [
//   {
//     id: 1,
//     title: "هودی مردانه ترک کد 34566",
//     price: 1990000,
//     image: "1.png",
//     gender: "men",
//     sizes: ["M", "L", "XL"],
//     available: true,
//   },
//   {
//     id: 2,
//     title: "تیشرت مردانه ترک کد 34567",
//     price: 1990000,
//     image: "2.png",
//     gender: "men",
//     sizes: ["S", "M"],
//     available: false,
//   },
//   {
//     id: 3,
//     title: "تیشرت زنانه کد 44221",
//     price: 1890000,
//     image: "3.png",
//     gender: "women",
//     sizes: ["XS", "S", "M"],
//     available: true,
//   },
//   {
//     id: 4,
//     title: "تیشرت ساده مردانه",
//     price: 1750000,
//     image: "4.png",
//     gender: "men",
//     sizes: ["M", "L"],
//     available: true,
//   },
//   {
//     id: 4,
//     title: "تیشرت ساده مردانه",
//     price: 1750000,
//     image: "5.png",
//     gender: "men",
//     sizes: ["M", "L"],
//     available: true,
//   },
//   {
//     id: 4,
//     title: "تیشرت ساده مردانه",
//     price: 1750000,
//     image: "6.png",
//     gender: "men",
//     sizes: ["M", "L"],
//     available: true,
//   },
// ];

// const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

// export default function ShopPage() {
//   const [search, setSearch] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [price, setPrice] = useState(5000000);
//   const [availability, setAvailability] = useState("");
//   const [gender, setGender] = useState("");

//   const filteredProducts = useMemo(() => {
//     return PRODUCTS.filter((p) => {
//       const matchSearch = p.title.includes(search);
//       const matchSize =
//         selectedSizes.length === 0 ||
//         selectedSizes.some((s) => p.sizes.includes(s));
//       const matchPrice = p.price <= price;
//       const matchAvailability =
//         availability === ""
//           ? true
//           : availability === "available"
//           ? p.available
//           : true;
//       const matchGender = gender === "" ? true : gender === p.gender;

//       return (
//         matchSearch &&
//         matchSize &&
//         matchPrice &&
//         matchAvailability &&
//         matchGender
//       );
//     });
//   }, [search, selectedSizes, price, availability, gender]);

//   const toggleSize = (size) => {
//     setSelectedSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       {/* جستجو */}
//       <div className="mb-6 flex gap-4 flex-wrap">
//         <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-1/2">
//           <Search size={18} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="جستجو"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="bg-transparent outline-none px-2 text-right text-sm placeholder-gray-400 w-full"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
//         {/* محصولات */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredProducts.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-xl p-3 hover:shadow transition"
//             >
//               <div className="relative">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className=" h-64 object-cover rounded-lg m-auto"
//                 />
//                 {/* <Heart className="absolute top-3 right-3 text-gray-400" /> */}
//               </div>

//               <div className="flex flex-col items-center text-center">
//                 <div className="mt-3 text-base">{item.title}</div>
//                 <div className="mt-1 font-semibold">
//                   {item.price.toLocaleString()} تومان
//                 </div>{" "}
//                 <NavLink to="/ProductDetail">
//                   <button
//                     type="button"
//                     className="mt-4 px-4 py-2 w-32 bg-black text-white rounded-md text-sm transition
//                    hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                   >
//                     مشاهده جزئیات
//                   </button>
//                 </NavLink>
//               </div>
//             </div>
//           ))}

//           {filteredProducts.length === 0 && (
//             <div className="col-span-full text-center text-gray-400">
//               محصولی یافت نشد
//             </div>
//           )}
//         </div>

//         {/* سایدبار سمت راست */}
//         <aside className="space-y-6 text-sm text-right">
//           {/* فیلتر سایز */}
//           <div>
//             <h3 className="font-semibold mb-2">فیلترها</h3>
//             <div className="flex flex-wrap gap-2 justify-end">
//               {ALL_SIZES.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => toggleSize(size)}
//                   className={`px-3 py-1 border rounded ${
//                     selectedSizes.includes(size) ? "bg-black text-white" : ""
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* فیلتر قیمت */}
//           <div>
//             <h3 className="font-semibold mb-2">فیلتر قیمت</h3>
//             <input
//               type="range"
//               min={500000}
//               max={5000000}
//               step={100000}
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full"
//             />
//             <div className="mt-1 text-xs">
//               تا {Number(price).toLocaleString()} تومان
//             </div>
//           </div>

//           {/* فیلتر موجودی */}
//           <div>
//             <h3 className="font-semibold mb-2">موجودی</h3>
//             <label className="flex gap-2 justify-end">
//               <input
//                 type="checkbox"
//                 onChange={(e) =>
//                   setAvailability(e.target.checked ? "available" : "")
//                 }
//               />
//               موجود
//             </label>
//           </div>

//           {/* فیلتر دسته بندی */}
//           <div>
//             <h3 className="font-semibold mb-2">دسته بندی</h3>
//             <label className="flex gap-2 justify-end">
//               <input
//                 type="radio"
//                 name="gender"
//                 onChange={() => setGender("men")}
//               />
//               مردانه
//             </label>
//             <label className="flex gap-2 justify-end">
//               <input
//                 type="radio"
//                 name="gender"
//                 onChange={() => setGender("women")}
//               />
//               زنانه
//             </label>
//             <label className="flex gap-2 justify-end">
//               <input
//                 type="radio"
//                 name="gender"
//                 onChange={() => setGender("")}
//                 defaultChecked
//               />
//               همه
//             </label>
//           </div>

//           <BlogShop />
//         </aside>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogShop from "../../Store/BlogShop";
import { NavLink } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    title: "هودی مردانه ترک کد 34566",
    price: 1990000,
    image: "1.png",
    gender: "men",
    sizes: ["M", "L", "XL"],
    available: true,
  },
  {
    id: 2,
    title: "تیشرت مردانه ترک کد 34567",
    price: 1990000,
    image: "2.png",
    gender: "men",
    sizes: ["S", "M"],
    available: false,
  },
  {
    id: 3,
    title: "تیشرت زنانه کد 44221",
    price: 1890000,
    image: "3.png",
    gender: "women",
    sizes: ["XS", "S", "M"],
    available: true,
  },
  {
    id: 4,
    title: "تیشرت ساده مردانه",
    price: 1750000,
    image: "4.png",
    gender: "men",
    sizes: ["M", "L"],
    available: true,
  },
  {
    id: 5,
    title: "تیشرت ساده مردانه",
    price: 1750000,
    image: "5.png",
    gender: "men",
    sizes: ["M", "L"],
    available: true,
  },
  {
    id: 6,
    title: "تیشرت ساده مردانه",
    price: 1750000,
    image: "6.png",
    gender: "men",
    sizes: ["M", "L"],
    available: true,
  },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState(5000000);
  const [availability, setAvailability] = useState("");
  const [gender, setGender] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch = p.title.includes(search);
      const matchSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((s) => p.sizes.includes(s));
      const matchPrice = p.price <= price;
      const matchAvailability =
        availability === ""
          ? true
          : availability === "available"
          ? p.available
          : true;
      const matchGender = gender === "" ? true : gender === p.gender;

      return (
        matchSearch &&
        matchSize &&
        matchPrice &&
        matchAvailability &&
        matchGender
      );
    });
  }, [search, selectedSizes, price, availability, gender]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* جستجو */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-1/2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="جستجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none px-2 text-right text-sm placeholder-gray-400 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* محصولات */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:shadow transition"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 object-cover m-auto"
                />
                {/* <Heart className="absolute top-3 right-3 text-gray-400" /> */}
              </div>

              <div className="flex flex-col items-center text-center mt-4">
                <h3 className="text-sm font-medium text-gray-800 leading-5 line-clamp-2">
                  {item.title}
                </h3>

                <span className="mt-2 text-sm font-semibold text-gray-900">
                  {item.price.toLocaleString()} تومان
                </span>

                <NavLink to="/ProductDetail" className="mt-4">
                  <button
                    type="button"
                    className="
        px-5 py-2 text-xs font-medium tracking-wide
        border border-gray-900 rounded-full
        text-gray-900 bg-transparent
        transition-all duration-300
        hover:bg-gray-900 hover:text-white
        focus:outline-none focus:ring-2 focus:ring-gray-300
      "
                  >
                    مشاهده جزئیات
                  </button>
                </NavLink>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              محصولی یافت نشد
            </div>
          )}
        </div>

        {/* فیلتر   */}
        <aside className="space-y-8 text-sm text-right border-l border-gray-200 pr-6 sticky top-20 self-start max-w-[300px]">
          {/* فیلتر سایز */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
              فیلترها
            </h3>
            <div className="flex flex-wrap gap-3 justify-end">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-1 rounded-md border transition
                    ${
                      selectedSizes.includes(size)
                        ? "bg-black text-white border-black shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }
                  `}
                  aria-pressed={selectedSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* فیلتر قیمت */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">فیلتر قیمت</h3>
            <input
              type="range"
              min={500000}
              max={5000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-1 rounded-lg bg-gray-300 accent-black cursor-pointer"
            />
            <div className="mt-1 text-xs text-gray-600">
              تا {Number(price).toLocaleString()} تومان
            </div>
          </div>

          {/* فیلتر موجودی */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">موجودی</h3>
            <label className="inline-flex items-center gap-2 cursor-pointer text-gray-700">
              <input
                type="checkbox"
                onChange={(e) =>
                  setAvailability(e.target.checked ? "available" : "")
                }
                className="form-checkbox mr-48 h-5 w-5 text-black rounded focus:ring-0"
              />
              موجود
            </label>
          </div>

          {/* فیلتر دسته بندی */}

          <div>
  <h3 className="font-semibold mb-2 text-gray-800">دسته بندی</h3>

  <div className="flex flex-col gap-3 text-gray-700">
    <label className="inline-flex flex-row-reverse items-center justify-between cursor-pointer">
      <span>مردانه</span>
      <input
        type="checkbox"
        name="gender"
        onChange={() => setGender("men")}
        className="form-checkbox h-5 w-5 ml-4 text-black rounded focus:ring-0"
      />
    </label>

    <label className="inline-flex flex-row-reverse items-center justify-between cursor-pointer">
      <span>زنانه</span>
      <input
        type="checkbox"
        name="gender"
        onChange={() => setGender("women")}
        className="form-checkbox h-5 w-5 ml-4 text-black rounded focus:ring-0"
      />
    </label>

    <label className="inline-flex flex-row-reverse items-center justify-between cursor-pointer">
      <span>همه</span>
      <input
        type="checkbox"
        name="gender"
        onChange={() => setGender("")}
        defaultChecked
        className="form-checkbox h-5 w-5 ml-4 text-black rounded focus:ring-0"
      />
    </label>
  </div>
</div>


          <BlogShop />
        </aside>
      </div>
    </div>
  );
}
