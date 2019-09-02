from models.contact_model import Contact
from google.appengine.ext import ndb


class ContactsStore:

    def __init__(self):
        pass

    @staticmethod
    def create_contact(contact):
        contact.put()

    @staticmethod
    def delete_contact(contact):
        ndb.delete_multi([contact.key])

    @staticmethod
    def update_contact(contact):
        contact.put()

    @staticmethod
    def get_contact(contact_id):
        return ndb.Key(urlsafe=contact_id).get()

    @staticmethod
    def list_contacts(user_id):
        query = Contact.query().filter(Contact.user_id == user_id)

        return query.fetch()


