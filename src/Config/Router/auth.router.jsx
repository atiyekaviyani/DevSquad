import Layout from "../../App/Layout";
import { createBrowserRouter } from "react-router-dom";

import LandingHolder from "../../Screens/LandingHolder";
import StorePage from "../../Screens/StorePage";
import LoginPage from "../../Screens/LoginPage";
import About from "../../Screens/AboutPage";
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
      path: "Landing",
      element: <LandingHolder />,
    },
    {
      path:"Store",
      element:<StorePage/>
    },
    {
      path:"Login",
      element:<LoginPage/>
    },
    {
      path:"About",
      element:<About/>
    }
  ],
}

]);
