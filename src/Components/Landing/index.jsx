import React from "react";
import HeroSection from "../Landing/HeroSection";
import Category from "../Landing/Category";
import Grouping from "../Landing/Grouping";
import Slider from "../Landing/Slider";
import Gride from "../Landing/Gride";
import Slide3 from "../Landing/Slider3";
import Brand from "../Landing/Brand";
import ImgCarosel from "../Landing/ImgCarosel";


const Landing = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <Grouping/>
      <Slider/>
      <Gride/>
      <Slide3/>
      <Brand/>
      <ImgCarosel/>
    </div>
  );
};

export default Landing;
