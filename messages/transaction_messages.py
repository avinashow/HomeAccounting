from endpoints import message_types
from endpoints import messages


class TransactionResponse(messages.Message):
    type = messages.StringField(1)
    payment_type = messages.StringField(2)
    amount = messages.FloatField(3)
    transaction_date = messages.IntegerField(4)
    borrower_id = messages.StringField(5)
    borrower_name = messages.StringField(6)
    interest_rate = messages.FloatField(7)
    transaction_id = messages.StringField(8)


class TransactionCreateRequest(messages.Message):
    type = messages.StringField(1)
    payment_type = messages.StringField(2)
    amount = messages.FloatField(3)
    transaction_date = messages.IntegerField(4)
    borrower_id = messages.StringField(5)
    interest_rate = messages.FloatField(6)


class TransactionUpdateRequest(messages.Message):
    type = messages.StringField(1)
    payment_type = messages.StringField(2)
    amount = messages.FloatField(3)
    transaction_date = messages.IntegerField(4)
    borrower_id = messages.StringField(5)
    interest_rate = messages.FloatField(6)


class TransactionListResponse(messages.Message):
    items = messages.MessageField(TransactionResponse, 1, repeated=True)
