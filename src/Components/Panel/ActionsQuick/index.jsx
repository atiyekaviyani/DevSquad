// export default function QuickActions() {
//   const actions = [
//     "افزودن محصول جدید",
//     "مشاهده همه سفارش‌ها",
//     "مدیریت آدرس‌ها",
//     "ویرایش پروفایل",
//   ];

//   return (
//     <div className="bg-black/40 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-lg">
//       <h2 className="text-lg mb-6 font-medium">میانبرها</h2>

//       <div className="grid grid-cols-1 gap-4">
//         {actions.map((item, index) => (
//           <button
//             key={index}
//             className="bg-[#1e293b] hover:bg-[#0f172a] transition p-4 rounded-2xl text-sm">
//             {item}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    { label: "افزودن محصول جدید", to: "/panel/products/new" },
    { label: "مشاهده همه سفارش‌ها", to: "/panel/orders" },
    { label: "مدیریت آدرس‌ها", to: "/panel/addresses" },
    { label: "ویرایش پروفایل", to: "/panel/profile" },
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-[28px] p-6 border border-white/10 shadow-lg">
      <h2 className="text-lg mb-6 font-medium">میانبرها</h2>

      <div className="grid grid-cols-1 gap-4">
        {actions.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="block bg-[#1e293b] hover:bg-[#0f172a] transition p-4 rounded-2xl text-sm text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}