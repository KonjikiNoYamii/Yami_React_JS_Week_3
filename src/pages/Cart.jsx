import { useState, useRef } from "react";
import { useCart } from "../hooks/useCart";
import "../style/Cart.css";

export default function Cart() {
  const { cart, removeCart, clearCart, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={cartRef}
      className="cart-container"
      style={{
        position: "fixed",
        bottom: `${pos.y}px`,
        right: `${pos.x}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {isOpen && (
        <div className="cart-details">
          <h2>Keranjang Belanja</h2>
          {cart.length === 0 ? (
            <p>Keranjang kosong~ 💔</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span>
                      {item.title} — ${item.price}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeCart(item.id)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button className="clear-btn" onClick={clearCart}>
                Hapus Semua
              </button>
            </>
          )}
        </div>
      )}
      <div
        className="cart-icon"
        onMouseDown={handleMouseDown}
        onClick={() => setIsOpen((p) => !p)}
        title="Drag untuk pindah 💫"
      >
        🛒
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>
    </div>
  );
}
