from models.transaction_model import Transaction
from datastores.transactions_store import TransactionStore


class TransactionService:

    def __init__(self):
        self.store = TransactionStore()

    def add_transaction(self, user_id, transaction_type, payment_type,
                        amount, transaction_date, borrower, interest_rate):
        transaction = Transaction(user_id=user_id, type=transaction_type, payment_type=payment_type,
                                  amount=amount, transaction_date=transaction_date, borrower=borrower,
                                  interest_rate=interest_rate)
        self.store.create_transaction(transaction=transaction)
        return transaction

    def update_transaction(self, user_id, transaction_id, transaction_type=None, payment_type=None,
                           amount=None, transaction_date=None, borrower=None, interest_rate=None):
        transaction = self.store.get_transaction(transaction_id)

        if not transaction.user_id == user_id:
            return False

        if transaction_type:
            transaction.transaction_type = transaction_type

        if payment_type:
            transaction.payment_type = payment_type

        if amount:
            transaction.amount = amount

        if transaction_date:
            transaction.transaction_date = transaction_date

        if borrower:
            transaction.borrower = borrower

        if interest_rate:
            transaction.interest_rate = interest_rate

        self.store.update_transaction(transaction)
        return True

    def delete_transaction(self, user_id, transaction_id):
        transaction = self.store.get_transaction(transaction_id)

        if not transaction.user_id == user_id:
            return False

        self.store.delete_transaction(transaction)

        return True

    def list_transactions(self, user_id, borrower=None):
        return self.store.list_transactions(user_id, borrower)
