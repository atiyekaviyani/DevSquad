import React, { useEffect, useState } from "react";
import ListBlog from "../../Blog/ListBlog";
import SaidBarBlog from "../../Blog/SaidBarBlog";
/* ---------- Skeleton Loader ---------- */
const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex flex-row-reverse items-center gap-4 p-3 bg-white border rounded-xl"
        >
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);

  // شبیه‌سازی لود دیتا
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="w-[80%] mx-auto flex flex-col lg:flex-row gap-6 py-10">
      <SaidBarBlog />

      <div className="w-full min-h-[300px] order-1 lg:order-2">
        <ListBlog />
      </div>
    </div>
  );
};

export default Index;
