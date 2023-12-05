import { nanoid } from 'nanoid';
import css from './Filter.module.css';

export const Filter = ({ value, onFilter }) => {
  return (
    <label className={css.labelSearch}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        className={css.inputSearch}
        id={nanoid()}
        value={value}
        onChange={onFilter}
      />
    </label>
  );
};
