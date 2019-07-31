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

function loadAuthClient() {
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
}