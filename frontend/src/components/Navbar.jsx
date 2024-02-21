import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const {user} = useAuthContext()
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="p-5 font-protest flex justify-between  bg-orange-300">
      <h1 className="text-2xl font-bold ">Workout-Memo</h1>
      <div>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
