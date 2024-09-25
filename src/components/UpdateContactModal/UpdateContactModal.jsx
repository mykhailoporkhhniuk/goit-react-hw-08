import Modal from "react-modal";
import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from 'yup'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

import css from './UpdateContactModal.module.css'
import { updateContact } from "../../redux/contacts/operations";

Modal.setAppElement("#root");

const UpdateContactModal = ({ contactId, isOpenModal, setIsOpenModal }) => {
    const dispatch = useDispatch();
    const closeModal = () => {
        setIsOpenModal(false);
    }

        const onUpdateContact = (contactValues) => {
        dispatch(updateContact(contactValues))
            .unwrap()
            .then(() => toast.success("Contact updated successfully"));
    };

    const INITIALVALUES = {
        contactName: "",
        contactNumber: "",
    }

    const handleSubmit = (values, actions) => {
        const contactValues = {
            name: values.contactName,
            number: values.contactNumber,
            contactId: contactId,
        };

        closeModal();

        onUpdateContact(contactValues);

        actions.resetForm();
    }

    const FeedbackSchema = Yup.object().shape({
        contactName: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        contactNumber: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required")
    });

    return (
        <Modal
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    backgroundColor: "rgba(000, 000, 000, 0.7)",
                },
                content: {
                    height: "25%",
                    width: "20%",
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
            closeTimeoutMS={200}
        >
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
                    <button type="Submit">Update contact</button>
                    <Toaster />
                </Form>
            </Formik>
        </Modal>
    )
};

export default UpdateContactModal