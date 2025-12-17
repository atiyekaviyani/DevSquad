import React from "react";
import { motion } from "framer-motion";
import FaqAbout from "../../About/FaqAbout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <div className="w-full font-sans" dir="rtl">
      <div>
        <img
          src="Blog3.png"
          alt="blog banner"
          className="w-full h-30 sm:h-48 md:h-30 object-cover"
        />
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-20 md:gap-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="AboutImg1.png"
              alt="about"
              className="w-full max-w-xs sm:max-w-sm rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="w-full lg:w-1/2 text-right space-y-5 leading-8 text-gray-700">
            <h1 className="text-xl font-bold text-gray-800"> درباره لوناشاپ</h1>
            <p>
              در لونا شاپ، ما با عشق به جزئیات و باور به خاص بودن هر فرد، کارمان
              را آغاز کردیم. لباس برای ما فقط پوشش نیست؛ راهی است برای بیان
              شخصیت و اعتمادبه‌نفس.
            </p>

            <p>
              کم‌کم مشتری‌های اول لونا شاپ تبدیل به دوستان همیشگی ما شدند؛ کسانی
              که انتخاب استایل‌شان را با خیال راحت به ما می‌سپردند.
            </p>

            <p>
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
          className="w-full bg-gray-100 rounded-2xl py-10 px-4 sm:px-8"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2 text-right space-y-5 leading-8 text-gray-700">
              <h1 className="text-xl font-bold text-gray-800">
                ماموریت لونا شاپ
              </h1>
              <p>
                ماموریت لونا شاپ این است که یک همراه استایل باشد؛ از انتخاب لباس
                تا لحظه‌ای که با اطمینان جلوی آینه می‌ایستید.
              </p>

              <p>
                ما اطلاعات دقیق درباره جنس، سایز، تن‌خور و نحوه ست‌کردن ارائه
                می‌دهیم تا خرید برای شما بدون ریسک و با آرامش انجام شود.
              </p>

              <p>
                پشتیبانی محترمانه و پاسخ‌گو، از اولین سوال تا بعد از تحویل
                سفارش، تعهد همیشگی ماست.
              </p>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="AboutImg2.png"
                alt="about"
                className="w-full max-w-xs sm:max-w-sm rounded-xl object-cover shadow-md"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div>
        <FaqAbout />
      </div>
    </div>
  );
};

export default AboutPage;
