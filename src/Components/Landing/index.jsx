import React from "react";
import HeroSection from "../Landing/HeroSection";
import Category from "../Landing/Category";
// import Grouping from "../Landing/Grouping";
// import Slider from "../Landing/Slider";
import BrandStory from "../Landing/BrandStory";

import Gride from "../Landing/Gride";
import Slide3 from "../Landing/Slider3";
// import Brand from "../Landing/Brand";
import ImgCarosel from "../Landing/ImgCarosel";
import BrandFeatures from "../Landing/BrandFeatures";
import FeaturedCollection from "../Landing/FeaturedCollection";
import CategoryShowcase from "../Landing/CategoryShowcase";
import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import WhyChooseUs from "./WhyChooseUs";
// import InstagramGallery from "./InstagramGallery";
import Lookbook from "./Lookbook";
import StyleGuide from "../Landing/StyleGuide"


const Landing = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <BrandStory />
      {/* <Grouping /> */}
        <Slide3 />
      {/* <Slider /> */}
      
      <BrandFeatures/>
      <FeaturedCollection/>
      <CategoryShowcase/>
      <NewArrivals/>
      <BestSellers/>
      <Gride />
      <Lookbook/>
      <StyleGuide/>
    
      {/* <Brand />  */}
      <WhyChooseUs/>
      {/* <InstagramGallery/> */}
      <ImgCarosel />
    </div>
  );
};

export default Landing;
