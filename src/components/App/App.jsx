import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Phonebook } from '../Phonebook/Phonebook';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = window.localStorage.getItem('contacts-list');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      window.localStorage.setItem(
        'contacts-list',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = values => {
    const { contacts } = this.state;

    const checkContact = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    checkContact
      ? alert(`${values.name} is already in contacts`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, { ...values, id: nanoid() }],
          };
        });
  };

  updateFilter = value => {
    this.setState({
      filter: value,
    });
  };

  handleDelete = contactId => {
    const newContactsList = this.state.contacts.filter(
      contact => contact.id !== contactId
    );

    this.setState({
      contacts: newContactsList,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Phonebook
          className={css.phonebook}
          onAddContact={this.addContact}
        ></Phonebook>
        <h2>Contacts</h2>
        <Filter className={css.filter} onFilter={this.updateFilter}></Filter>
        <Contacts
          className={css.contacts}
          contactsList={filtredContacts}
          onDelete={this.handleDelete}
        ></Contacts>
      </div>
    );
  }
}
