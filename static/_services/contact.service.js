export const contactService = {
    addContact,
    getContacts
}

function getContacts() {
    return fetch(`/_ah/api/homac/v1/contacts?access_token=${localStorage.getItem('accessToken')}`, {});
}

function addContact(contactData) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
    };

    return fetch(`/_ah/api/homac/v1/contacts?access_token=${localStorage.getItem('accessToken')}`, requestOptions);
}