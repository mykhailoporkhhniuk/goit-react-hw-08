import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from 'yup'
import toast, { Toaster } from "react-hot-toast";
import css from './ContactForm.module.css'
import { useDispatch } from 'react-redux';
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
    const dispatch = useDispatch();

    const onAddContact = (contactValues) => {
        dispatch(addContact(contactValues))
            .unwrap()
            .then(() => toast.success("Contact added successfully"));
    };

    const INITIALVALUES = {
        contactName: "",
        contactNumber: "",
    }

    const handleSubmit = (values, actions) => {
        const contactValues = {
            name: values.contactName,
            number: values.contactNumber,
        };

        onAddContact(contactValues);

        actions.resetForm();
    }

    const FeedbackSchema = Yup.object().shape({
        contactName: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        contactNumber: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required")
    });


    return (
        <Formik
            initialValues={INITIALVALUES}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
        >
            <Form className={css.form}>
                <label>
                    Name
                    <Field className={css.formInput} type="text" name="contactName"></Field>
                    <ErrorMessage className={css.err} name="contactName" component="span" />
                </label>
                <label>
                    Number
                    <Field className={css.formInput} type="tell" name="contactNumber"></Field>
                    <ErrorMessage className={css.err} name="contactNumber" component="span" />
                </label>
                <button type="Submit">Add contact</button>
                <Toaster />
            </Form>
        </Formik>
    );
}

export default ContactForm