import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Phonebook } from '../Phonebook/Phonebook';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts-list')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.filter(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    ).length
      ? alert(`${newContact.name}: is already in contacts`)
      : setContacts([newContact, ...contacts]);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateFilter = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const filtredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Phonebook
        className={css.phonebook}
        onAddContact={addContact}
      ></Phonebook>
      <h2>Contacts</h2>
      <Filter className={css.filter} onFilter={updateFilter}></Filter>
      <Contacts
        className={css.contacts}
        contactsList={filtredContacts()}
        onDelete={handleDelete}
      ></Contacts>
    </div>
  );
};
