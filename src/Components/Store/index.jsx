import React from 'react';
import ProductFilter from '../../Components/Store/ProductFilter';
import BlogShop from '../../Components/Store/BlogShop';

const index = () => {
  return (
    <div>
       <div>
        <img
          src="Blog.png"
          alt="blog banner"
          className="w-full h-40 object-cover"
        />
      </div>
      <ProductFilter/>
     
    </div>
  )
}

export default index
