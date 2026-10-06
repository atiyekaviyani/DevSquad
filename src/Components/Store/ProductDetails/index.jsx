import React, { useEffect, useState, useContext } from "react";
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import apiClient from "../../../Core/Services/api/apiClient";
import { addCartItem, getCart } from "../../../Core/Services/api/cartApi";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../../../Core/Services/api/favoriteApi";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("شناسه محصول پیدا نشد.");
          return;
        }

        const response = await apiClient(`/products/${id}`, {
          method: "GET",
        });

        console.log("PRODUCT RESPONSE:", response);

        const data = response?.data;

        console.log("PRODUCT DETAIL DATA:", JSON.stringify(data, null, 2));

        if (!data) {
          setError("اطلاعات محصول پیدا نشد.");
          return;
        }

        setProduct(data);

        if (Array.isArray(data.variants) && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error("Product Details Error:", err);

        setError(err?.message || "دریافت اطلاعات محصول با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        if (!id) return;

        const response = await getFavorites();

        console.log(
          "FAVORITES FOR PRODUCT DETAIL:",
          JSON.stringify(response, null, 2),
        );

        const favorites = Array.isArray(response?.data)
          ? response.data.flat()
          : [];

        console.log("FLATTENED FAVORITES:", favorites);

        const currentFavorite = favorites.find(
          (item) => Number(item?.id) === Number(id),
        );

        if (currentFavorite) {
          setIsFavorite(true);
          setFavoriteId(currentFavorite.id);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (err) {
        console.error("Favorite Status Error:", err);
      }
    };

    loadFavoriteStatus();
  }, [id]);

  const handleFavorite = async () => {
    if (!product || favoriteLoading) {
      return;
    }

    try {
      setFavoriteLoading(true);
      setError("");
      setSuccess("");

      if (isFavorite) {
        if (!favoriteId) {
          setError("شناسه علاقه‌مندی پیدا نشد.");
          return;
        }

        console.log("DELETE FAVORITE:", favoriteId);

        await deleteFavorite(favoriteId);

        setIsFavorite(false);
        setFavoriteId(null);

        setSuccess("محصول از علاقه‌مندی‌ها حذف شد.");

        return;
      }

      console.log("ADD FAVORITE PRODUCT:", product.id);

      const response = await addFavorite(product.id);

      console.log("ADD FAVORITE RESPONSE:", JSON.stringify(response, null, 2));

      setIsFavorite(true);

      const newFavoriteId = response?.data?.id ?? null;

      setFavoriteId(newFavoriteId);

      setSuccess("محصول به علاقه‌مندی‌ها اضافه شد.");
    } catch (err) {
      console.error("Favorite Error:", err);

      setError(err?.message || "عملیات علاقه‌مندی با خطا مواجه شد.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <section dir="rtl" className="min-h-screen bg-[#faf9f6] px-5 py-28">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm text-gray-500">
            در حال دریافت اطلاعات محصول...
          </p>
        </div>
      </section>
    );
  }

  if (error && !product) {
    return (
      <section
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5"
      >
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-500">{error || "محصول پیدا نشد."}</p>

          <button
            type="button"
            onClick={() => navigate("/Store")}
            className="mt-5 rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((image) => image.path)
      : ["/Product2.png"];

  const variants = Array.isArray(product.variants) ? product.variants : [];

  const addProduct = async () => {
    if (!selectedVariant) {
      setError("لطفاً رنگ و سایز محصول را انتخاب کنید.");
      return;
    }

    const stock = Number(selectedVariant.stock || 0);

    if (stock <= 0) {
      setError("این محصول در حال حاضر موجود نیست.");
      return;
    }

    if (quantity > stock) {
      setError("تعداد انتخابی بیشتر از موجودی محصول است.");
      return;
    }

    try {
      setAddingToCart(true);
      setError("");
      setSuccess("");

      console.log("ADD CART REQUEST:", {
        variant_id: selectedVariant.id,
        quantity,
      });

      const response = await addCartItem({
        variant_id: selectedVariant.id,
        quantity,
      });

      console.log("ADD CART RESPONSE:", JSON.stringify(response, null, 2));

      const guestToken = localStorage.getItem("guestToken");

      console.log("GUEST TOKEN EXISTS:", Boolean(guestToken));

      try {
        const cartResponse = await getCart();

        console.log("CART AFTER ADD:", JSON.stringify(cartResponse, null, 2));
      } catch (cartError) {
        console.error("GET CART AFTER ADD ERROR:", cartError);
      }

      addToCart({
        id: product.id,
        title: product.name,
        image: images[activeImage],
        images,
        price: Number(selectedVariant.price ?? product.price ?? 0),
        quantity,
        size: selectedVariant.size,
        color: selectedVariant.color_name || selectedVariant.color,
        variant_id: selectedVariant.id,
      });

      setSuccess("محصول با موفقیت به سبد خرید اضافه شد.");

      setTimeout(() => {
        navigate("/Basket");
      }, 700);
    } catch (err) {
      console.error("Add To Cart Error:", err);

      setError(err?.message || "افزودن محصول به سبد خرید با خطا مواجه شد.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <section
  dir="rtl"
  className="min-h-screen bg-[#faf9f6] px-5"
>
  <div className="-mx-5">
    <img
      src="/Blog.png"
      alt="banner"
      className="h-40 w-full object-cover"
    />
  </div>

  <div className="mx-auto max-w-[1250px]">
      
        <nav
          aria-label="مسیر صفحه"
          className="mb-8 mt-12 flex items-center gap-2 text-sm"
        >
          <button
            type="button"
            onClick={() => navigate("/Store")}
            className="text-gray-400 transition hover:text-black"
          >
            فروشگاه
          </button>

          <ChevronLeft size={16} className="text-gray-300" />

          {product.category?.name && (
            <>
              <button
                type="button"
                onClick={() => navigate("/Store")}
                className="text-gray-400 transition hover:text-black"
              >
                {product.category.name}
              </button>

              <ChevronLeft size={16} className="text-gray-300" />
            </>
          )}

          <span className="max-w-[220px] truncate font-medium text-gray-700">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div className="order-2 flex gap-5 lg:order-1">
            <div className="hidden flex-col gap-4 sm:flex">
              {images.map((img, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-28 w-24 overflow-hidden rounded-2xl transition ${
                    activeImage === index
                      ? "ring-2 ring-black"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex h-[650px] flex-1 items-center justify-center overflow-hidden rounded-[40px] bg-[#f1f0ed]">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover transition duration-700"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((prev) => Math.max(prev - 1, 0))
                    }
                    className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((prev) =>
                        Math.min(prev + 1, images.length - 1),
                      )
                    }
                    className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="order-1 rounded-[40px] bg-white p-8 shadow-sm lg:order-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-3 text-xs tracking-[4px] text-gray-400">
                  NEW COLLECTION
                </p>

                <h1 className="text-3xl font-semibold">{product.name}</h1>
              </div>

              <button
                type="button"
                onClick={handleFavorite}
                disabled={favoriteLoading}
                aria-label={
                  isFavorite
                    ? "حذف از علاقه‌مندی‌ها"
                    : "افزودن به علاقه‌مندی‌ها"
                }
                className="flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Heart
                  size={25}
                  strokeWidth={1.8}
                  fill={isFavorite ? "currentColor" : "none"}
                  className={
                    isFavorite
                      ? "text-red-500"
                      : "text-gray-400 hover:text-black"
                  }
                />
              </button>
            </div>

            <div className="mt-8 space-y-3 text-sm text-gray-500">
              {product.category?.name && (
                <p>دسته بندی : {product.category.name}</p>
              )}

              {product.brand?.name && <p>برند : {product.brand.name}</p>}

              {product.code && <p>کد محصول : {product.code}</p>}

              {product.description && (
                <p className="leading-7">{product.description}</p>
              )}
            </div>

            <p className="mt-8 text-2xl font-bold">
              {Number(
                selectedVariant?.price ?? product.price ?? 0,
              ).toLocaleString("fa-IR")}{" "}
              تومان
            </p>

            {variants.length > 0 ? (
              <>
                <div className="mt-8">
                  <p className="mb-4 font-medium">انتخاب رنگ</p>

                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => {
                      const selected = selectedVariant?.id === variant.id;

                      return (
                        <button
                          type="button"
                          key={variant.id}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setQuantity(1);
                            setError("");
                          }}
                          className={`flex items-center gap-2 rounded-full border px-4 py-2 transition ${
                            selected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-black"
                          }`}
                        >
                          <span
                            className="h-5 w-5 rounded-full border"
                            style={{
                              backgroundColor: variant.color,
                            }}
                          />

                          <span>{variant.color_name || variant.color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-4 font-medium">انتخاب سایز</p>

                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant) => {
                      const selected = selectedVariant?.id === variant.id;

                      return (
                        <button
                          type="button"
                          key={`size-${variant.id}`}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setQuantity(1);
                            setError("");
                          }}
                          className={`rounded-full border px-5 py-3 transition ${
                            selected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-black"
                          }`}
                        >
                          {variant.size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedVariant && (
                  <div className="mt-5 text-sm">
                    {Number(selectedVariant.stock || 0) > 0 ? (
                      <span className="text-green-600">
                        موجودی: {selectedVariant.stock}
                      </span>
                    ) : (
                      <span className="text-red-500">ناموجود</span>
                    )}
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="h-10 w-10 rounded-full bg-gray-100 transition hover:bg-gray-200"
                  >
                    -
                  </button>

                  <span className="w-8 text-center">{quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) => {
                        const currentStock = Number(
                          selectedVariant?.stock || 0,
                        );

                        if (prev < currentStock) {
                          return prev + 1;
                        }

                        return prev;
                      })
                    }
                    className="h-10 w-10 rounded-full bg-gray-100 transition hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-8 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
                برای این محصول تنوعی ثبت نشده است.
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-xl bg-green-50 p-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <button
              type="button"
              onClick={addProduct}
              disabled={
                addingToCart ||
                !selectedVariant ||
                Number(selectedVariant?.stock || 0) <= 0
              }
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={20} />

              {addingToCart ? "در حال افزودن..." : "افزودن به سبد خرید"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
