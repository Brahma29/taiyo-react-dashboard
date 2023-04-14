import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  activeStatus: Boolean;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(
      state,
      action: PayloadAction<{ phoneNumber: string; updatedContact: Contact }>
    ) {
      const { phoneNumber, updatedContact } = action.payload;
      const index = state.contacts.findIndex(
        (contact) => contact.phoneNumber === phoneNumber
      );
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    },
    removeContact(state, action: PayloadAction<string>) {
      const phoneNumber = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => contact.phoneNumber !== phoneNumber
      );
    },
  },
});

export const { addContact, updateContact, removeContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
