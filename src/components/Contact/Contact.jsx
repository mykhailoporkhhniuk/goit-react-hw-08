import css from './Contact.module.css'

import { deleteContact } from "../../redux/contacts/operations";

import { useDispatch } from 'react-redux';
import { toast, Toaster } from "react-hot-toast";
import { useState } from 'react';
import UpdateContactModal from '../UpdateContactModal/UpdateContactModal';

const Contact = ({ name, number, id }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useDispatch();

    const onDeleteContact = (contactId) => {
        dispatch(deleteContact(contactId))
            .unwrap()
            .then(() => toast.success("Contact deleted successfully"));
    };

    const onOpenModal = (contactId) => {
        setIsOpenModal(true);
    };

    return (
        <div className={css.contactWrapper}>
            <div className={css.infoWrapper}>
                <p>👤 {name}</p>
                <p>📞 {number}</p>
            </div>
            <button type="button" onClick={() => onOpenModal(id)}>Update</button>
            <button type="button" onClick={() => onDeleteContact(id)}>Delete</button>
            <Toaster />
            <UpdateContactModal contactId={id} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        </div>
    );
}

export default Contact