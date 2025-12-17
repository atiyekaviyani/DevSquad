import React from "react";
import SaidBarBlog from "../Blog/SaidBarBlog";
import ListBlog from "../DetailBlog/ListBlog";
import Comment from "../DetailBlog/Comment";

const Index = () => {
  return (
    <div>
      <div className="w-full">
        <img
          src="Blog.png"
          alt="blog banner"
          className="w-full h-40 object-cover"
        />
      </div>{" "}
      {/* <div className="w-[80%] flex flex-col lg:flex-row gap-6 mt-5">
        <div className="w-full lg:w-[30%] mt-10">
          <SaidBarBlog />
        </div>

        <div className="w-full lg:w-[70%]">
          <ListBlog />
        </div>
        <div>
          <Comment />
        </div>
      </div> */}
  <div className=" flex mt-5 w-[80%] m-auto">

     <div className=" w-[30%] mt-14">

          <SaidBarBlog />
    </div>
    <div className=" w-[60%]">

      <ListBlog />
      <Comment />
    </div>
   
     

  </div>

  
    </div>
  );
};

export default Index;
