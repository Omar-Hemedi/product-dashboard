import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProductDashboard from "../pages/ProductDashboard";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShoppingCart";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import OrderHistory from "../pages/OrderHistory";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />

      <Route
        path="products"
        element={
          <ProtectedRoute>
            <ProductDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="products/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        }
      />
      <Route
        path="order-history"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      <Route path="auth">
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />
      </Route>
    </>
  )
);

export default Router;