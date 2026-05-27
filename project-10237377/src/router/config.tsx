import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import MenPage from "../pages/men/page";
import WomenPage from "../pages/women/page";
import ShopPage from "../pages/shop/page";
import ProductPage from "../pages/product/page";
import AboutPage from "../pages/about/page";
import LoginPage from "../pages/login/page";
import RegisterPage from "../pages/register/page";
import CartPage from "../pages/cart/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/men",
    element: <MenPage />,
  },
  {
    path: "/women",
    element: <WomenPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/shop/:slug",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;