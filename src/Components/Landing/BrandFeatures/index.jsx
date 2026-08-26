import { motion } from "framer-motion";
import {
  Scissors,
  Gem,
  Leaf,
} from "lucide-react";
import { PiYarnThin } from "react-icons/pi";
const features = [
  {
    icon: <PiYarnThin size={44} strokeWidth={1.2} />,
    title: "کیفیت در هر تار و پود",
    text: "لطافت و دوام بی‌نظیر",
  },
  {
    icon: <Scissors size={40} strokeWidth={1.2} />,
    title: "برش و دوخت حرفه‌ای",
    text: "دوخت حرفه‌ای با جزئیات دقیق",
  },
  {
    icon: <Gem size={38} strokeWidth={1.2} />,
    title: "طراحی ماندگار",
    text: "طراحی مینیمال، مدرن و ماندگار",
  },
  {
    icon: <Leaf size={38} strokeWidth={1.2} />,
    title: "کیفیت در هر جزئیات",
    text: "ساخته‌شده با احترام به طبیعت",
  },
];

export default function BrandFeatures() {
  return (

    <section className="bg-white pt-8 pb-10 lg:pt-10 lg:pb-12">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    <div className="border-t border-neutral-200 pt-12 lg:pt-16 mt-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: .5,
              delay: index * .12,
            }}
            className={`
              group
              flex
              flex-col
              sm:flex-row
              items-center
              sm:items-start
              text-center
              sm:text-right
              gap-5
              px-6
              py-10
              transition-all
              duration-500
              hover:-translate-y-1

              border-b
              sm:border-b-0

              border-neutral-200

              xl:border-r

              ${
                index === features.length - 1
                  ? "xl:border-r-0 border-b-0"
                  : ""
              }
            `}
          >
            <div className="flex-shrink-0 text-neutral-900 transition duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <div>
              <h4 className="text-sm lg:text-[15px] tracking-[3px] lg:tracking-[4px] font-light text-neutral-900 uppercase">
                {item.title}
              </h4>

              <p className="mt-3 text-sm lg:text-[15px] leading-7 text-neutral-600">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}

      </div>

    </div>
  </div>
</section>
  );
}