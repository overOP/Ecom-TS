
import { createBrowserRouter } from "react-router";

import Layout from "../Layout/Layout";
import Dashboard from "@/Pages/Dashboard";
import Products from "@/Pages/Products";
import Cart from "@/Pages/Cart";
import Categories from "@/Pages/Categories";
import Subcategories from "@/Pages/Subcategories";
import Banners from "@/Pages/Banners";
import Logos from "@/Pages/Logos";
import Advertisements from "@/Pages/Advertisements";
import Users from "@/Pages/Users";
import SignUp from "@/Pages/Signup";
import Logout from "@/Pages/Logout"; 
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "products", element: <Products /> },
          { path: "cart", element: <Cart /> },
          { path: "categories", element: <Categories /> },
          { path: "subcategories", element: <Subcategories /> },
          { path: "banners", element: <Banners /> },
          { path: "logos", element: <Logos /> },
          { path: "advertisements", element: <Advertisements /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
]);
