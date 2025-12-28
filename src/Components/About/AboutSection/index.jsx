import React from "react";
import { motion } from "framer-motion";
import FaqAbout from "../../About/FaqAbout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div className="w-full font-yekan bg-white" dir="rtl">
      <div>
        <img
          src="Blog3.png"
          alt="blog banner"
          className="w-full h-36 sm:h-48 md:h-36 object-cover rounded-b-2xl shadow-md"
        />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24 md:gap-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="AboutImg1.png"
              alt="about"
              className="w-full max-w-xs sm:max-w-sm rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="w-full lg:w-1/2 text-right space-y-6 leading-relaxed text-gray-700">
            <h1 className="text-2xl font-extrabold text-gray-900">
              درباره لوناشاپ
            </h1>
            <p className="text-base">
              در لونا شاپ، ما با عشق به جزئیات و باور به خاص بودن هر فرد، کارمان
              را آغاز کردیم. لباس برای ما فقط پوشش نیست؛ راهی است برای بیان
              شخصیت و اعتمادبه‌نفس.
            </p>

            <p className="text-base">
              کم‌کم مشتری‌های اول لونا شاپ تبدیل به دوستان همیشگی ما شدند؛ کسانی
              که انتخاب استایل‌شان را با خیال راحت به ما می‌سپردند.
            </p>

            <p className="text-base">
              ما به کیفیت، راحتی و ماندگاری استایل اهمیت می‌دهیم؛ نه فقط ترند
              بودن.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full bg-gray-100 rounded-3xl py-12 px-8 "
        >
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 text-right space-y-6 leading-relaxed text-gray-700">
              <h1 className="text-2xl font-extrabold text-gray-900">
                ماموریت لونا شاپ
              </h1>
              <p className="text-base">
                ماموریت لونا شاپ این است که یک همراه استایل باشد؛ از انتخاب لباس
                تا لحظه‌ای که با اطمینان جلوی آینه می‌ایستید.
              </p>

              <p className="text-base">
                ما اطلاعات دقیق درباره جنس، سایز، تن‌خور و نحوه ست‌کردن ارائه
                می‌دهیم تا خرید برای شما بدون ریسک و با آرامش انجام شود.
              </p>

              <p className="text-base">
                پشتیبانی محترمانه و پاسخ‌گو، از اولین سوال تا بعد از تحویل
                سفارش، تعهد همیشگی ماست.
              </p>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="AboutImg2.png"
                alt="about"
                className="w-full max-w-xs sm:max-w-sm rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <FaqAbout />
      </div>
    </div>
  );
};

export default AboutPage;
