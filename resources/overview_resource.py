import endpoints
from endpoints import message_types
from endpoints import messages

from google.appengine.api import users
from resources.base_resource import BaseResource
from messages.overview_messages import *
from services.overview_service import OverviewService
from services.contacts_service import ContactsService
import logging


class OverviewResource(BaseResource):

    def __init__(self):
        self.overview_service = OverviewService()
        self.borrower_name_by_id = dict()
        self.contacts_service = ContactsService()

    @endpoints.method(
        message_types.VoidMessage,
        OverviewListResponse,
        path='overview',
        http_method='GET',
        name='overview')
    def overview(self, request):
        user_id = self.get_current_user_id()
        overview_list = self.overview_service.get_overview(user_id)

        overview_items = []
        for overview_data in overview_list:
            overview_items.append(self.get_overview_response_for_data(overview_data, user_id))

        return OverviewListResponse(items=overview_items)

    def get_overview_response_for_data(self, overview_data, user_id):
        borrower_name = self.contacts_service.get_contact(user_id, overview_data.borrower_id).name

        return OverviewResponse(borrower_name=borrower_name, outstanding_principal=overview_data.outstanding_principal,
                                outstanding_interest=overview_data.outstanding_interest,
                                paid_interest=overview_data.paid_interest, paid_principal=overview_data.paid_principal,
                                date=overview_data.date, last_transaction_date=overview_data.last_transaction_date,
                                borrower_id=overview_data.borrower_id)
