import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";


export default function SliderHeader({
  title,
  onClick
}) {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      className="
        flex
        items-center
        justify-between
        mb-10
      "

    >

      <div>

        <p className="
          text-xs
          tracking-[4px]
          text-gray-400
        ">
          COLLECTION
        </p>


        <h2 className="
          text-4xl
          font-bold
          mt-3
        ">
          {title}
        </h2>

      </div>



      <button

        onClick={onClick}

        className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-full
          border
          hover:bg-black
          hover:text-white
          transition
        "

      >

        مشاهده بیشتر

        <ArrowLeft size={18}/>

      </button>


    </motion.div>

  );
}