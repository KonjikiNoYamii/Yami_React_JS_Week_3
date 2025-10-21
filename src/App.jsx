import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Products from "./pages/Products";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorBoundary />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
