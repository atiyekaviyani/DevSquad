import Layout from "../../App/Layout";
import { createBrowserRouter } from "react-router-dom";
import Blog from "../../Screens/BlogPage"
import LandingHolder from "../../Screens/LandingHolder";
import StorePage from "../../Screens/StorePage";
import LoginPage from "../../Screens/LoginPage";
import About from "../../Screens/AboutPage";
import DetailBlog from "../../Screens/DetailBlogPage";
import ContactPage from "../../Screens/ContactUs";
import Registration from "../../Screens/ContactUs";
export const Routers = createBrowserRouter([
  {
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true, // این مسیر "/" را نشان می‌دهد
      element: <LandingHolder />,
    },
    {
      path: "/Landing",
      element: <LandingHolder />,
    },
    {
      path:"/Store",
      element:<StorePage/>
    },
   
    {
      path:"/About",
      element:<About/>
    } ,
      {
      path:"/blog",
      element:<Blog/>
    } ,
    {
      path:"/Detail",
      element:<DetailBlog/>
    },
     {
      path:"/ContactPage",
      element:<ContactPage/>
    },
  ],
},
 {
      path:"/Login",
      element:<LoginPage/>
    },
   {
    path:"",
    element:<Registration/>
   },

]);

