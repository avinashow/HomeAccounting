from datastores.transactions_store import TransactionsStore
from datastores.contacts_store import ContactsStore
import time
import datetime


class OverviewData:

    def __init__(self, outstanding_interest, outstanding_principal, paid_interest,
                 paid_principal, date, last_transaction_date, borrower_id):
        self.outstanding_interest = outstanding_interest
        self.outstanding_principal = outstanding_principal
        self.paid_interest = paid_interest
        self.paid_principal = paid_principal
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
            overview_data = self.get_overview_data_for_transactions(transactions, borrower_id)

            if not overview_data:
                continue

            overview_data.borrower_id = borrower_id
            overview_data.borrower_name = contact_by_id.get(borrower_id).name
            overview_data_list.append(overview_data)

        return overview_data_list

    def get_overview_data_for_transactions(self, transactions, borrower_id):
        transaction_start_index = self.get_transaction_start_index(transactions)
        if transaction_start_index > len(transactions):
            return None
        paid_interest = 0.0
        paid_principal = 0.0
        total_principal = 0.0
        total_interest = 0.0
        latest_interest_rate = 0.0
        for transaction in transactions:
            if transaction.type == 'payback' and transaction.payment_type == 'interest':
                paid_interest += transaction.amount
            elif transaction.type == 'payback' and transaction.payment_type == 'principal':
                paid_principal += transaction.amount
                total_interest -= (transaction.amount / 100.0) * latest_interest_rate * \
                    self.get_months(transaction.transaction_date, int(time.time()))
            elif transaction.type == 'lend':
                latest_interest_rate = transaction.interest_rate
                total_principal += transaction.amount
                total_interest += (transaction.amount / 100.0) * latest_interest_rate * \
                    self.get_months(transaction.transaction_date, int(time.time()))

        outstanding_interest = total_interest - paid_interest
        outstanding_principal = total_principal - paid_principal
        paid_interest = paid_interest
        paid_principal = paid_principal
        date = transactions[transaction_start_index].transaction_date
        last_transaction_date = transactions[-1].transaction_date
        borrower_id = borrower_id

        overview_data = OverviewData(outstanding_interest=outstanding_interest,
                                     outstanding_principal=outstanding_principal,
                                     paid_interest=paid_interest, paid_principal=paid_principal, date=date,
                                     last_transaction_date=last_transaction_date, borrower_id=borrower_id)

        return overview_data

    @staticmethod
    def get_months(start_epoch, end_epoch):
        start_date = datetime.datetime.fromtimestamp(start_epoch)
        end_date = datetime.datetime.fromtimestamp(end_epoch)

        return (float((end_date - start_date).days) * 12.0) / 365.0

    @staticmethod
    def get_transaction_start_index(transactions):
        transaction_index = 0
        principal_total = 0
        transaction_start_index = 0

        while transaction_index < len(transactions):
            transaction = transactions[transaction_index]
            is_principal_transaction = False
            if transaction.type == 'lend':
                is_principal_transaction = True
                principal_total += transaction.amount
            elif transaction.type == 'payback' and transaction.payment_type == 'principal':
                is_principal_transaction = True
                principal_total -= transaction.amount
            if is_principal_transaction and principal_total == 0:
                transaction_start_index = transaction_index + 1
            transaction_index += 1

        return transaction_start_index
