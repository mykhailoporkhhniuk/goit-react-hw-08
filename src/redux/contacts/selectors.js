import { createSelector } from "@reduxjs/toolkit";
import { selectFilterValue } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilterValue],
    (contacts, filterValue) => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }
)