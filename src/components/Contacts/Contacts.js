import css from './Contacts.module.css';

export const Contacts = ({ contactsList, onDelete }) => {
  return (
    <ul>
      {contactsList.map(contact => {
        return (
          <li className={css.contact} key={contact.id}>
            <span className={css.name}>{contact.name}:</span>
            <span className={css.number}>{contact.number}</span>
            <button
              className={css.buttonDelete}
              type="button"
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
