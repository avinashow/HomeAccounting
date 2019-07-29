const serverBus = new Vue();
let currentView = 'manage-transactions';

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