import endpoints
from endpoints import message_types
from endpoints import messages
from endpoints import remote

from resources.transactions_resource import TransactionResource
from resources.base_resource import BaseResource


class OverviewResponseItem(messages.Message):
    name = messages.StringField(1)
    outstanding_principal = messages.FloatField(2)
    outstanding_interest = messages.FloatField(3)
    paid_interest = messages.FloatField(4)
    paid_principal = messages.FloatField(5)
    date = messages.IntegerField(6)
    last_transaction_date = messages.IntegerField(7)


class OverviewResponse(messages.Message):
    items = messages.MessageField(OverviewResponseItem, 1, repeated=True)


class EchoApi(BaseResource):

    @endpoints.method(
        message_types.VoidMessage,
        OverviewResponse,
        path='overview',
        http_method='GET',
        name='transactions.add')
    def overview(self, request):
        mock_item_1 = OverviewResponseItem(name='Pavan', outstanding_principal=100000.0,
                                           outstanding_interest=5000.0, paid_interest=1000.0, paid_principal=0.0,
                                           date=1562259702, last_transaction_date=1562299702)
        mock_item_2 = OverviewResponseItem(name='Avinash', outstanding_principal=200000.0,
                                           outstanding_interest=15000.0, paid_interest=4000.0, paid_principal=25000.0,
                                           date=1563059702, last_transaction_date=1563159702)
        items = [mock_item_1, mock_item_2]
        return OverviewResponse(items=items)

api = endpoints.api_server([EchoApi, TransactionResource])
