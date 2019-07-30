import endpoints
from services.contacts_service import ContactsService
from messages.contact_messages import *
from endpoints import message_types
from endpoints import messages

from google.appengine.api import users
from resources.base_resource import BaseResource


class ContactResource(BaseResource):

    def __init__(self):
        self.contacts_service = ContactsService()
        self.borrower_name_by_id = dict()

    @endpoints.method(
        ContactCreateRequest,
        ContactResponse,
        path='contacts',
        http_method='POST',
        name='contacts.add')
    def add(self, request):
        user_id = self.get_current_user_id()
        name = request.name
        phone_num = request.phone_num
        address = request.address

        # TODO - verify that all required fields have valid values

        contact = self.contacts_service.add_contact(user_id=user_id, name=name,
                                                    phone_num=phone_num, address=address)
        return self.adapt_contact_to_response(contact)

    CONTACT_UPDATE_REQUEST = endpoints.ResourceContainer(
        ContactUpdateRequest,
        contact_id=messages.StringField(2, required=True)
    )

    @endpoints.method(
        CONTACT_UPDATE_REQUEST,
        ContactResponse,
        path='contacts',
        http_method='PATCH',
        name='contacts.update')
    def update(self, request):
        user_id = self.get_current_user_id()
        name = request.name
        phone_num = request.phone_num
        address = request.address

        # TODO - verify that all required fields have valid values

        self.contacts_service.update_contact(user_id=user_id, contact_id=request.contact_id,
                                             name=name, phone_num=phone_num, address=address)

    CONTACT_DELETE_REQUEST = endpoints.ResourceContainer(
        message_types.VoidMessage,
        contact_id=messages.StringField(2, required=True)
    )

    @endpoints.method(
        CONTACT_DELETE_REQUEST,
        message_types.VoidMessage,
        path='contacts',
        http_method='DELETE',
        name='contacts.delete')
    def delete(self, request):
        user_id = self.get_current_user_id()
        self.contacts_service.delete_contact(user_id=user_id, contact_id=request.contact_id)

    @endpoints.method(
        message_types.VoidMessage,
        ContactListResponse,
        path='contacts',
        http_method='GET',
        name='contacts.list')
    def list(self, request):
        user_id = self.get_current_user_id()
        contacts = self.contacts_service.list_contacts(user_id=user_id)

        contact_responses = []

        for contact in contacts:
            contact_responses.append(self.adapt_contact_to_response(contact))

        return ContactListResponse(items=contact_responses)

    @staticmethod
    def adapt_contact_to_response(contact):
        contact_response = ContactResponse()
        contact_response.contact_id = contact.key.urlsafe()
        contact_response.name = contact.name
        contact_response.phone_num = contact.phone_num
        contact_response.address = contact.address
        return contact_response

    def get_borrower_name(self, transaction):
        borrower_id = transaction.borrower.id()
        if borrower_id not in self.borrower_name_by_id:
            self.borrower_name_by_id[borrower_id] = transaction.borrower.get().name
        return self.borrower_name_by_id[borrower_id]
