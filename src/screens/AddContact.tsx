import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../redux/reducers/ContactsSlice';

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeStatus, setActiveStatus] = useState('active');

  const { id } = useParams();

  const { contacts } = useSelector((state: any) => state.contacts);

  useEffect(() => {
    //We are using same form for both adding and editing contact, so if there is id present we will set the values
    if (id) {
      const contactToUpdate = contacts.find((c: any) => c.phoneNumber === id);
      if (contactToUpdate !== -1) {
        setFirstName(contactToUpdate.firstName);
        setLastName(contactToUpdate.lastName);
        setPhoneNumber(contactToUpdate.phoneNumber);
        setActiveStatus(contactToUpdate.activeStatus ? 'active' : 'inactive');
      }
    }
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newContact = {
      firstName,
      lastName,
      phoneNumber,
      activeStatus: activeStatus === 'active' ? true : false,
    };
    if (id) {
      dispatch(updateContact({ phoneNumber: id, updatedContact: newContact }));
    } else {
      dispatch(addContact(newContact));
    }
    navigate('/');
  };

  return (
    <div className="container flex flex-col items-center justify-center p-5 mx-auto">
      <div className="flex justify-start w-full header">
        <Link to="/" className="px-6 py-2 font-medium rounded-md bg-sidebar-bg">
          Go Back
        </Link>
      </div>
      <div className="p-8 md:w-2/5 form-container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-white contact-form gap-y-4"
        >
          <h1 className="mb-3 text-3xl font-bold text-center">
            Add New Contact
          </h1>
          <div className="flex flex-col gap-y-2 input-group">
            <label htmlFor="firstName"> First Name </label>
            <input
              type="text"
              name="firstName"
              className="px-3 py-2 text-black rounded-md outline-none input"
              placeholder="John"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 input-group">
            <label htmlFor="lastName"> Last Name </label>
            <input
              type="text"
              name="lastName"
              className="px-3 py-2 text-black rounded-md outline-none input"
              placeholder="Doe"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 input-group">
            <label htmlFor="phoneNumber"> Phone Number </label>
            <input
              type="text"
              name="phoneNumber"
              className="px-3 py-2 text-black rounded-md outline-none input"
              placeholder="9873635556"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-6 input-group">
            <label htmlFor="active-status"> Active Status </label>
            <div className="flex flex-col radio-container gap-y-4">
              <label className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="active-status"
                  className="px-3 py-2 text-black rounded-md outline-none input"
                  id="active-status-active"
                  value="active"
                  checked={activeStatus === 'active'}
                  onChange={() => setActiveStatus('active')}
                />
                Active
              </label>
              <label className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name="active-status"
                  className="px-3 py-2 text-black rounded-md outline-none input"
                  id="active-status-inactive"
                  value="inactive"
                  checked={activeStatus === 'inactive'}
                  onChange={() => setActiveStatus('inactive')}
                />
                Inactive
              </label>
            </div>
          </div>
          <button className="w-full py-3 text-black rounded-lg bg-sidebar-bg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
