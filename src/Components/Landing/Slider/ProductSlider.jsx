// import { Swiper, SwiperSlide } from "swiper/react";

// import {
//   Navigation,
//   Pagination,
//   Autoplay,
//   Keyboard,
//   Mousewheel
// } from "swiper/modules";


// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


// import { useNavigate } from "react-router-dom";


// import useProducts from "../../../Components/Landing/Slider/hooks/useProducts";

// import ProductCard from "./ProductCard";
// import SliderHeader from "./SliderHeader";
// import SliderNavigation from "./SliderNavigation";
// import SliderPagination from "./SliderPagination";
// import SliderSkeleton from "./SliderSkeleton";



// export default function ProductSlider(){


// const {
//  products,
//  loading
// } = useProducts();


// const navigate = useNavigate();



// if(loading){

// return (

// <div className="mt-20 px-6">

// <SliderSkeleton/>

// </div>

// )

// }



// return (

// <div

// dir="rtl"

// className="
// mt-20
// px-6
// "

// >


// <div className="
// max-w-[1400px]
// mx-auto
// ">


// <SliderHeader

// title="انواع تیشرت"

// onClick={() =>
// navigate("/store")
// }

// />



// <Swiper


// modules={[
// Navigation,
// Pagination,
// Autoplay,
// Keyboard,
// Mousewheel
// ]}



// navigation={{

// prevEl:"#prev",
// nextEl:"#next"

// }}



// pagination={{

// el:".custom-pagination",
// clickable:true

// }}




// speed={700}

// autoplay={{
// delay:4500,
// disableOnInteraction:false

// }}




// keyboard={{
// enabled:true
// }}



// mousewheel



// spaceBetween={30}



// // breakpoints={{

// // 320:{
// // slidesPerView:1.1
// // },

// // 640:{
// // slidesPerView:2
// // },

// // 1024:{
// // slidesPerView:3
// // },

// // 1280:{
// // slidesPerView:4
// // }

// // }}



// breakpoints={{

// 320:{
// slidesPerView:1.2,
// spaceBetween:15
// },

// 640:{
// slidesPerView:2.2,
// spaceBetween:20
// },

// 1024:{
// slidesPerView:3.5,
// spaceBetween:24
// },

// 1280:{
// slidesPerView:4.5,
// spaceBetween:28
// }

// }}



// >


// {

// products.map(product=>(


// <SwiperSlide

// key={product.id}

// >


// <ProductCard

// product={product}

// />


// </SwiperSlide>


// ))

// }


// </Swiper>



// <SliderNavigation/>

// <SliderPagination/>


// </div>


// </div>

// )

// }