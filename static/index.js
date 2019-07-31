import { router } from './router.js';

let gapi = gapi || {};

/*let accessToken = () => {
  var user = gapi.auth2.getAuthInstance().currentUser.get();
  var idToken = user.getAuthResponse().id_token;
  return encodeURIComponent(idToken);
};*/

const app = new Vue({
  el: '#app',
  router,
});

/*function loadAuthClient() {
  gapi.load('auth2', initGoogleAuth);
}

function initGoogleAuth(clientId = '763777367630-oq4km25h2jmff80so6gi5rmk2nsrjbav.apps.googleusercontent.com') {
  gapi.auth2.init({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  }).then(() => {
    document.getElementById('sign-in-btn').hidden = true;
    signIn();
  }).catch(err => {
    console.log(err);
  });
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    document.getElementById('sign-in-btn').hidden = true;
    events.$emit('on-load');
  }).catch(err => {
    document.getElementById('sign-in-btn').hidden = false;
    //console.log(err);
  });
}*/