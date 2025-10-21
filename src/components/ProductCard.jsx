import { useCart } from "../hooks/useCart";
import "../style/ProductCard.css";

export default function ProductCard({ product }) {
  const { addCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => addCart(product)}>Add to Cart</button>
    </div>
  );
}
