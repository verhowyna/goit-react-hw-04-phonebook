import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './Phonebook.module.css';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'The name must be at least 3 characters long')
    .required('Please enter a name'),
  number: Yup.string()
    .matches(/^(\d{3}-\d{2}-\d{2})$/, 'Please enter 7 digit as 123-45-67)')
    .required('Please enter a number'),
});

export const Phonebook = ({ onAddContact }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        onAddContact(values);
        actions.resetForm();
      }}
    >
      <Form className={css.formList} autoComplete="off">
        <label className={css.label}>
          Name
          <Field
            type="text"
            name="name"
            className={css.inputName}
            placeholder="Rosie Simpson"
          />
          <ErrorMessage className={css.message} name="name" component="div" />
        </label>
        <label className={css.label}>
          Number
          <Field
            type="tel"
            name="number"
            className={css.inputNumber}
            placeholder="123-45-67"
          />
          <ErrorMessage name="number" component="div" />
        </label>
        <button className={css.submitButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
