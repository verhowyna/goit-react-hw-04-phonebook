import css from './Filter.module.css';

export const Filter = ({ onFilter }) => {
  return (
    <label className={css.labelSearch}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        className={css.inputSearch}
        onChange={evt => onFilter(evt.target.value)}
      />
    </label>
  );
};
