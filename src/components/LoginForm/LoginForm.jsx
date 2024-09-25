import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";

import { useDispatch } from "react-redux";

import { login } from "../../redux/auth/operations";

const initValues = {
  email: "",
  password: "",
};

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Min 8 symbols")
    .max(30, "Max 30 symbols"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.formLabel}>
          <span className={css.formText}>Email</span>
          <Field className={css.formData} type="text" name="email" />
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
        </label>
        <label className={css.formLabel}>
          <span className={css.formText}>Password</span>
          <Field className={css.formData} type="password" name="password" />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </label>
        <button type="submit" className={css.formBtn}>
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;