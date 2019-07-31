import { LoginPage } from './components/Login.js';
import { SummaryPage } from './components/overview.js';
import { TransactionPage } from './components/transactions.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
      
      { path:'/login', name:'Login', component: LoginPage },
      { path: '/', component: SummaryPage },
      { path: '/transactions', component: TransactionPage },
      //{ path:'/editTransaction', name:'editTransaction', component: TransactionDetails }

      { path:'*', redirect:'/login' },
    ]
  })

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('accessToken');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
});