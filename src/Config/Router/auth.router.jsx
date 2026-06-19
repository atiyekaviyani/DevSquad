import Layout from "../../App/Layout";
import { createBrowserRouter } from "react-router-dom";
import Blog from "../../Screens/BlogPage";
import LandingHolder from "../../Screens/LandingHolder";
import StorePage from "../../Screens/StorePage";
import LoginPage from "../../Screens/LoginPage";
import About from "../../Screens/AboutPage";
import DetailBlog from "../../Screens/DetailBlogPage";
import ContactPage from "../../Screens/ContactUs";
import BasketCart from "../../Screens/BasketCart";
import Register from "../../Screens/Register";
import ChangePassPage from "../../Screens/ChangePassPage";
import ChangePassPage2 from "../../Screens/ChangePassPage2";
import ChangePassPage3 from "../../Screens/ChangePassPage3";
import RegisterPage2 from "../../Screens/Register2";
import RegisterPage3 from "../../Screens/Register3";
import ProductDetail from "../../Screens/StorePage/ProductDetail";

import PanelLayout from "../../App/PanelLayout/PanelLayout";

import Dashboard from "../../Screens/Panel/Dashboard";
import Orders from "../../Screens/Panel/Orders";
import Favorites from "../../Screens/Panel/Favorites";
import Addresses from "../../Screens/Panel/Addresses";
import Profile from "../../Screens/Panel/Profile";
import SettingPanel from "../../Screens/Panel/SettingPanel";
import OrderDetails from "../../Screens/Panel/Orders/OrderDetails";

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
        path: "/Store",
        element: <StorePage />,
      },

      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/Detail",
        element: <DetailBlog />,
      },
      {
        path: "/ContactPage",
        element: <ContactPage />,
      },
      {
        path: "/Basket",
        element: <BasketCart />,
      },
      {
        path: "ProductDetail/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },

  {
    path: "ChangePass",
    element: <ChangePassPage />,
  },
  {
    path: "ChangePass2",
    element: <ChangePassPage2 />,
  },
  {
    path: "ChangePass3",
    element: <ChangePassPage3 />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "Register2",
    element: <RegisterPage2 />,
  },
  {
    path: "Register3",
    element: <RegisterPage3 />,
  },

  // {
  //   path: "/panel",
  //   element: <PanelLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "orders",
  //       element: <Orders />,
  //     },
  //     {
  //       path: "favorites",
  //       element: <Favorites />,
  //     },
  //     {
  //       path: "addresses",
  //       element: <Addresses />,
  //     },
  //     {
  //       path: "profile",
  //       element: <Profile />,
  //     },
  //       {
  //       path: "Settings",
  //       element: <SettingPanel />,
  //     },
  //   ],
  // },

  {
    path: "/panel",
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "addresses",
        element: <Addresses />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "Settings",
        element: <SettingPanel />,
      },
    ],
  },
]);
