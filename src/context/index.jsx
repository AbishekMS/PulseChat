import React, { createContext, useEffect, useReducer, useState } from 'react'
import { contactActions } from '../features/actions';  
import { initialState,contactReducer } from '../features/reducers';

export const ContactsContext = createContext();
export const ContactsProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9 ]+$/;

  const [state, dispatch] = useReducer(contactReducer, initialState);
  const addContact = (inputs) => {
    
    return {
      id: Date.now(),
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      date_created: new Date(Date.now()).toLocaleString(),
      photo: `https://robohash.org/${inputs.name}.png`,
    };
  };

  const emailExists =
    state && state.some((contact) => contact.email === inputs.email);
  const phoneExists =
    state && state.some((contact) => contact.phone === inputs.phone);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.email || !inputs.phone) {
      setError("All fields are required.");
      return;
    }
    if (!nameRegex.test(inputs.name)) {
      setError("Invalid name format.");
      return;
    }
    if (!emailRegex.test(inputs.email)) {
      setError("Invalid email format.");
      return;
    }
    if (!phoneRegex.test(inputs.phone)) {
      setError("Invalid phone format.");
      return;
    }
    if (emailExists) {
      setError("user with this email address already exists.");
      return;
    }
    if (phoneExists) {
      setError("user with this phone number already exists.");
      return;
    }
    try {
      dispatch({
        type: contactActions.ADD_CONTACT,
        payload: addContact(inputs),
      });
      setInputs({ name: "", email: "", phone: "" });
      setError("");
    } catch (error) {
      setError("Something went wrong.");
    }
  };
  localStorage.setItem("contacts", JSON.stringify(state));
  /*const handleDeletion = (email) => {
    const updatedContacts = state.filter(contact => contact.email !== email);
    dispatch({ type: contactActions.DELETE_CONTACT, payload: email });
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };*/

  const getData = () => {
    dispatch({ type: contactActions.GET_CONTACTS, payload: initialState });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ContactsContext.Provider
      value={{ handleSubmit,inputs, setInputs, state, error,dispatch }}
    >
      {children}
    </ContactsContext.Provider>
  );
};