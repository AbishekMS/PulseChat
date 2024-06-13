import React, { useContext } from "react";
import { ContactsContext } from "../context";


const AddContact = () => {
  const { inputs, setInputs, handleSubmit, error } =
    useContext(ContactsContext);
  return (
    <div className="p-1 mb-1">
      <h2 className="font-bold underline mt-36 mb-10 text-3xl">Add Contact</h2>
      {error && <span className="text-red-500">{error}</span>}
      <form className="flex flex-wrap justify-between items-center mb-4 flex-1" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="text-2xl">Name</label>
          <input type="text"
            id="name"
            name="name"
            value={inputs.name}
            placeholder="Enter name"
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-2xl">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="text-2xl">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone"
            value={inputs.phone}
            onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
          />
        </div>
        <div className="form-group mt-10">
          <button className="btn-primary">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;