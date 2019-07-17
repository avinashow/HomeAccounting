from google.appengine.ext import ndb


class Contact(ndb.Model):
    name = ndb.StringProperty()
    phone_num = ndb.StringProperty()
    address = ndb.StringProperty(default=None)