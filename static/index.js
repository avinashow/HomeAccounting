var gapi = gapi || {};

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: summary },
    { path: '/transactions', component: transactions },
    { path:'/editTransaction', name:'editTransaction', component: TransactionDetails }
  ]
})

const app = new Vue({
  el: '#app',
  router,
});

/* eslint-disable no-unused-vars */

// [START load_auth2_library]
function loadAuthClient () {
  gapi.load('auth2', initGoogleAuth);
}
// [END load_auth2_library]

// [START init_google_auth]
function initGoogleAuth (clientId = '763777367630-oq4km25h2jmff80so6gi5rmk2nsrjbav.apps.googleusercontent.com') {
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
// [END init_google_auth]

// [START user_signin]
function signIn () {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    document.getElementById('sign-in-btn').hidden = true;
    // document.getElementById('sign-out-btn').hidden = false;
    // document.getElementById('send-request-btn').disabled = false;
    events.$emit('on-load');
  }).catch(err => {
    document.getElementById('sign-in-btn').hidden = false;
    //console.log(err);
  });
}
// [END user_signin]

// [START send_sample_request]
// function sendSampleRequest (projectId = '763777367630-k4gunere1v41eal017djm47l6rtuvio5.apps.googleusercontent.com') {
//   var user = gapi.auth2.getAuthInstance().currentUser.get();
//   var idToken = user.getAuthResponse().id_token;
//   var endpoint = `https://${projectId}.appspot.com/_ah/api/echo/v1/email`;
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', endpoint + '?access_token=' + encodeURIComponent(idToken));
//   xhr.onreadystatechange = function () {
//     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//       window.alert(xhr.responseText);
//     }
//   };
//   xhr.send();
// }
// [END send_sample_request]

// [START user_signout]
function signOut () {
  gapi.auth2.getAuthInstance().signOut().then(() => {
    document.getElementById('sign-in-btn').hidden = false;
    document.getElementById('sign-out-btn').hidden = true;
    document.getElementById('send-request-btn').disabled = true;
  }).catch(err => {
    console.log(err);
  });
}