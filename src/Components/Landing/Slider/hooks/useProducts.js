import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!res.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const data = await res.json();

        setProducts(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

  }, []);

  return {
    products,
    loading,
    error
  };
}