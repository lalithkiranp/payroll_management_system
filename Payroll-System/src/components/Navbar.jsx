
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa"; // icons

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-2">
      {/* Brand */}
      <Link
        className="navbar-brand fw-bold fs-4 d-flex align-items-center"
        to="/"
      >
        <FaMoneyCheckAlt className="me-2" size={22} /> Payroll System
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {user && (
          <>
            <span className="text-light small">
              Welcome, <strong>{user.username}</strong>
            </span>
            <button
              className="btn btn-sm btn-outline-light rounded-pill px-3 d-flex align-items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-2" size={16} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
