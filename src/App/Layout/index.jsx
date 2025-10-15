import React from "react";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import { Outlet } from "react-router-dom";
const index = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default index;
