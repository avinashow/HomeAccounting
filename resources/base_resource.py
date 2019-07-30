import endpoints


@endpoints.api(name='homac',
               version='v1',
               audiences=['763777367630-oq4km25h2jmff80so6gi5rmk2nsrjbav.apps.googleusercontent.com'],
               allowed_client_ids=['763777367630-oq4km25h2jmff80so6gi5rmk2nsrjbav.apps.googleusercontent.com'])
class BaseResource(endpoints.remote.Service):

    @staticmethod
    def get_current_user_id():
        return endpoints.get_current_user().email()
