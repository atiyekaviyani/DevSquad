import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { getBrands } from "../../../Core/Services/api/brandApi";
import { getCategories } from "../../../Core/Services/api/categoryApi";
import { getProducts } from "../../../Core/Services/api/productApi";
import BlogShop from "../../../Components/Store/BlogShop";
import { getSortOptions } from "../../../Core/Services/api/sortApi";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2X"];

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

  // Price Filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const [availability, setAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
 const [selectedSort, setSelectedSort] = useState(() => {
  return searchParams.get("sort") || "";
});

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

        console.log("STORE BRANDS DATA:", JSON.stringify(brandsData, null, 2));

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

        setError(err?.message || "دریافت اطلاعات فروشگاه با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, []);

  const getProductPrice = (product) => {
    if (Array.isArray(product?.variants) && product.variants.length > 0) {
      const availableVariant = product.variants.find(
        (variant) => Number(variant?.stock || 0) > 0,
      );

      if (availableVariant?.price != null) {
        return Number(String(availableVariant.price).replace(/,/g, "")) || 0;
      }

      if (product.variants[0]?.price != null) {
        return Number(String(product.variants[0].price).replace(/,/g, "")) || 0;
      }
    }

    return Number(String(product?.price ?? "0").replace(/,/g, "")) || 0;
  };

  const getProductSizes = (product) => {
    if (!Array.isArray(product?.variants)) {
      return [];
    }

    return [
      ...new Set(
        product.variants.map((variant) => variant?.size).filter(Boolean),
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

    return product.variants.some((variant) => Number(variant?.stock || 0) > 0);
  };

  const getProductImage = (product) => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      const mainImage = product.images.find(
        (image) => Number(image?.is_main) === 1,
      );

      return mainImage?.path || product.images[0]?.path || "/Product2.png";
    }

    return "/Product2.png";
  };

  const getProductCategorySlug = (product) => {
    return product?.category?.slug || "";
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const title = product?.name || product?.title || "";

      // Search
      const matchSearch = title.toLowerCase().includes(search.toLowerCase());

      // Size
      const productSizes = getProductSizes(product);

      const matchSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => productSizes.includes(size));

      // Price
      const productPrice = getProductPrice(product);

      const matchPrice =
        productPrice >= Number(minPrice) && productPrice <= Number(maxPrice);

      const available = isProductAvailable(product);

      const matchAvailability =
        availability === ""
          ? true
          : availability === "available"
            ? available
            : true;

      const productBrandSlug = product?.brand?.slug || "";

      const matchBrand =
        selectedBrand === "" || productBrandSlug === selectedBrand;

      const productCategorySlug = getProductCategorySlug(product);

      let matchCategory = true;

      if (selectedCategory !== "") {
        const selectedMainCategory = categories.find(
          (category) => category.slug === selectedCategory,
        );

        if (selectedMainCategory) {
          const mainCategorySlug = selectedMainCategory.slug;

          matchCategory =
            productCategorySlug === mainCategorySlug ||
            productCategorySlug.startsWith(`${mainCategorySlug} - `);
        } else {
          matchCategory = productCategorySlug === selectedCategory;
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
        // API فیلد تاریخ ایجاد محصول ندارد.
        // فعلاً id بالاتر را جدیدتر در نظر می‌گیریم.
        result = [...result].sort(
          (a, b) => Number(b?.id || 0) - Number(a?.id || 0),
        );
        break;

      case "price_asc":
        result = [...result].sort(
          (a, b) => getProductPrice(a) - getProductPrice(b),
        );
        break;

      case "price_desc":
        result = [...result].sort(
          (a, b) => getProductPrice(b) - getProductPrice(a),
        );
        break;

      case "popular":
        // API فیلد popularity ندارد.
        // فعلاً rating را معیار قرار می‌دهیم.
        result = [...result].sort(
          (a, b) => Number(b?.rating || 0) - Number(a?.rating || 0),
        );
        break;

      case "views":
        // API فعلاً views را برنمی‌گرداند.
        break;

      case "sales":
        // API فعلاً sales را برنمی‌گرداند.
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

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
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
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#faf9f6]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm text-gray-500">در حال دریافت محصولات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5"
      >
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mx-auto max-w-7xl px-4 py-10">
      {/* Search */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex w-full items-center rounded-xl bg-gray-100 px-3 py-3 md:w-1/2">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="جستجوی محصول..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-2 text-right text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Products */}
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              {filteredProducts.length.toLocaleString("fa-IR")} محصول
            </p>

            {sortOptions.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">مرتب‌سازی:</span>

                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-gray-400"
                >
                  <option value="">انتخاب کنید</option>

                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {filteredProducts.map((item) => {
              const title = item?.name || item?.title || "محصول";

              const productPrice = getProductPrice(item);

              const image = getProductImage(item);

              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl p-3 transition hover:shadow-md"
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
                      {productPrice.toLocaleString("fa-IR")} تومان
                    </span>

                    <NavLink to={`/ProductDetail/${item.id}`} className="mt-4">
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
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-400">
                محصولی با این مشخصات یافت نشد.
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <aside className="sticky top-20 h-max max-w-[300px] space-y-8 border-l border-gray-200 pr-6 text-right text-sm">
          {/* Clear Filters */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-5">
            <h2 className="text-sm font-semibold text-gray-900">فیلترها</h2>

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-gray-500 transition hover:text-black"
            >
              پاک کردن همه
            </button>
          </div>
          {/* Categories */}
          <div>
            <h3 className="mb-4 border-b border-gray-300 pb-2 font-semibold text-gray-800">
              دسته‌بندی
            </h3>

            <div className="flex flex-col gap-3">
              {/* All */}
              <button
                type="button"
                onClick={() => handleCategoryChange("")}
                className={`flex items-center justify-between border-b border-gray-100 pb-2 text-right transition ${
                  selectedCategory === ""
                    ? "font-semibold text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>همه محصولات</span>

                {selectedCategory === "" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                )}
              </button>

              {categories.map((category) => (
                <div key={category.id} className="flex flex-col gap-2">
                  {/* Main category */}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`flex items-center justify-between text-right transition ${
                      selectedCategory === category.slug
                        ? "font-semibold text-black"
                        : "font-medium text-gray-800 hover:text-black"
                    }`}
                  >
                    <span>{category.name}</span>

                    {selectedCategory === category.slug && (
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    )}
                  </button>

                  {/* Children */}
                  {Array.isArray(category.children) &&
                    category.children.length > 0 && (
                      <div className="mr-3 flex flex-col gap-2 border-r border-gray-200 pr-3">
                        {category.children.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => handleCategoryChange(child.slug)}
                            className={`flex items-center justify-between text-right text-xs transition ${
                              selectedCategory === child.slug
                                ? "font-semibold text-black"
                                : "text-gray-500 hover:text-black"
                            }`}
                          >
                            <span>{child.name}</span>

                            {selectedCategory === child.slug && (
                              <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="mb-4 border-b border-gray-300 pb-2 font-semibold text-gray-800">
              برند
            </h3>

            <div className="flex flex-col gap-3">
              {/* All Brands */}
              <button
                type="button"
                onClick={() => handleBrandChange("")}
                className={`flex items-center justify-between text-right transition ${
                  selectedBrand === ""
                    ? "font-semibold text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span>همه برندها</span>

                {selectedBrand === "" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                )}
              </button>

              {brands.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => handleBrandChange(brand.slug)}
                  className={`flex items-center justify-between text-right transition ${
                    selectedBrand === brand.slug
                      ? "font-semibold text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <span>{brand.name}</span>

                  {selectedBrand === brand.slug && (
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="mb-4 border-b border-gray-300 pb-2 font-semibold text-gray-800">
              سایز
            </h3>

            <div className="flex flex-wrap justify-end gap-3">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`rounded-md border px-4 py-1 transition ${
                    selectedSizes.includes(size)
                      ? "border-black bg-black text-white shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-pressed={selectedSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="mb-4 border-b border-gray-300 pb-2 font-semibold text-gray-800">
              محدوده قیمت
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Minimum Price */}
              <div>
                <label className="mb-2 block text-xs text-gray-500">
                  حداقل
                </label>

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  placeholder="از"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gray-500"
                />
              </div>

              {/* Maximum Price */}
              <div>
                <label className="mb-2 block text-xs text-gray-500">
                  حداکثر
                </label>

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                  placeholder="تا"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gray-500"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>از {Number(minPrice).toLocaleString("fa-IR")} تومان</span>

              <span>تا {Number(maxPrice).toLocaleString("fa-IR")} تومان</span>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="mb-2 font-semibold text-gray-800">موجودی</h3>

            <label className="flex cursor-pointer items-center justify-between text-gray-700">
              <span>موجود</span>

              <input
                type="checkbox"
                checked={availability === "available"}
                onChange={(e) =>
                  setAvailability(e.target.checked ? "available" : "")
                }
                className="h-5 w-5 rounded text-black focus:ring-0"
              />
            </label>
          </div>

          <BlogShop />
        </aside>
      </div>
    </div>
  );
}
