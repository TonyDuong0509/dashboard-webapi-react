import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import ProductDetails from "../../pages/productDetails/ProductDetails";
import Products from "../../pages/products/Products";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../pages/basket/BasketPage";
import RequireAuth from "./RequireAuth";
import Register from "../../pages/account/Register";
import Login from "../../pages/account/Login";
import CheckoutPage from "../../pages/checkout/CheckoutPage";
import Orders from "../../pages/orders/Orders";
import Inventory from "../../pages/admin/Inventory";
import Customers from "../../pages/customers/Customers";
import CustomerList from "../../pages/admin/CustomerList";
import CustomerDetails from "../../pages/customerDetails/CustomerDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // authenticated routes
        element: <RequireAuth />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/orders", element: <Orders /> },
        ],
      },
      // admin routes
      {
        element: <RequireAuth roles={["Admin"]} />,
        children: [
          { path: "/inventory", element: <Inventory /> },
          { path: "/customerList", element: <CustomerList /> },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
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
