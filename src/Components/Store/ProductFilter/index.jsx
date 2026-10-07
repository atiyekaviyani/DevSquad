// import { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   Tag,
//   Ruler,
//   CircleDollarSign,
//   PackageCheck,
//   ChevronDown,
//   RotateCcw,
//   Check,
// } from "lucide-react";

// import { NavLink, useSearchParams } from "react-router-dom";
// import { getBrands } from "../../../Core/Services/api/brandApi";
// import { getCategories } from "../../../Core/Services/api/categoryApi";
// import { getProducts } from "../../../Core/Services/api/productApi";
// import BlogShop from "../../../Components/Store/BlogShop";
// import { getSortOptions } from "../../../Core/Services/api/sortApi";

// const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

// const PRODUCTS_PER_PAGE = 12;

// export default function ShopPage() {
//   const [searchParams] = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [sortOptions, setSortOptions] = useState([]);

//   const [search, setSearch] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(5000000);
//   const [availability, setAvailability] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");

//   const [selectedSort, setSelectedSort] = useState(() => {
//     return searchParams.get("sort") || "";
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const [openSections, setOpenSections] = useState({
//     category: true,
//     brand: true,
//     size: true,
//     price: true,
//     availability: true,
//   });

//   useEffect(() => {
//     const loadStoreData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [productsData, categoriesData, brandsData, sortOptionsData] =
//           await Promise.all([
//             getProducts(),
//             getCategories(),
//             getBrands(),
//             getSortOptions(),
//           ]);

//         console.log(
//           "STORE SORT OPTIONS DATA:",
//           JSON.stringify(sortOptionsData, null, 2),
//         );

//         if (Array.isArray(sortOptionsData)) {
//           setSortOptions(sortOptionsData);
//         } else {
//           setSortOptions([]);
//         }

//         console.log(
//           "STORE PRODUCTS DATA:",
//           JSON.stringify(productsData, null, 2),
//         );

//         console.log(
//           "STORE CATEGORIES DATA:",
//           JSON.stringify(categoriesData, null, 2),
//         );

//         console.log("STORE BRANDS DATA:", JSON.stringify(brandsData, null, 2));

//         if (!Array.isArray(productsData)) {
//           setProducts([]);
//           setError("لیست محصولات دریافت نشد.");
//           return;
//         }

//         setProducts(productsData);

//         if (Array.isArray(categoriesData)) {
//           setCategories(categoriesData);
//         } else {
//           setCategories([]);
//         }

//         if (Array.isArray(brandsData)) {
//           setBrands(brandsData);
//         } else {
//           setBrands([]);
//         }
//       } catch (err) {
//         console.error("STORE DATA ERROR:", err);

//         setError(err?.message || "دریافت اطلاعات فروشگاه با خطا مواجه شد.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStoreData();
//   }, []);

//   const getProductPrice = (product) => {
//     if (Array.isArray(product?.variants) && product.variants.length > 0) {
//       const availableVariant = product.variants.find(
//         (variant) => Number(variant?.stock || 0) > 0,
//       );

//       if (availableVariant?.price != null) {
//         return Number(String(availableVariant.price).replace(/,/g, "")) || 0;
//       }

//       if (product.variants[0]?.price != null) {
//         return Number(String(product.variants[0].price).replace(/,/g, "")) || 0;
//       }
//     }

//     return Number(String(product?.price ?? "0").replace(/,/g, "")) || 0;
//   };

//   const getProductSizes = (product) => {
//     if (!Array.isArray(product?.variants)) {
//       return [];
//     }

//     return [
//       ...new Set(
//         product.variants.map((variant) => variant?.size).filter(Boolean),
//       ),
//     ];
//   };

//   const isProductAvailable = (product) => {
//     if (!Array.isArray(product?.variants)) {
//       return true;
//     }

//     if (product.variants.length === 0) {
//       return false;
//     }

//     return product.variants.some((variant) => Number(variant?.stock || 0) > 0);
//   };

//   const getProductImage = (product) => {
//     if (Array.isArray(product?.images) && product.images.length > 0) {
//       const mainImage = product.images.find(
//         (image) => Number(image?.is_main) === 1,
//       );

//       return mainImage?.path || product.images[0]?.path || "/Product2.png";
//     }

//     return "/Product2.png";
//   };

//   const getProductCategorySlug = (product) => {
//     return product?.category?.slug || "";
//   };

//   const filteredProducts = useMemo(() => {
//     let result = products.filter((product) => {
//       const title = product?.name || product?.title || "";

//       const matchSearch = title.toLowerCase().includes(search.toLowerCase());

//       const productSizes = getProductSizes(product);

//       const matchSize =
//         selectedSizes.length === 0 ||
//         selectedSizes.some((size) => productSizes.includes(size));

//       const productPrice = getProductPrice(product);

//       const matchPrice =
//         productPrice >= Number(minPrice) && productPrice <= Number(maxPrice);

//       const available = isProductAvailable(product);

//       const matchAvailability =
//         availability === ""
//           ? true
//           : availability === "available"
//             ? available
//             : true;

//       const productBrandSlug = product?.brand?.slug || "";

//       const matchBrand =
//         selectedBrand === "" || productBrandSlug === selectedBrand;

//       const productCategorySlug = getProductCategorySlug(product);

//       let matchCategory = true;

//       if (selectedCategory !== "") {
//         const selectedMainCategory = categories.find(
//           (category) => category.slug === selectedCategory,
//         );

//         if (selectedMainCategory) {
//           const mainCategorySlug = selectedMainCategory.slug;

//           matchCategory =
//             productCategorySlug === mainCategorySlug ||
//             productCategorySlug.startsWith(`${mainCategorySlug} - `);
//         } else {
//           matchCategory = productCategorySlug === selectedCategory;
//         }
//       }

//       return (
//         matchSearch &&
//         matchSize &&
//         matchPrice &&
//         matchAvailability &&
//         matchCategory &&
//         matchBrand
//       );
//     });

//     switch (selectedSort) {
//       case "latest":
//         result = [...result].sort(
//           (a, b) => Number(b?.id || 0) - Number(a?.id || 0),
//         );
//         break;

//       case "price_asc":
//         result = [...result].sort(
//           (a, b) => getProductPrice(a) - getProductPrice(b),
//         );
//         break;

//       case "price_desc":
//         result = [...result].sort(
//           (a, b) => getProductPrice(b) - getProductPrice(a),
//         );
//         break;

//       case "popular":
//         result = [...result].sort(
//           (a, b) => Number(b?.rating || 0) - Number(a?.rating || 0),
//         );
//         break;

//       case "views":
//         break;

//       case "sales":
//         break;

//       default:
//         break;
//     }

//     return result;
//   }, [
//     products,
//     categories,
//     search,
//     selectedSizes,
//     minPrice,
//     maxPrice,
//     availability,
//     selectedCategory,
//     selectedBrand,
//     selectedSort,
//   ]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
//   );

//   const paginatedProducts = useMemo(() => {
//     const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
//     const endIndex = startIndex + PRODUCTS_PER_PAGE;

//     return filteredProducts.slice(startIndex, endIndex);
//   }, [filteredProducts, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [
//     search,
//     selectedSizes,
//     minPrice,
//     maxPrice,
//     availability,
//     selectedCategory,
//     selectedBrand,
//     selectedSort,
//   ]);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const toggleSize = (size) => {
//     setSelectedSizes((prev) =>
//       prev.includes(size)
//         ? prev.filter((item) => item !== size)
//         : [...prev, size],
//     );
//   };

//   const handleCategoryChange = (slug) => {
//     setSelectedCategory(slug);
//   };

//   const handleBrandChange = (slug) => {
//     setSelectedBrand(slug);
//   };

//   const clearAllFilters = () => {
//     setSearch("");
//     setSelectedSizes([]);
//     setMinPrice(0);
//     setMaxPrice(5000000);
//     setAvailability("");
//     setSelectedCategory("");
//     setSelectedBrand("");
//     setSelectedSort("");
//     setCurrentPage(1);
//   };

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) {
//       return;
//     }

//     setCurrentPage(page);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const activeFilterCount =
//     (selectedCategory ? 1 : 0) +
//     (selectedBrand ? 1 : 0) +
//     selectedSizes.length +
//     (Number(minPrice) > 0 ? 1 : 0) +
//     (Number(maxPrice) < 5000000 ? 1 : 0) +
//     (availability === "available" ? 1 : 0);

//   const FilterSection = ({ id, icon: Icon, title, children }) => {
//     const isOpen = openSections[id];

//     return (
//       <div className="border-b border-gray-100 last:border-b-0">
//         <button
//           type="button"
//           onClick={() => toggleSection(id)}
//           className="flex w-full items-center justify-between py-5 text-right"
//         >
//           <div className="flex items-center gap-3">
//             <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6f5f2] text-gray-700">
//               <Icon size={17} strokeWidth={1.8} />
//             </span>

//             <span className="text-[13px] font-semibold text-gray-900">
//               {title}
//             </span>
//           </div>

//           <ChevronDown
//             size={17}
//             strokeWidth={1.7}
//             className={`text-gray-400 transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         <div
//           className={`grid overflow-hidden transition-all duration-300 ${
//             isOpen
//               ? "grid-rows-[1fr] pb-5 opacity-100"
//               : "grid-rows-[0fr] pb-0 opacity-0"
//           }`}
//         >
//           <div className="min-h-0 overflow-hidden">{children}</div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div
//         dir="rtl"
//         className="flex min-h-screen items-center justify-center bg-[#faf9f6]"
//       >
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

//           <p className="text-sm text-gray-500">در حال دریافت محصولات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         dir="rtl"
//         className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5"
//       >
//         <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
//           <p className="text-red-500">{error}</p>

//           <button
//             type="button"
//             onClick={() => window.location.reload()}
//             className="mt-5 rounded-full bg-black px-6 py-3 text-sm text-white"
//           >
//             تلاش مجدد
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div dir="rtl" className="mx-auto max-w-7xl px-4 py-10">
//       <div className="mb-8 flex flex-wrap gap-4">
//         <div className="flex w-full items-center rounded-xl bg-gray-100 px-3 py-3 md:w-1/2">
//           <Search size={18} className="text-gray-400" />

//           <input
//             type="text"
//             placeholder="جستجوی محصول..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-transparent px-2 text-right text-sm outline-none placeholder:text-gray-400"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
//         <div>
//           <div className="mb-5 flex items-center justify-between gap-4">
//             <p className="text-sm text-gray-400">
//               {filteredProducts.length.toLocaleString("fa-IR")} محصول
//             </p>

//             {sortOptions.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-500">مرتب‌سازی:</span>

//                 <select
//                   value={selectedSort}
//                   onChange={(e) => setSelectedSort(e.target.value)}
//                   className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-gray-400"
//                 >
//                   <option value="">انتخاب کنید</option>

//                   {sortOptions.map((option) => (
//                     <option key={option.key} value={option.key}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 items-start gap-6 md:grid-cols-3">
//             {paginatedProducts.map((item) => {
//               const title = item?.name || item?.title || "محصول";

//               const productPrice = getProductPrice(item);

//               const image = getProductImage(item);

//               return (
//                 <div
//                   key={item.id}
//                   className="group w-full overflow-hidden rounded-2xl p-3 transition hover:shadow-md"
//                 >
//                   <div className="relative overflow-hidden rounded-2xl bg-[#f5f4f1]">
//                     <img
//                       src={image}
//                       alt={title}
//                       className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
//                     />
//                   </div>

//                   <div className="mt-4 flex flex-col items-center text-center">
//                     <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-800">
//                       {title}
//                     </h3>

//                     <span className="mt-2 text-sm font-semibold text-gray-900">
//                       {productPrice.toLocaleString("fa-IR")} تومان
//                     </span>

//                     <NavLink to={`/ProductDetail/${item.id}`} className="mt-4">
//                       <span
//                         className="
//                           inline-flex
//                           rounded-full
//                           border
//                           border-gray-900
//                           bg-transparent
//                           px-5
//                           py-2
//                           text-xs
//                           font-medium
//                           tracking-wide
//                           text-gray-900
//                           transition-all
//                           duration-300
//                           hover:bg-gray-900
//                           hover:text-white
//                         "
//                       >
//                         مشاهده جزئیات
//                       </span>
//                     </NavLink>
//                   </div>
//                 </div>
//               );
//             })}

//             {paginatedProducts.length === 0 && (
//               <div className="col-span-full py-16 text-center">
//                 <p className="text-sm text-gray-400">
//                   محصولی در این صفحه موجود نیست.
//                 </p>

//                 {filteredProducts.length === 0 && (
//                   <button
//                     type="button"
//                     onClick={clearAllFilters}
//                     className="mt-4 text-xs font-medium text-gray-800 underline underline-offset-4 transition hover:text-black"
//                   >
//                     پاک کردن فیلترها
//                   </button>
//                 )}

//                 {filteredProducts.length > 0 && currentPage > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => goToPage(1)}
//                     className="mt-4 text-xs font-medium text-gray-800 underline underline-offset-4 transition hover:text-black"
//                   >
//                     بازگشت به صفحه اول
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div
//               dir="rtl"
//               className="mt-10 flex flex-wrap items-center justify-center gap-2"
//             >
//               <button
//                 type="button"
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-700 transition hover:border-gray-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 قبلی
//               </button>

//               {Array.from({ length: totalPages }, (_, index) => {
//                 const page = index + 1;

//                 return (
//                   <button
//                     key={page}
//                     type="button"
//                     onClick={() => goToPage(page)}
//                     className={`min-w-9 rounded-lg border px-3 py-2 text-xs transition ${
//                       currentPage === page
//                         ? "border-black bg-black text-white"
//                         : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black"
//                     }`}
//                   >
//                     {page.toLocaleString("fa-IR")}
//                   </button>
//                 );
//               })}

//               <button
//                 type="button"
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-700 transition hover:border-gray-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 بعدی
//               </button>
//             </div>
//           )}

//           {filteredProducts.length > 0 && (
//             <div className="mt-4 text-center text-xs text-gray-400">
//               صفحه {currentPage.toLocaleString("fa-IR")} از{" "}
//               {totalPages.toLocaleString("fa-IR")}
//             </div>
//           )}
//         </div>

//         <aside className="sticky top-20 h-max">
//           <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
//             <div className="border-b border-gray-100 px-5 py-5">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
//                     <SlidersHorizontal size={18} strokeWidth={1.8} />
//                   </div>

//                   <div>
//                     <h2 className="text-sm font-bold text-gray-900">
//                       فیلتر محصولات
//                     </h2>

//                     <p className="mt-1 text-[11px] text-gray-400">
//                       انتخاب دقیق‌تر برای استایل تو
//                     </p>
//                   </div>
//                 </div>

//                 {activeFilterCount > 0 && (
//                   <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-black px-2 text-[11px] font-semibold text-white">
//                     {activeFilterCount.toLocaleString("fa-IR")}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={clearAllFilters}
//                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-2.5 text-xs font-medium text-gray-600 transition hover:border-black hover:bg-white hover:text-black"
//               >
//                 <RotateCcw size={14} strokeWidth={1.8} />
//                 پاک کردن همه فیلترها
//               </button>
//             </div>

//             <div className="px-5">
//               <FilterSection
//                 id="category"
//                 icon={SlidersHorizontal}
//                 title="دسته‌بندی"
//               >
//                 <div className="flex flex-col gap-2">
//                   <button
//                     type="button"
//                     onClick={() => handleCategoryChange("")}
//                     className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
//                       selectedCategory === ""
//                         ? "bg-black text-white"
//                         : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
//                     }`}
//                   >
//                     <span className="text-xs font-medium">همه محصولات</span>

//                     {selectedCategory === "" && (
//                       <Check size={14} strokeWidth={2} />
//                     )}
//                   </button>

//                   {categories.map((category) => (
//                     <div key={category.id}>
//                       <button
//                         type="button"
//                         onClick={() => handleCategoryChange(category.slug)}
//                         className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
//                           selectedCategory === category.slug
//                             ? "bg-[#f1f0ed] font-semibold text-black"
//                             : "text-gray-700 hover:bg-[#f8f7f4]"
//                         }`}
//                       >
//                         <span className="text-xs">{category.name}</span>

//                         {selectedCategory === category.slug && (
//                           <span className="h-1.5 w-1.5 rounded-full bg-black" />
//                         )}
//                       </button>

//                       {Array.isArray(category.children) &&
//                         category.children.length > 0 && (
//                           <div className="mr-3 mt-1 flex flex-col gap-1 border-r border-gray-200 pr-3">
//                             {category.children.map((child) => (
//                               <button
//                                 key={child.id}
//                                 type="button"
//                                 onClick={() => handleCategoryChange(child.slug)}
//                                 className={`flex items-center justify-between rounded-lg px-3 py-2 text-right transition ${
//                                   selectedCategory === child.slug
//                                     ? "bg-gray-100 font-semibold text-black"
//                                     : "text-gray-500 hover:bg-gray-50 hover:text-black"
//                                 }`}
//                               >
//                                 <span className="text-[11px]">
//                                   {child.name}
//                                 </span>

//                                 {selectedCategory === child.slug && (
//                                   <span className="h-1.5 w-1.5 rounded-full bg-black" />
//                                 )}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               </FilterSection>

//               <FilterSection id="brand" icon={Tag} title="برند">
//                 <div className="flex flex-col gap-1.5">
//                   <button
//                     type="button"
//                     onClick={() => handleBrandChange("")}
//                     className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
//                       selectedBrand === ""
//                         ? "bg-black text-white"
//                         : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
//                     }`}
//                   >
//                     <span className="text-xs font-medium">همه برندها</span>

//                     {selectedBrand === "" && (
//                       <Check size={14} strokeWidth={2} />
//                     )}
//                   </button>

//                   {brands.map((brand) => (
//                     <button
//                       key={brand.id}
//                       type="button"
//                       onClick={() => handleBrandChange(brand.slug)}
//                       className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
//                         selectedBrand === brand.slug
//                           ? "bg-[#f1f0ed] font-semibold text-black"
//                           : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
//                       }`}
//                     >
//                       <span className="text-xs">{brand.name}</span>

//                       {selectedBrand === brand.slug && (
//                         <span className="h-1.5 w-1.5 rounded-full bg-black" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </FilterSection>

//               <FilterSection id="size" icon={Ruler} title="سایز">
//                 <div className="grid grid-cols-3 gap-2">
//                   {ALL_SIZES.map((size) => {
//                     const isSelected = selectedSizes.includes(size);

//                     return (
//                       <button
//                         key={size}
//                         type="button"
//                         onClick={() => toggleSize(size)}
//                         aria-pressed={isSelected}
//                         className={`flex h-10 items-center justify-center rounded-xl border text-xs font-medium transition ${
//                           isSelected
//                             ? "border-black bg-black text-white shadow-sm"
//                             : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </FilterSection>

//               <FilterSection
//                 id="price"
//                 icon={CircleDollarSign}
//                 title="محدوده قیمت"
//               >
//                 <div className="grid grid-cols-2 gap-2">
//                   <div>
//                     <label className="mb-2 block text-[10px] text-gray-400">
//                       حداقل قیمت
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         min="0"
//                         value={minPrice}
//                         onChange={(e) =>
//                           setMinPrice(Number(e.target.value) || 0)
//                         }
//                         placeholder="از"
//                         className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-3 py-2.5 text-xs text-gray-800 outline-none transition focus:border-black focus:bg-white"
//                       />

//                       <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
//                         تومان
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-[10px] text-gray-400">
//                       حداکثر قیمت
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         min="0"
//                         value={maxPrice}
//                         onChange={(e) =>
//                           setMaxPrice(Number(e.target.value) || 0)
//                         }
//                         placeholder="تا"
//                         className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-3 py-2.5 text-xs text-gray-800 outline-none transition focus:border-black focus:bg-white"
//                       />

//                       <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
//                         تومان
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
//                   <span>{Number(minPrice).toLocaleString("fa-IR")}</span>

//                   <div className="h-px flex-1 mx-3 bg-gray-200" />

//                   <span>{Number(maxPrice).toLocaleString("fa-IR")}</span>
//                 </div>
//               </FilterSection>

//               <FilterSection
//                 id="availability"
//                 icon={PackageCheck}
//                 title="موجودی"
//               >
//                 <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-[#faf9f6] px-4 py-3.5 transition hover:border-gray-300">
//                   <div>
//                     <p className="text-xs font-medium text-gray-800">
//                       فقط محصولات موجود
//                     </p>

//                     <p className="mt-1 text-[10px] text-gray-400">
//                       نمایش کالاهای قابل سفارش
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     role="switch"
//                     aria-checked={availability === "available"}
//                     onClick={() =>
//                       setAvailability(
//                         availability === "available" ? "" : "available",
//                       )
//                     }
//                     className={`relative h-6 w-11 shrink-0 rounded-full transition ${
//                       availability === "available" ? "bg-black" : "bg-gray-200"
//                     }`}
//                   >
//                     <span
//                       className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
//                         availability === "available" ? "right-1" : "right-6"
//                       }`}
//                     />
//                   </button>
//                 </label>
//               </FilterSection>
//             </div>

//             <div className="border-t border-gray-100 px-5 py-5">
//               <div className="flex items-center justify-between rounded-2xl bg-[#faf9f6] px-4 py-3">
//                 <span className="text-[11px] text-gray-400">نتیجه فیلترها</span>

//                 <span className="text-xs font-semibold text-gray-900">
//                   {filteredProducts.length.toLocaleString("fa-IR")} محصول
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5">
//             <BlogShop />
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Tag,
  Ruler,
  CircleDollarSign,
  PackageCheck,
  ChevronDown,
  RotateCcw,
  Check,
} from "lucide-react";

import { NavLink, useSearchParams } from "react-router-dom";
import { getBrands } from "../../../Core/Services/api/brandApi";
import { getCategories } from "../../../Core/Services/api/categoryApi";
import { getProducts } from "../../../Core/Services/api/productApi";
import BlogShop from "../../../Components/Store/BlogShop";
import { getSortOptions } from "../../../Core/Services/api/sortApi";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

const PRODUCTS_PER_PAGE = 12;

export default function ShopPage() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOptions, setSortOptions] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [availability, setAvailability] = useState("");

  // ✅ دریافت دسته‌بندی از URL
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "",
  );

  const [selectedBrand, setSelectedBrand] = useState("");

  // ✅ دریافت مرتب‌سازی از URL
  const [selectedSort, setSelectedSort] = useState(
    () => searchParams.get("sort") || "",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    size: true,
    price: true,
    availability: true,
  });

  // =========================================================
  // هماهنگ کردن فیلترهای Store با URL
  // =========================================================

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    const sortFromUrl = searchParams.get("sort") || "";

    setSelectedCategory(categoryFromUrl);
    setSelectedSort(sortFromUrl);
    setCurrentPage(1);
  }, [searchParams]);

  // =========================================================
  // دریافت اطلاعات Store از API
  // =========================================================

  useEffect(() => {
    const loadStoreData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsData, categoriesData, brandsData, sortOptionsData] =
          await Promise.all([
            getProducts(),
            getCategories(),
            getBrands(),
            getSortOptions(),
          ]);

        console.log(
          "STORE SORT OPTIONS DATA:",
          JSON.stringify(sortOptionsData, null, 2),
        );

        if (Array.isArray(sortOptionsData)) {
          setSortOptions(sortOptionsData);
        } else {
          setSortOptions([]);
        }

        console.log(
          "STORE PRODUCTS DATA:",
          JSON.stringify(productsData, null, 2),
        );

        console.log(
          "STORE CATEGORIES DATA:",
          JSON.stringify(categoriesData, null, 2),
        );

        console.log(
          "STORE BRANDS DATA:",
          JSON.stringify(brandsData, null, 2),
        );

        if (!Array.isArray(productsData)) {
          setProducts([]);
          setError("لیست محصولات دریافت نشد.");
          return;
        }

        setProducts(productsData);

        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          setCategories([]);
        }

        if (Array.isArray(brandsData)) {
          setBrands(brandsData);
        } else {
          setBrands([]);
        }
      } catch (err) {
        console.error("STORE DATA ERROR:", err);

        setError(
          err?.message ||
            "دریافت اطلاعات فروشگاه با خطا مواجه شد.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, []);

  // =========================================================
  // Product Helpers
  // =========================================================

  const getProductPrice = (product) => {
    if (
      Array.isArray(product?.variants) &&
      product.variants.length > 0
    ) {
      const availableVariant = product.variants.find(
        (variant) => Number(variant?.stock || 0) > 0,
      );

      if (availableVariant?.price != null) {
        return (
          Number(
            String(availableVariant.price).replace(/,/g, ""),
          ) || 0
        );
      }

      if (product.variants[0]?.price != null) {
        return (
          Number(
            String(product.variants[0].price).replace(/,/g, ""),
          ) || 0
        );
      }
    }

    return (
      Number(
        String(product?.price ?? "0").replace(/,/g, ""),
      ) || 0
    );
  };

  const getProductSizes = (product) => {
    if (!Array.isArray(product?.variants)) {
      return [];
    }

    return [
      ...new Set(
        product.variants
          .map((variant) => variant?.size)
          .filter(Boolean),
      ),
    ];
  };

  const isProductAvailable = (product) => {
    if (!Array.isArray(product?.variants)) {
      return true;
    }

    if (product.variants.length === 0) {
      return false;
    }

    return product.variants.some(
      (variant) => Number(variant?.stock || 0) > 0,
    );
  };

  const getProductImage = (product) => {
    if (
      Array.isArray(product?.images) &&
      product.images.length > 0
    ) {
      const mainImage = product.images.find(
        (image) => Number(image?.is_main) === 1,
      );

      return (
        mainImage?.path ||
        product.images[0]?.path ||
        "/Product2.png"
      );
    }

    return "/Product2.png";
  };

  const getProductCategorySlug = (product) => {
    return product?.category?.slug || "";
  };

  // =========================================================
  // Filtering + Sorting
  // =========================================================

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const title =
        product?.name ||
        product?.title ||
        "";

      const matchSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

      const productSizes = getProductSizes(product);

      const matchSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) =>
          productSizes.includes(size),
        );

      const productPrice = getProductPrice(product);

      const matchPrice =
        productPrice >= Number(minPrice) &&
        productPrice <= Number(maxPrice);

      const available =
        isProductAvailable(product);

      const matchAvailability =
        availability === ""
          ? true
          : availability === "available"
            ? available
            : true;

      const productBrandSlug =
        product?.brand?.slug || "";

      const matchBrand =
        selectedBrand === "" ||
        productBrandSlug === selectedBrand;

      const productCategorySlug =
        getProductCategorySlug(product);

      let matchCategory = true;

      if (selectedCategory !== "") {
        const selectedMainCategory =
          categories.find(
            (category) =>
              category.slug === selectedCategory,
          );

        if (selectedMainCategory) {
          const mainCategorySlug =
            selectedMainCategory.slug;

          matchCategory =
            productCategorySlug ===
              mainCategorySlug ||
            productCategorySlug.startsWith(
              `${mainCategorySlug} - `,
            );
        } else {
          matchCategory =
            productCategorySlug ===
            selectedCategory;
        }
      }

      return (
        matchSearch &&
        matchSize &&
        matchPrice &&
        matchAvailability &&
        matchCategory &&
        matchBrand
      );
    });

    switch (selectedSort) {
      case "latest":
        result = [...result].sort(
          (a, b) =>
            Number(b?.id || 0) -
            Number(a?.id || 0),
        );
        break;

      case "price_asc":
        result = [...result].sort(
          (a, b) =>
            getProductPrice(a) -
            getProductPrice(b),
        );
        break;

      case "price_desc":
        result = [...result].sort(
          (a, b) =>
            getProductPrice(b) -
            getProductPrice(a),
        );
        break;

      case "popular":
        result = [...result].sort(
          (a, b) =>
            Number(b?.rating || 0) -
            Number(a?.rating || 0),
        );
        break;

      case "views":
        break;

      case "sales":
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    categories,
    search,
    selectedSizes,
    minPrice,
    maxPrice,
    availability,
    selectedCategory,
    selectedBrand,
    selectedSort,
  ]);

  // =========================================================
  // Pagination
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        PRODUCTS_PER_PAGE,
    ),
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      PRODUCTS_PER_PAGE;

    const endIndex =
      startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      endIndex,
    );
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedSizes,
    minPrice,
    maxPrice,
    availability,
    selectedCategory,
    selectedBrand,
    selectedSort,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================================================
  // Handlers
  // =========================================================

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter(
            (item) => item !== size,
          )
        : [...prev, size],
    );
  };

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
  };

  const handleBrandChange = (slug) => {
    setSelectedBrand(slug);
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(5000000);
    setAvailability("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedSort("");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    selectedSizes.length +
    (Number(minPrice) > 0 ? 1 : 0) +
    (Number(maxPrice) < 5000000 ? 1 : 0) +
    (availability === "available" ? 1 : 0);

  // =========================================================
  // Filter Section
  // =========================================================

  const FilterSection = ({
    id,
    icon: Icon,
    title,
    children,
  }) => {
    const isOpen =
      openSections[id];

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          type="button"
          onClick={() =>
            toggleSection(id)
          }
          className="flex w-full items-center justify-between py-5 text-right"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6f5f2] text-gray-700">
              <Icon
                size={17}
                strokeWidth={1.8}
              />
            </span>

            <span className="text-[13px] font-semibold text-gray-900">
              {title}
            </span>
          </div>

          <ChevronDown
            size={17}
            strokeWidth={1.7}
            className={`text-gray-400 transition-transform duration-300 ${
              isOpen
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        <div
          className={`grid overflow-hidden transition-all duration-300 ${
            isOpen
              ? "grid-rows-[1fr] pb-5 opacity-100"
              : "grid-rows-[0fr] pb-0 opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#faf9f6]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm text-gray-500">
            در حال دریافت محصولات...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (error) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5"
      >
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // Render
  // =========================================================

  return (
    <div
      dir="rtl"
      className="mx-auto max-w-7xl px-4 py-10"
    >
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex w-full items-center rounded-xl bg-gray-100 px-3 py-3 md:w-1/2">
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="جستجوی محصول..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-transparent px-2 text-right text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              {filteredProducts.length.toLocaleString(
                "fa-IR",
              )}{" "}
              محصول
            </p>

            {sortOptions.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  مرتب‌سازی:
                </span>

                <select
                  value={selectedSort}
                  onChange={(e) =>
                    setSelectedSort(
                      e.target.value,
                    )
                  }
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-gray-400"
                >
                  <option value="">
                    انتخاب کنید
                  </option>

                  {sortOptions.map(
                    (option) => (
                      <option
                        key={option.key}
                        value={option.key}
                      >
                        {option.label}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 items-start gap-6 md:grid-cols-3">
            {paginatedProducts.map(
              (item) => {
                const title =
                  item?.name ||
                  item?.title ||
                  "محصول";

                const productPrice =
                  getProductPrice(item);

                const image =
                  getProductImage(item);

                return (
                  <div
                    key={item.id}
                    className="group w-full overflow-hidden rounded-2xl p-3 transition hover:shadow-md"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-[#f5f4f1]">
                      <img
                        src={image}
                        alt={title}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 flex flex-col items-center text-center">
                      <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-800">
                        {title}
                      </h3>

                      <span className="mt-2 text-sm font-semibold text-gray-900">
                        {productPrice.toLocaleString(
                          "fa-IR",
                        )}{" "}
                        تومان
                      </span>

                      <NavLink
                        to={`/ProductDetail/${item.id}`}
                        className="mt-4"
                      >
                        <span
                          className="
                            inline-flex
                            rounded-full
                            border
                            border-gray-900
                            bg-transparent
                            px-5
                            py-2
                            text-xs
                            font-medium
                            tracking-wide
                            text-gray-900
                            transition-all
                            duration-300
                            hover:bg-gray-900
                            hover:text-white
                          "
                        >
                          مشاهده جزئیات
                        </span>
                      </NavLink>
                    </div>
                  </div>
                );
              },
            )}

            {paginatedProducts.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="text-sm text-gray-400">
                  محصولی در این صفحه موجود نیست.
                </p>

                {filteredProducts.length ===
                  0 && (
                  <button
                    type="button"
                    onClick={
                      clearAllFilters
                    }
                    className="mt-4 text-xs font-medium text-gray-800 underline underline-offset-4 transition hover:text-black"
                  >
                    پاک کردن فیلترها
                  </button>
                )}

                {filteredProducts.length >
                  0 &&
                  currentPage > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(1)
                      }
                      className="mt-4 text-xs font-medium text-gray-800 underline underline-offset-4 transition hover:text-black"
                    >
                      بازگشت به صفحه اول
                    </button>
                  )}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div
              dir="rtl"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage - 1,
                  )
                }
                disabled={
                  currentPage === 1
                }
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-700 transition hover:border-gray-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                قبلی
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => {
                  const page =
                    index + 1;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        goToPage(page)
                      }
                      className={`min-w-9 rounded-lg border px-3 py-2 text-xs transition ${
                        currentPage ===
                        page
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black"
                      }`}
                    >
                      {page.toLocaleString(
                        "fa-IR",
                      )}
                    </button>
                  );
                },
              )}

              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage + 1,
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-700 transition hover:border-gray-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-4 text-center text-xs text-gray-400">
              صفحه{" "}
              {currentPage.toLocaleString(
                "fa-IR",
              )}{" "}
              از{" "}
              {totalPages.toLocaleString(
                "fa-IR",
              )}
            </div>
          )}
        </div>

        <aside className="sticky top-20 h-max">
          <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="border-b border-gray-100 px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                    <SlidersHorizontal
                      size={18}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-gray-900">
                      فیلتر محصولات
                    </h2>

                    <p className="mt-1 text-[11px] text-gray-400">
                      انتخاب دقیق‌تر برای استایل تو
                    </p>
                  </div>
                </div>

                {activeFilterCount >
                  0 && (
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-black px-2 text-[11px] font-semibold text-white">
                    {activeFilterCount.toLocaleString(
                      "fa-IR",
                    )}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={
                  clearAllFilters
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-2.5 text-xs font-medium text-gray-600 transition hover:border-black hover:bg-white hover:text-black"
              >
                <RotateCcw
                  size={14}
                  strokeWidth={1.8}
                />
                پاک کردن همه فیلترها
              </button>
            </div>

            <div className="px-5">
              <FilterSection
                id="category"
                icon={SlidersHorizontal}
                title="دسته‌بندی"
              >
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        "",
                      )
                    }
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
                      selectedCategory ===
                      ""
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
                    }`}
                  >
                    <span className="text-xs font-medium">
                      همه محصولات
                    </span>

                    {selectedCategory ===
                      "" && (
                      <Check
                        size={14}
                        strokeWidth={2}
                      />
                    )}
                  </button>

                  {categories.map(
                    (category) => (
                      <div
                        key={category.id}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleCategoryChange(
                              category.slug,
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
                            selectedCategory ===
                            category.slug
                              ? "bg-[#f1f0ed] font-semibold text-black"
                              : "text-gray-700 hover:bg-[#f8f7f4]"
                          }`}
                        >
                          <span className="text-xs">
                            {
                              category.name
                            }
                          </span>

                          {selectedCategory ===
                            category.slug && (
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                          )}
                        </button>

                        {Array.isArray(
                          category.children,
                        ) &&
                          category
                            .children
                            .length >
                            0 && (
                            <div className="mr-3 mt-1 flex flex-col gap-1 border-r border-gray-200 pr-3">
                              {category.children.map(
                                (
                                  child,
                                ) => (
                                  <button
                                    key={
                                      child.id
                                    }
                                    type="button"
                                    onClick={() =>
                                      handleCategoryChange(
                                        child.slug,
                                      )
                                    }
                                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-right transition ${
                                      selectedCategory ===
                                      child.slug
                                        ? "bg-gray-100 font-semibold text-black"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                    }`}
                                  >
                                    <span className="text-[11px]">
                                      {
                                        child.name
                                      }
                                    </span>

                                    {selectedCategory ===
                                      child.slug && (
                                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                                    )}
                                  </button>
                                ),
                              )}
                            </div>
                          )}
                      </div>
                    ),
                  )}
                </div>
              </FilterSection>

              <FilterSection
                id="brand"
                icon={Tag}
                title="برند"
              >
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleBrandChange(
                        "",
                      )
                    }
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
                      selectedBrand ===
                      ""
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
                    }`}
                  >
                    <span className="text-xs font-medium">
                      همه برندها
                    </span>

                    {selectedBrand ===
                      "" && (
                      <Check
                        size={14}
                        strokeWidth={2}
                      />
                    )}
                  </button>

                  {brands.map(
                    (brand) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() =>
                          handleBrandChange(
                            brand.slug,
                          )
                        }
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-right transition ${
                          selectedBrand ===
                          brand.slug
                            ? "bg-[#f1f0ed] font-semibold text-black"
                            : "text-gray-600 hover:bg-[#f8f7f4] hover:text-black"
                        }`}
                      >
                        <span className="text-xs">
                          {brand.name}
                        </span>

                        {selectedBrand ===
                          brand.slug && (
                          <span className="h-1.5 w-1.5 rounded-full bg-black" />
                        )}
                      </button>
                    ),
                  )}
                </div>
              </FilterSection>

              <FilterSection
                id="size"
                icon={Ruler}
                title="سایز"
              >
                <div className="grid grid-cols-3 gap-2">
                  {ALL_SIZES.map(
                    (size) => {
                      const isSelected =
                        selectedSizes.includes(
                          size,
                        );

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            toggleSize(
                              size,
                            )
                          }
                          aria-pressed={
                            isSelected
                          }
                          className={`flex h-10 items-center justify-center rounded-xl border text-xs font-medium transition ${
                            isSelected
                              ? "border-black bg-black text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-black"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    },
                  )}
                </div>
              </FilterSection>

              <FilterSection
                id="price"
                icon={CircleDollarSign}
                title="محدوده قیمت"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-2 block text-[10px] text-gray-400">
                      حداقل قیمت
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(
                            Number(
                              e.target
                                .value,
                            ) || 0,
                          )
                        }
                        placeholder="از"
                        className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-3 py-2.5 text-xs text-gray-800 outline-none transition focus:border-black focus:bg-white"
                      />

                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
                        تومان
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] text-gray-400">
                      حداکثر قیمت
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(
                            Number(
                              e.target
                                .value,
                            ) || 0,
                          )
                        }
                        placeholder="تا"
                        className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-3 py-2.5 text-xs text-gray-800 outline-none transition focus:border-black focus:bg-white"
                      />

                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
                  <span>
                    {Number(
                      minPrice,
                    ).toLocaleString(
                      "fa-IR",
                    )}
                  </span>

                  <div className="mx-3 h-px flex-1 bg-gray-200" />

                  <span>
                    {Number(
                      maxPrice,
                    ).toLocaleString(
                      "fa-IR",
                    )}
                  </span>
                </div>
              </FilterSection>

              <FilterSection
                id="availability"
                icon={PackageCheck}
                title="موجودی"
              >
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-[#faf9f6] px-4 py-3.5 transition hover:border-gray-300">
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      فقط محصولات موجود
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      نمایش کالاهای قابل سفارش
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={
                      availability ===
                      "available"
                    }
                    onClick={() =>
                      setAvailability(
                        availability ===
                          "available"
                          ? ""
                          : "available",
                      )
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      availability ===
                      "available"
                        ? "bg-black"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                        availability ===
                        "available"
                          ? "right-1"
                          : "right-6"
                      }`}
                    />
                  </button>
                </label>
              </FilterSection>
            </div>

            <div className="border-t border-gray-100 px-5 py-5">
              <div className="flex items-center justify-between rounded-2xl bg-[#faf9f6] px-4 py-3">
                <span className="text-[11px] text-gray-400">
                  نتیجه فیلترها
                </span>

                <span className="text-xs font-semibold text-gray-900">
                  {filteredProducts.length.toLocaleString(
                    "fa-IR",
                  )}{" "}
                  محصول
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <BlogShop />
          </div>
        </aside>
      </div>
    </div>
  );
}