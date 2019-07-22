import endpoints
from endpoints import message_types
from endpoints import messages

from google.appengine.api import users
from resources.base_resource import BaseResource
from messages.overview_messages import *


class OverviewResource(BaseResource):

    @endpoints.method(
        message_types.VoidMessage,
        OverviewListResponse,
        path='overview',
        http_method='GET',
        name='overview')
    def overview(self, request):
        mock_item_1 = OverviewResponse(borrower_name='Pavan', outstanding_principal=100000.0,
                                       outstanding_interest=5000.0, paid_interest=1000.0, paid_principal=0.0,
                                       date=1562259702, last_transaction_date=1562299702)
        mock_item_2 = OverviewResponse(borrower_name='Avinash', outstanding_principal=200000.0,
                                       outstanding_interest=15000.0, paid_interest=4000.0, paid_principal=25000.0,
                                       date=1563059702, last_transaction_date=1563159702)
        items = [mock_item_1, mock_item_2]
        return OverviewListResponse(items=items)
