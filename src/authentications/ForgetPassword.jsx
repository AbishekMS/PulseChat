import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Link } from 'react-router-dom';
import img from '../assets/f2.svg';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
      setError('');
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute left-0 w-full h-full flex z-0">
        <img src={img} alt="login image" className="w-full h-full mt-8" />
      </div>
      <div className="relative z-10 w-full max-w-md mt-10 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition duration-300"
          >
            Send Password Reset Email
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          <Link to="/" className="hover:underline font-bold">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgetPassword;
