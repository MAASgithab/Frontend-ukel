import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Template from "../template";
import App from "../App";
import ListProduk from "../pages/ListProduk";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import AdminPage from "../pages/AdminPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OrderDetail from "../pages/OrderDetail";
import PesananSaya from "../pages/PesananSaya";
import { ProtectedAdmin, ProtectedUser } from "../assets/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "home",
        element: <App />,
      },
      {
        path: "listProduk",
        element: <ListProduk />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedUser>
            <Checkout />
          </ProtectedUser>
        ),
      },
      {
        path: "orderdetail",
        element: (
          <ProtectedUser>
            <OrderDetail />
          </ProtectedUser>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedUser>
            <Cart />
          </ProtectedUser>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedAdmin>
            <AdminPage />
          </ProtectedAdmin>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pesanan-saya",
        element: (
          <ProtectedUser>
            <PesananSaya />
          </ProtectedUser>
        ),
      },
    ],
  },
]);
