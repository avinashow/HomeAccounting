from models.transaction_model import Transaction
from google.appengine.ext import ndb


class TransactionsStore:

    def __init__(self):
        pass

    @staticmethod
    def create_transaction(transaction):
        transaction.put()

    @staticmethod
    def delete_transaction(transaction):
        ndb.delete_multi([transaction.key])

    @staticmethod
    def update_transaction(transaction):
        transaction.put()

    @staticmethod
    def get_transaction(transaction_id):
        return ndb.Key(urlsafe=transaction_id).get()

    '''Returns list of transactions sorted by date'''
    @staticmethod
    def list_transactions(user_id, borrower=None):
        query = Transaction.query().filter(Transaction.user_id == user_id)
        if borrower:
            query = query.filter(Transaction.borrower == borrower)

        return query.fetch()


