import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="p-5 font-protest flex justify-between  bg-orange-300">
      <h1 className="text-2xl font-bold ">Workout-Memo</h1>
      <div>
        {user && (
          <div>
            <span className="mr-4">{user.email}</span>
            <button
              className="mr-4 hover:bg-green-500 p-4 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        {!user && (
          <div>
            <Link
              className="mr-4 hover:bg-green-500 p-4 hover:text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="mr-4 hover:bg-green-500 p-4 hover:text-white"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
