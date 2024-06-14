import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from '../authentications/UserContext'; // Assuming you have this file for user context
import { db } from "../authentications/firebaseConfig";

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const formRef = useRef();
  const { user } = useUser();
  const [form, setForm] = useState({ name, email, message: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({ name, email, message: "" });
  }, [name, email]);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowNotification(true);
    setLoading(false);

    emailjs.send(
      'service_2bojbg2',
      'template_i3214i7',
      {
        from_name: user ? user.name : "Anonymous", // Using signed-in user's name
        to_name: name,
        from_email: user ? user.email : 'anonymous@example.com', // Using signed-in user's email
        to_email: email,
        message: form.message
      },
      'hPf1rSsTNDx9KCvij'
    ).then(() => {
      setLoading(false);
      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setShowNotification(true);
      }, [3000]);
    },
      (error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <section className="relative flex lg:flex-row flex-col max-container">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text">Get in Touch with <span className="text-blue-500">{name}</span></h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7 mt-14"
          >
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="xyz"
                required
                value={form.name}
                onChange={handleChange}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="abcd@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                rows="4"
                className="textarea"
                placeholder="Write your thoughts here..."
                value={form.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" disabled={loading} className="btn">
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
