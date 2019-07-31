export const userService = {
    login,
    logout
}

function login(user) {
    //var user = gapi.auth2.getAuthInstance().currentUser.get();
    var idToken = user.getAuthResponse().id_token;
    localStorage.setItem('accessToken', encodeURIComponent(idToken));
}

function logout() {
    localStorage.removeItem('accessToken');
}