from datastores.transactions_store import TransactionsStore
from datastores.contacts_store import ContactsStore


class OverviewData:

    def __init__(self, outstanding_interest, outstanding_principal, paid_interest,
                 paid_principal, borrower_name, date, last_transaction_date, borrower_id):
        self.outstanding_interest = outstanding_interest
        self.outstanding_principal = outstanding_principal
        self.paid_interest = paid_interest
        self.paid_principal = paid_principal
        self.borrower_name = borrower_name
        self.date = date
        self.last_transaction_date = last_transaction_date
        self.borrower_id = borrower_id


class OverviewService:

    def __init__(self):
        self.transactions_store = TransactionsStore()
        self.contacts_store = ContactsStore()

    def get_overview(self, user_id, borrower=None):
        borrower_key = None
        if borrower:
            borrower_key = self.contacts_store.get_contact(borrower).key

        sorted_transactions = self.transactions_store.list_transactions(user_id=user_id, borrower=borrower_key)

        transactions_by_borrower = dict()

        for transaction in sorted_transactions:
            borrower_id = transaction.borrower.urlsafe()
            if borrower_id not in transactions_by_borrower:
                transactions_by_borrower[borrower_id] = []
            transactions_by_borrower[borrower_id].append(transaction)

        contact_by_id = dict()
        all_contacts = self.contacts_store.list_contacts(user_id)
        for contact in all_contacts:
            contact_by_id[contact.key.urlsafe()] = contact

        overview_data_list = []
        for borrower_id, transactions in transactions_by_borrower.iteritems():
            overview_data = self.get_overview_data_for_transactions(transactions)
            overview_data.borrower_id = borrower_id
            overview_data.borrower_name = contact_by_id.get(borrower_id).name
            overview_data_list.append(overview_data)

        return overview_data_list

    @staticmethod
    def get_overview_data_for_transactions(transactions):
        # TODO
        return ''
