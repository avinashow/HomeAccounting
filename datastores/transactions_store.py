from models.transaction_model import Transaction
from google.appengine.ext import ndb

class TransactionStore:

    def __init__(self):
        pass

    def create_transaction(self, transaction):
        transaction.put()

    def delete_transaction(self, transaction):
        ndb.multi_delete([transaction])

    def update_transaction(self, transaction):
        transaction.put()

    def get_transaction(self, transaction_id):
        return Transaction.get_by_id(transaction_id)

    def list_transactions(self, user_id, borrower=None):
        query = Transaction.query().filter(Transaction.user_id == user_id)
        if borrower:
            query = query.filter(Transaction.borrower == borrower)

        return query.fetch()


