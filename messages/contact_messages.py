from endpoints import messages


class ContactResponse(messages.Message):
    contact_id = messages.StringField(1)
    name = messages.StringField(2)
    phone_num = messages.StringField(3)
    address = messages.StringField(4)


class ContactCreateRequest(messages.Message):
    name = messages.StringField(1)
    phone_num = messages.StringField(2)
    address = messages.StringField(3)


class ContactUpdateRequest(messages.Message):
    name = messages.StringField(1)
    phone_num = messages.StringField(2)
    address = messages.StringField(3)


class ContactListResponse(messages.Message):
    items = messages.MessageField(ContactResponse, 1, repeated=True)
