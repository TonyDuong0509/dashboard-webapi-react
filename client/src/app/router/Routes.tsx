import { Navigate, createBrowserRouter } from "react-router-dom";
import { singleUser } from "../../data";
import Home from "../../pages/home/Home";
import ProductDetails from "../../pages/productDetails/ProductDetails";
import Products from "../../pages/products/Products";
import UserDetails from "../../pages/userDetails/UserDetails";
import Users from "../../pages/users/Users";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../pages/basket/BasketPage";
import CheckoutPage from "../../pages/checkout/CheckoutPage";
import RequireAuth from "./RequireAuth";
import Register from "../../pages/account/Register";
import Login from "../../pages/account/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "/checkout", element: <CheckoutPage /> }],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users/:id",
        element: <UserDetails {...singleUser} />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "/basket",
        element: <BasketPage />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
