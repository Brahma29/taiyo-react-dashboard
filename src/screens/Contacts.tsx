import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../app/store';
import { Contact, removeContact } from '../redux/reducers/ContactsSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  contacts: Contact[];
  removeContact: (phoneNumber: string) => void;
}

const Contacts: React.FC<Props> = ({ contacts, removeContact }) => {
  const navigate = useNavigate();
  return (
    <div className="container p-5 mx-auto">
      <div className="flex justify-end w-full header">
        <Link
          to="/addcontact"
          className="px-6 py-2 font-medium rounded-md bg-sidebar-bg"
        >
          Add Contact
        </Link>
      </div>
      {contacts.length === 0 ? (
        <div className="flex items-center justify-center w-full text-4xl text-center text-white h-96">
          'No Contacts to Show! Please add new contacts'
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-4 contact-list">
          {contacts.map((contact) => (
            <div
              key={contact.firstName}
              className={`flex flex-col p-4 text-white contact-card rounded-xl bg-contact-card-bg gap-y-4 ${
                contact.activeStatus
                  ? 'border border-green-300'
                  : 'border border-red-400'
              }`}
            >
              <div className="contact-details">
                <h2 className="text-2xl">{contact.firstName}</h2>
                <h3>{contact.phoneNumber}</h3>
              </div>
              <div className="flex justify-end card-buttons gap-x-2">
                <div onClick={() => navigate(`/edit/${contact.phoneNumber}`)}>
                  Edit
                </div>
                <div onClick={() => removeContact(contact.phoneNumber)}>
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = {
  removeContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
