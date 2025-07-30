// src/components/Navbar.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-red-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">📝 NotesApp</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-red-100" 
      >
        Sign out
      </button>
    </nav>
  );
};

export default Navbar;
