import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SingleProduct from "../pages/SingleProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SingleProductError from "../components/SingleProductError";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/Orders";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import CheckoutRoute from "./CheckoutRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/AdminLogin";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import ManageBooks from "../components/Dashboard/ManageBooks";
import AddNewBook from "../components/Dashboard/AddNewBook";
import EditBook from "../components/Dashboard/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books/:id",
        element: <SingleProduct />,
        errorElement: <SingleProductError />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutRoute>
              <Checkout />
            </CheckoutRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "orderConfirmation",
        element: (
          <PrivateRoute>
            <OrderConfirmationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin", element: <AdminLogin /> },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-new-book",
        element: <AddNewBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);
export default router;
