import {userService} from '../_services/user.service.js';

export const LoginPage = Vue.component('Login', {
    render (createElement) {
        return createElement('button', {
          attrs: {
            class: 'g-signin-button btn btn-primary'
          },
          domProps: {
            innerHTML: 'sign-in'
          },
          ref: 'signinBtn'
        }, this.$slots.default)
    },
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

            const auth2 = window.gapi.auth2.init(this.params);

            auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
                userService.login(googleUser);
              }, error => {
                this.$emit('error', error)
                this.$emit('failure', error) // an alias
              })

        });
    },
    created: function() {
        //window.gapi.load('auth2', this.initGoogleAuth(this.clientId));
    }
});