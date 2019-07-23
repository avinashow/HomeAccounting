import endpoints

from resources.overview_resource import OverviewResource
from resources.transaction_resource import TransactionResource
from resources.contact_resource import ContactResource
from resources.base_resource import BaseResource

from google.appengine.api import users
from flask import Flask, redirect, request, url_for

app = Flask(__name__)


@app.route('/login')
def login():
    user = users.get_current_user()
    if not user:
        login_url = users.create_login_url('/')
        return redirect(login_url)
    return redirect('/')

api = endpoints.api_server([OverviewResource, TransactionResource, ContactResource])
