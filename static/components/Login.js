import {userService} from '../_services/user.service.js';

export const LoginPage = Vue.component('Login', {
    template:'<div></div>',
    data: () => {
        return {
            params: {
                client_id: '763777367630-oq4km25h2jmff80so6gi5rmk2nsrjbav.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/userinfo.email'
            }
        }
    },
    methods: {
        err: (msg) => {
            console.log(msg);
        }
    },
    mounted: function() {
        if (!window.gapi) {
            this.err('"https://apis.google.com/js/api:platform.js" needs to be included as a <script>.')
            return;
        }

        window.gapi.load('auth2', () => {

            window.gapi.auth2.init(this.params)
                .then(() => {
                    window.gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
                        userService.login(googleUser);
                      }).catch(err => {
                        document.getElementById('sign-in-btn').hidden = false;
                        //console.log(err);
                      });
                })
                .catch(error => {

                });

        });
    },
});