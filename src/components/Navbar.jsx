import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">Quickai</div>
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/bills"
            className={({ isActive }) => (isActive ? "text-blue-600" : "")}
          >
            Bills
          </NavLink>
          {user && (
            <NavLink
              to="/my-bills"
              className={({ isActive }) => (isActive ? "text-blue-600" : "")}
            >
              My Pay Bills
            </NavLink>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="btn btn-sm btn-outline">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-sm btn-primary">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${
                      user.displayName || user.email
                    }`
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button onClick={logout} className="btn btn-sm">
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
