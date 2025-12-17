import React, { useEffect, useState } from "react";

const tagsList = [
  "راهنمای خرید",
  "سبک زندگی",
  "فشن",
  "مد و پوشاک",
  "استایل روز",
];

// دیتای فرضی مقاله
const articles = [
  { id: 1, title: "انتخاب تیشرت مناسب تابستان", tag: "راهنمای خرید" },
  { id: 2, title: "ترندهای فشن 2024", tag: "فشن" },
  { id: 3, title: "استایل روزمره مینیمال", tag: "استایل روز" },
  { id: 4, title: "لباس مناسب محل کار", tag: "مد و پوشاک" },
];

const TagsFilter = () => {
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeTag) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.tag === activeTag)
      );
    }
  }, [activeTag]);

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm p-4">
      <h1 className="text-xl font-bold mb-4 text-right">تگ‌ها</h1>

      <div className="flex flex-wrap justify-end gap-2 mb-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"
              />
            ))
          : tagsList.map((tag, index) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`px-4 py-1.5 text-sm rounded-full border cursor-pointer
                transition-all duration-300
                animate-fade-slide
                ${
                  activeTag === tag
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 text-gray-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
      </div>

      <div className="flex flex-col gap-3 text-right">
        {filteredArticles.length === 0 ? (
          <p className="text-sm text-gray-400">مقاله‌ای برای این تگ پیدا نشد</p>
        ) : (
          filteredArticles.map((item) => (
            <div
              key={item.id}
              className="p-3 border rounded-lg hover:shadow transition"
            >
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagsFilter;
