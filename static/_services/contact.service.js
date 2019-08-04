export const contactService = {
    addContact,
    getContacts
}

function getContacts() {

}

function addContact(formData) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        formData,
    };

    return fetch(`/_ah/api/homac/v1/contacts?access_token=${localStorage.getItem('accessToken')}`, requestOptions);
}