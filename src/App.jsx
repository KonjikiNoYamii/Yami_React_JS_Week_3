import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const hideNavbarPaths = ["/login"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <ErrorBoundary>
          {shouldShowNavbar && <Navbar />}

          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
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
          </Routes>
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}
