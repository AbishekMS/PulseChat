import React, { useState } from 'react';
import img from '../assets/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import "./Login.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import SignInwithGoogle from './SigninwithGoogle';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav('/home');
    } catch (error) {
      setError(error.message);
      setIsSigningIn(false);
    }
  };

  return (
    <section className="relative flex lg:flex-row flex-col w-full h-full">
      <div className="bg-slate-200 w-1"></div>
      <div className="lg:w-1/2 w-full mt-16 lg:h-auto md:h-[550px] h-[350px]">
        <img src={img} alt="login image" className="right-20 w-full h-full" />
      </div>
      <div className="bg-slate-50 justify-center w-full flex-1 min-w-[50%] flex flex-col items-center">
        <img src={logo} alt="logo" className="w-36 mt-12" />
        <h1 className="text-3xl font-bold mt-6">Welcome back!</h1>
        <div className="w-96 space-y-5 rounded-xl mt-6 p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                />
                <button
                  type="button"
                  className="absolute right-3 top-5"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            {error && (<span className='text-sm text-red-600'>{error}</span>)}
            <button
              type="submit"
              className={`w-full px-4 py-2 mt-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition duration-300"
              }`}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline font-bold">
              Sign up
            </Link>
          </p>
          <p className="text-center text-sm mt-4">
            <Link to="/forgot-password" className="hover:underline font-bold">
              Forgot Password?
            </Link>
          </p>
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
    </section>
  );
};

export default Login;
