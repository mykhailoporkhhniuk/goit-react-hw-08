import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact"
import css from "./ContactList.module.css"

import { useSelector } from 'react-redux';

const ContactList = () => {
    const filteredContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.contactList}>
            {filteredContacts.map(({ id, name, number }) => {
                return (
                    <li key={id}>
                        <Contact
                            name={name}
                            number={number}
                            id={id}
                        />
                    </li>
                )
            })}
        </ul>
    );
}

export default ContactList