import { userService } from '../_services/user.service';

export const Logout = Vue.component('Logout', {
    mounted: function() {
        userService.logout();
        window.auth2.signOut();
    }
})