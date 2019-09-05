import endpoints
from services.transactions_service import TransactionsService
from messages.transaction_messages import *
from endpoints import message_types
from endpoints import messages

from google.appengine.api import users
from resources.base_resource import BaseResource


class TransactionResource(BaseResource):

    def __init__(self):
        self.transaction_service = TransactionsService()
        self.borrower_name_by_id = dict()

    @endpoints.method(
        TransactionCreateRequest,
        TransactionResponse,
        path='transactions',
        http_method='POST',
        name='transactions.add')
    def add(self, request):
        user_id = self.get_current_user_id()
        transaction_type = request.type
        payment_type = request.payment_type
        amount = request.amount
        transaction_date = request.transaction_date
        borrower = request.borrower_id
        interest_rate = request.interest_rate

        # TODO - verify that all required fields have valid values

        transaction = self.transaction_service.add_transaction(user_id=user_id, transaction_type=transaction_type,
                                                               borrower_id=borrower, payment_type=payment_type,
                                                               amount=amount, transaction_date=transaction_date,
                                                               interest_rate=interest_rate)
        return self.adapt_transaction_to_response(transaction)

    TRANSACTION_UPDATE_REQUEST = endpoints.ResourceContainer(
        TransactionUpdateRequest,
        transaction_id=messages.StringField(2, required=True)
    )

    @endpoints.method(
        TRANSACTION_UPDATE_REQUEST,
        TransactionResponse,
        path='transactions',
        http_method='PATCH',
        name='transactions.update')
    def update(self, request):
        user_id = self.get_current_user_id()
        transaction_type = request.type
        payment_type = request.payment_type
        amount = request.amount
        transaction_date = request.transaction_date
        borrower = request.borrower_id
        interest_rate = request.interest_rate

        # TODO - verify that all required fields have valid values

        transaction = self.transaction_service.update_transaction(user_id=user_id, transaction_id=request.transaction_id,
                                                                  transaction_type=transaction_type, payment_type=payment_type,
                                                                  amount=amount, transaction_date=transaction_date,
                                                                  borrower_id=borrower, interest_rate=interest_rate)

        return self.adapt_transaction_to_response(transaction)

    TRANSACTION_DELETE_REQUEST = endpoints.ResourceContainer(
        message_types.VoidMessage,
        transaction_id=messages.StringField(2, required=True)
    )

    @endpoints.method(
        TRANSACTION_DELETE_REQUEST,
        message_types.VoidMessage,
        path='transactions',
        http_method='DELETE',
        name='transactions.delete')
    def delete(self, request):
        user_id = self.get_current_user_id()
        self.transaction_service.delete_transaction(user_id=user_id, transaction_id=request.transaction_id)
        return message_types.VoidMessage()

    TRANSACTION_LIST_REQUEST = endpoints.ResourceContainer(
        message_types.VoidMessage,
        borrower=messages.StringField(2)
    )

    @endpoints.method(
        TRANSACTION_LIST_REQUEST,
        TransactionListResponse,
        path='transactions',
        http_method='GET',
        name='transactions.list')
    def list(self, request):
        user_id = self.get_current_user_id()
        transactions = self.transaction_service.list_transactions(user_id=user_id, borrower_id=request.borrower)

        transaction_responses = []

        for transaction in transactions:
            transaction_responses.append(self.adapt_transaction_to_response(transaction))

        return TransactionListResponse(items=transaction_responses)

    def adapt_transaction_to_response(self, transaction):
        transaction_response = TransactionResponse()
        transaction_response.transaction_id = transaction.key.urlsafe()
        transaction_response.amount = transaction.amount
        transaction_response.borrower_id = transaction.borrower.urlsafe()
        transaction_response.borrower_name = self.get_borrower_name(transaction)
        transaction_response.interest_rate = transaction.interest_rate
        transaction_response.payment_type = transaction.payment_type
        transaction_response.type = transaction.type
        transaction_response.transaction_date = transaction.transaction_date
        return transaction_response

    def get_borrower_name(self, transaction):
        borrower_id = transaction.borrower.id()
        if borrower_id not in self.borrower_name_by_id:
            self.borrower_name_by_id[borrower_id] = transaction.borrower.get().name
        return self.borrower_name_by_id[borrower_id]
