import React from "react";
import img from '../assets/contact.png';
import { auth } from "../authentications/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Header = () => {
  const nav = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successfully.");
        nav('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <a href="#home" className="flex items-center">
          <img className="w-16 h-16" src={img} alt="logo" />
        </a>
      </div>
      <nav className="flex items-center space-x-6 text-black text-lg">
        <Link to='/home' className="hover:underline">Home</Link>
        <Link to='/contact' className="hover:underline">Contact</Link>
        <button onClick={handleSignout} className="hover:underline">Sign Out</button>
      </nav>
    </header>
  );
};

export default Header;
