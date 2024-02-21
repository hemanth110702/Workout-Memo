import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-5 font-protest flex justify-between  bg-orange-300">
      <h1 className="text-2xl font-bold ">Workout-Memo</h1>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
