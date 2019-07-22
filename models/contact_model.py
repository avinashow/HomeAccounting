from google.appengine.ext import ndb


class Contact(ndb.Model):
    user_id = ndb.StringProperty(indexed=True)
    name = ndb.StringProperty()
    phone_num = ndb.StringProperty()
    address = ndb.StringProperty()
