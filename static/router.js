import { LoginPage } from './components/Login.js';
import { SummaryPage } from './components/overview.js';
import { TransactionPage } from './components/Transactions-list/transactions.component.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
      
      { path:'/login', name:'Login', component: LoginPage },
      { path: '/', component: SummaryPage },
      { path: '/transactions', component: TransactionPage },

      { path:'/*', redirect:'/login' },
    ]
  })

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = window.localStorage.getItem('accessToken');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
});