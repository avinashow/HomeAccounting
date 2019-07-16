import endpoints
from endpoints import message_types
from endpoints import messages
from endpoints import remote

class EchoRequest(messages.Message):
    message = messages.StringField(1)


class EchoResponse(messages.Message):
    """A proto Message that contains a simple string field."""
    message = messages.StringField(1)


ECHO_RESOURCE = endpoints.ResourceContainer(
    EchoRequest,
    n=messages.IntegerField(2, default=1))

@endpoints.api(name='echo', version='v1')
class EchoApi(remote.Service):

    @endpoints.method(
        ECHO_RESOURCE,
        EchoResponse,
        path='echo',
        http_method='GET',
        name='echo')
    def echo(self, request):
        output_message = ' '.join([request.message] * request.n)
        return EchoResponse(message=output_message)

api = endpoints.api_server([EchoApi])