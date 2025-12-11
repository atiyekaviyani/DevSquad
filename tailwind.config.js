/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
     extend: {  fontFamily: { sans: ["IRANYekanXFaNum", "sans-serif"], // جایگزین فونت پیش‌فرض
      iransans: ["IRANYekanXFaNum", "sans-serif"], // اگه خواستی کلاس هم داشته باشی
    },
   
  },},
      plugins: [],
}