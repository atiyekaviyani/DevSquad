import { FiCalendar } from "react-icons/fi";

const RELATED_NEWS = [
  {
    id: 1,
    title: "تخفیف ویژه برای محصولات زمستانه",
    date: "۱۴ آذر ۱۴۰۲",
    image: "/24.svg",
    link: "/news/winter-discount",
  },
  {
    id: 2,
    title: "معرفی کالکشن جدید تابستان ۱۴۰۲",
    date: "۱۰ تیر ۱۴۰۲",
    image: "/18.svg",
    link: "/news/summer-collection-1402",
  },
  {
    id: 3,
    title: "نکات مهم برای انتخاب سایز مناسب",
    date: "۲۸ مرداد ۱۴۰۲",
    image: "/25.svg",
    link: "/news/size-tips",
  },
  {
    id: 4,
    title: "راهنمای خرید آنلاین آسان",
    date: "۱۵ شهریور ۱۴۰۲",
    image: "/16.svg",
    link: "/news/easy-online-shopping",
  },
];

export default function RelatedNews() {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm w-full text-right">
      <h3 className="font-semibold mb-4 text-lg">اخبار مرتبط</h3>
      <div className="space-y-4">
        {RELATED_NEWS.map(({ id, title, date, image, link }) => (
          <a
            href={link}
            key={id}
            className="flex gap-3 p-3 border rounded hover:shadow transition items-center bg-gray-50 w-full"
            dir="rtl"
          >
            <img
              src={image}
              alt={title}
              className="w-20 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center text-xs text-gray-500 gap-1 mb-1 justify-end">
                <span>{date}</span>
                <FiCalendar />
              </div>
              <h4 className="text-sm font-medium text-gray-800 truncate">
                {title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
