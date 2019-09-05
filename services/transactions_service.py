from models.transaction_model import Transaction
from datastores.transactions_store import TransactionsStore
from datastores.contacts_store import ContactsStore


class TransactionsService:

    def __init__(self):
        self.store = TransactionsStore()
        self.contact_store = ContactsStore()

    def add_transaction(self, user_id, transaction_type, payment_type,
                        amount, transaction_date, borrower_id, interest_rate):
        borrower_key = self.get_borrower_key(borrower_id)
        transaction = Transaction(user_id=user_id, type=transaction_type, payment_type=payment_type,
                                  amount=amount, transaction_date=transaction_date, borrower=borrower_key,
                                  interest_rate=interest_rate)
        self.store.create_transaction(transaction=transaction)
        return transaction

    def update_transaction(self, user_id, transaction_id, transaction_type=None, payment_type=None,
                           amount=None, transaction_date=None, borrower_id=None, interest_rate=None):
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

        if borrower_id:
            transaction.borrower = self.get_borrower_key(borrower_id)

        if interest_rate:
            transaction.interest_rate = interest_rate

        self.store.update_transaction(transaction)
        return transaction

    def delete_transaction(self, user_id, transaction_id):
        transaction = self.store.get_transaction(transaction_id)

        if not transaction.user_id == user_id:
            return False

        self.store.delete_transaction(transaction)

        return True

    def list_transactions(self, user_id, borrower_id=None):
        return self.store.list_transactions(user_id, self.get_borrower_key(borrower_id))

    def get_borrower_key(self, borrower_id):
        if not borrower_id:
            return None
        return self.contact_store.get_contact(borrower_id).key

