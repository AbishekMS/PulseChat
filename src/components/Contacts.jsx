import React, { useContext, useState } from "react";
import { ContactsContext } from "../context";
import { useNavigate } from "react-router-dom";
import { contactActions } from "../features/actions";
import { CircleLoader } from "react-spinners";

const Contacts = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ContactsContext);
  const [loading, setLoading] = useState(false);

  const handleContactClick = (name, email) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/contact?name=${name}&email=${email}`);
    }, 1000); 
  };

  const handleDeletion = (contactId) => {
    const updatedContacts = state.filter(contact => contact.id !== contactId);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    dispatch({ type: contactActions.DELETE_CONTACT, payload: contactId });
  };

  return (
    <div className="add-contact">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <CircleLoader color="#3688d6" />
          </div>
        </div>
      )}
      {!loading && (
        <>
          {state.length > 0 ? (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th className="fixed-column">Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {state.map((contact) => (
                  <tr key={contact.id}>
                    <td className="fixed-column">
                      <img src={contact.photo} alt="Contact" />
                    </td>
                    <td>
                      {contact.name}
                      <small>{contact.date_created}</small>
                    </td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() => handleContactClick(contact.name, contact.email)}
                      >
                        Click here
                      </button>
                      <button
                        className="btn-delete ml-2"
                        onClick={() => handleDeletion(contact.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="text-danger">There are no contacts yet.</span>
          )}
        </>
      )}
    </div>
  );
};

export default Contacts;
