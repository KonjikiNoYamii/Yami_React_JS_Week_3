import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../style/Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Yami Store</h2>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            Products
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
              }
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
