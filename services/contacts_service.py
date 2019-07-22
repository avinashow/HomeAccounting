from models.contact_model import Contact
from datastores.contacts_store import ContactsStore


class ContactsService:

    def __init__(self):
        self.store = ContactsStore()

    def add_contact(self, user_id, name, phone_num, address):
        contact = Contact(user_id=user_id, name=name, phone_num=phone_num, address=address)
        self.store.create_contact(contact)
        return contact

    def update_contact(self, user_id, contact_id, name=None, phone_num=None, address=None):
        contact = self.store.get_contact(contact_id)

        if not contact.user_id == user_id:
            return False

        if name:
            contact.name= name

        if phone_num:
            contact.phone_num = phone_num

        if address:
            contact.amount = address

        self.store.update_contact(contact)
        return True

    def delete_contact(self, user_id, contact_id):
        contact = self.store.get_contact(contact_id)

        if not contact.user_id == user_id:
            return False

        self.store.delete_contact(contact)
        return True

    def list_contacts(self, user_id):
        return self.store.list_contacts(user_id)

