const events = new Vue({});

function getAccessToken() {
    var user = gapi.auth2.getAuthInstance().currentUser.get();
    var idToken = user.getAuthResponse().id_token;
    return encodeURIComponent(idToken);
}