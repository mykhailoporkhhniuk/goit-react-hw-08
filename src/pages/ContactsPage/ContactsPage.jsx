import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";

const ContactsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    return (
        <div className="wrapper">
            <h1>Phonebook</h1>
            <ContactForm />
            <SearchBox />
            <ContactList />
        </div>
    );
}

export default ContactsPage