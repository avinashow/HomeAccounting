import endpoints
from services.transactions_service import TransactionService
from messages.transaction_messages import *

from google.appengine.api import users
from resources.base_resource import BaseResource


class TransactionResource(BaseResource):

    def __init__(self):
        self.transaction_service = TransactionService()
        self.borrower_name_by_id = dict()

    @endpoints.method(
        TransactionCreateRequest,
        TransactionResponse,
        path='transactions',
        http_method='GET')
    def add(self, transaction_type, borrower, payment_type,
            amount, transaction_date, interest_rate):
        user_id = self.get_current_user_id()

        # TODO - verify that all required fields have valid values

        transaction = self.transaction_service.add_transaction(user_id=user_id, transaction_type=transaction_type,
                                                               borrower=borrower, payment_type=payment_type,
                                                               amount=amount, transaction_date=transaction_date,
                                                               interest_rate=interest_rate)
        return self.adapt_transaction_to_response(transaction)

    def update(self, transaction_id, transaction_type=None, payment_type=None,
               amount=None, transaction_date=None, borrower=None, interest_rate=None):
        user_id = self.get_current_user_id()

        # TODO - verify that all required fields have valid values

        self.transaction_service.update_transaction(user_id=user_id, transaction_id=transaction_id,
                                                    transaction_type=transaction_type, payment_type=payment_type,
                                                    amount=amount, transaction_date=transaction_date,
                                                    borrower=borrower, interest_rate=interest_rate)

    def delete(self, transaction_id):
        user_id = self.get_current_user_id()
        self.transaction_service.delete_transaction(user_id=user_id, transaction_id=transaction_id)

    def list(self, borrower=None):
        user_id = self.get_current_user_id()
        transactions = self.transaction_service.list_transactions(user_id=user_id, borrower=borrower)

        transaction_responses = []

        for transaction in transactions:
            transaction_responses.append(self.adapt_transaction_to_response(transaction))

        return TransactionListResponse(items=transaction_responses)

    @staticmethod
    def get_current_user_id():
        return users.get_current_user().user_id()

    def adapt_transaction_to_response(self, transaction):
        transaction_response = TransactionResponse()
        transaction_response.amount = transaction.amount
        transaction_response.borrower_id = transaction.borrower.urlsafe()
        transaction_response.borrower_name = self.borrower_name_by_id.get(transaction.borrower.urlsafe())
        transaction_response.interest_rate = transaction.interest_rate
        transaction_response.payment_type = transaction.payment_type
        transaction_response.type = transaction.type
        transaction_response.transaction_date = transaction.transaction_date
