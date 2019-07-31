import { router } from './router.js';

let gapi = gapi || {};

const app = new Vue({
  el: '#app',
  router,
});