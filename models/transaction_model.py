from google.appengine.ext import ndb


class Transaction(ndb.Model):
    user_id = ndb.StringProperty(indexed=True)
    # transaction type - lent, payment
    type = ndb.StringProperty(indexed=True)
    # payment type - principal, interest, is populated only when transaction type is `payment`
    payment_type = ndb.StringProperty(indexed=True)
    amount = ndb.FloatProperty()
    transaction_date = ndb.DateProperty(indexed=True)
    borrower = ndb.KeyProperty()
    # populate only when transaction type is `lent`
    interest_rate = ndb.FloatProperty()
