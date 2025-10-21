import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      

      {cart.length > 0 ? (
        <>
        <h2>Terima kasih sudah membeli di toko kami ^^</h2>
          <h3>Total belanjaan Anda: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={clearCart}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </>
      ) : (
        <p>Keranjang Anda kosong~</p>
      )}
    </div>
  );
}
