from endpoints import messages


class OverviewResponse(messages.Message):
    borrower_name = messages.StringField(1)
    outstanding_principal = messages.FloatField(2)
    outstanding_interest = messages.FloatField(3)
    paid_interest = messages.FloatField(4)
    paid_principal = messages.FloatField(5)
    date = messages.IntegerField(6)
    last_transaction_date = messages.IntegerField(7)
    borrower_id = messages.StringField(8)


class OverviewListResponse(messages.Message):
    items = messages.MessageField(OverviewResponse, 1, repeated=True)