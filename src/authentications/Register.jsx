import React, { useState } from 'react';
import img from '../assets/img3.svg';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import "./Login.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import SignInwithGoogle from './SigninwithGoogle';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setName] = useState("");
    const [confirm, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      if (isSigningIn) return;
  
      if (password !== confirm) {
        setError("Passwords do not match!");
        return;
      }
  
      setIsSigningIn(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: fname,
            phone: "",
          });
          console.log("User Registered Successfully!!");
          navigate('/home');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsSigningIn(false);

      }
    };
  

  return (
    <section className="flex flex-col lg:flex-row w-full h-full">
    <div className="lg:w-1/2 w-full mt-1 lg:h-auto md:h-[550px] h-[350px]">
    <img src={img} alt="login image" className="right-20 w-full h-full" />
  </div>
      <div className="bg-slate-50 flex-1 flex flex-col items-center justify-center min-w-[50%]">
        <img src={logo} alt="logo" className="w-36 mt-2" />
        <div className="w-96 space-y-5 rounded-xl mt-6 p-6 bg-white shadow-lg">
          <form onSubmit={handleRegister}>
            <h3 className="text-2xl font-semibold mb-6">Sign Up</h3>
            <div className="mb-3">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="First name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="form-control mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <div>
            <button type="submit"  className={`px-3 py-2 mt-2 mb-3 font-medium text-white rounded-md ${
             isSigningIn ? "bg-gray-300 cursor-not-allowed": 
             "bg-blue-600 hover:bg-blue-700 hover:shadow-md transition duration-300"}`} disabled={isSigningIn}>
             {isSigningIn ? "Signing In..." : "Sign In"} </button>

            </div>
            <p className="forgot-password text-right mt-1">
              Already registered? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
          <div className="flex flex-row items-center justify-center w-full mt-4">
            <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
            <div className="text-sm font-bold">OR</div>
            <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
          </div>
          <div className="flex justify-center mt-4">
          <SignInwithGoogle/>
        </div>
        </div>
      </div>
      <div className="hidden lg:block bg-slate-200 w-1"/>
      
    </section>
  );
}

export default Register;
