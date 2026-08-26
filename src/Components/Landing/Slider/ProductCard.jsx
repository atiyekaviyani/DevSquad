import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ProductBadge from "../../../Components/Landing/Slider/ProductBadge";
import ProductWishlist from "../../Landing/Slider/ProductWishlist";
import ProductQuickAdd from "../../Landing/Slider/ProductQuickAdd";

import priceFormatter from "../../Landing/Slider/utils/priceFormatter";


export default function ProductCard({ product }) {

  const navigate = useNavigate();


  return (

    <motion.div

      initial={{
        opacity:0,
        y:30
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      viewport={{
        once:true
      }}

      whileHover={{
        y:-10
      }}

      transition={{
        duration:.4
      }}

      onClick={() =>
        navigate(`/ProductDetail/${product.id}`)
      }

      className="
      group
      relative
      cursor-pointer
      bg-gray-100
      rounded-3xl
      border
      border-gray-100
      p-4
      overflow-hidden
      hover:shadow-2xl
      transition
      "

    >


      <ProductBadge/>

      <ProductWishlist/>


      <div className="
      relative
      h-72
      rounded-2xl
      bg-gray-50
      flex
      items-center
      justify-center
      overflow-hidden
      ">


        <img

          src={product.image}

          alt={product.title}

          loading="lazy"

          className="
          h-full
          object-contain
          transition
          duration-700
          group-hover:scale-110
          "

        />


        <ProductQuickAdd/>


      </div>




      <div className="
      mt-5
      text-center
      ">


        <h3 className="
        font-semibold
        text-gray-800
        truncate
        ">

          {product.title}

        </h3>



        <p className="
        text-xs
        text-gray-400
        mt-2
        ">

          کد : {product.id}

        </p>



        <p className="
        font-bold
        text-lg
        mt-3
        ">

          {priceFormatter(product.price)}

        </p>


      </div>



    </motion.div>

  )

}