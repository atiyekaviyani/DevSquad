import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const articles = [
  {
    id: 1,
    image: "imgblog1.png",
    title: "8 روش الهام بخش برای پوشیدن کت و شلوار رنگ روشن",
    excerpt:
      "در دنیای مد، همیشه شاهد تحولات و نوآوری‌هایی هستیم که هر کدام به نوبه خود استانداردهای جدیدی را معرفی می‌کنند. همراه ما باشید تا با بررسی این آیتم پرطرفدار، نحوه‌ی ست کردن کت و شلوار را شرح دهیم",
    author: "ادمین",
    tags: ["استایل", "مهمانی", "مد و پوشاک"],
  },
  {
    id: 2,
    image: "imgblog2.png",
    title: "8 روش الهام بخش برای پوشیدن کت و شلوار رنگ روشن",
    excerpt:
      "در دنیای مد، همیشه شاهد تحولات و نوآوری‌هایی هستیم که هر کدام به نوبه خود استانداردهای جدیدی را معرفی می‌کنند. همراه ما باشید تا با بررسی این آیتم پرطرفدار، نحوه‌ی ست کردن کت و شلوار را شرح دهیم",
    author: "ادمین",
    tags: ["استایل", "مهمانی", "مد و پوشاک"],
  },
];

const ArticleCard = ({ article }) => (
  <div className="border rounded-lg p-4 mb-8 shadow hover:shadow-lg transition w-full flex flex-col items-center">
    <img
      src={article.image}
      alt={article.title}
      className="w-full h-96 object-cover rounded-md"
    />
    <h2 className="text-2xl font-bold mt-4 text-center">{article.title}</h2>
    <p className="mt-2 text-gray-700 text-center">{article.excerpt}</p>

    <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-500 w-full max-w-4xl px-2">
      <div className="flex items-center cursor-pointer text-blue-600 font-medium hover:gap-3 transition gap-2">
        <NavLink to={"/Detail"}>
           <span className="text-lg"><FaLongArrowAltLeft /></span>
          <span>ادامه مطلب</span>
        </NavLink>
       
      
      </div>

      <div className="flex flex-wrap gap-4 ml-auto text-right">
        <span>
          تگ‌ها: <b>{article.tags.join(", ")}</b>
        </span>
        <span>
          بارگذاری شده توسط: <b>{article.author}</b>
        </span>
      </div>
    </div>
  </div>
);

const ArticlesSection = () => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      {articles.slice(0, 2).map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesSection;
