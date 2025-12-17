import React from "react";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const article = {
  image: "imgblog1.png", // تصویر نمونه
  title: "8 روش الهام بخش برای پوشیدن کت و شلوار رنگ روشن",
  subtitle: "این یک زیرعنوان تستی برای مقاله است",
  excerpt:
    "در دنیای مد، همیشه شاهد تحولات و نوآوری‌هایی هستیم که هر کدام به نوبه خود استانداردهای جدیدی را معرفی می‌کنند. یکی از این نوآوری‌ها که به شکلی شگرف در استایل زنان جایگاه ویژه‌ای پیدا کرده، استفاده از کراوات است. شاید شما هم متوجه شده باشید که در فشن‌شوهای پاییز 2024 طراحان زیادی از کراوات در تکمیل طراحی‌های خود استفاده کرده‌اند. کراوات، که در ابتدا نماد استایل مردانه و سنت‌های رسمی به شمار می‌رفت، امروزه در دنیای مد زنانه نیز حضوری برجسته پیدا کرده‌است. ",

  tags: ["مد", "فشن", "پوشاک"],
  author: "ادمین",
};

const ArticleDetail = () => {
  return (
    <div>
      <section className="max-w-[80vw] mx-auto py-8 px-4 flex flex-col items-center">
        <div className="border rounded-lg p-4 mb-8 shadow hover:shadow-lg transition w-full flex flex-col items-center max-w-4xl mt-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-4 text-right">{article.title}</h2>
          <div className="mt-4 space-y-4 text-gray-700 text-right leading-8">
            {article.excerpt.split("\n\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {/* <p className="mt-2 text-gray-700 text-right text-sm">{article.excerpt}</p> */}

          <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-500 w-full max-w-4xl px-2">
            <div className="flex items-center cursor-pointer text-blue-600 font-medium hover:gap-3 transition gap-2"></div>

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
      </section>
    </div>
  );
};

export default ArticleDetail;
