import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import "../style/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const { cart, totalPrice, removeCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu sebelum checkout");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Gagal fetching produk");
        const result = await res.json();
        setProducts(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading-text">Sedang memuat...</p>;
  if (error) return <p className="error-text">Ada kesalahan: {error}</p>;

  return (
    <div className="products-page">
      <div className="cart-button" onClick={() => setShowCart(!showCart)}>
        🛒
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>

      {showCart && (
        <div className="cart-popup">
          <h3>Keranjang Belanja</h3>
          {cart.length === 0 ? (
            <p>Keranjang kosong...</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-info">
                    <p>{item.title}</p>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeCart(item.id)}
                    className="remove-btn"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <hr />
              <p>
                <strong>Total:</strong> ${totalPrice.toFixed(2)}
              </p>
              <button onClick={handleCheckout} className="checkout-btn">
                Checkout
              </button>
            </>
          )}
        </div>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
