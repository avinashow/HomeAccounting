const List = Vue.Component('List',{
  template: `
    <h1> welcome to home page</h1>
  `,
  data: function() {
    return {
      message: 'welcome to vue'
    }
  },
})
const router = new VueRouter({
	routes:[
		{
			path:'/',
			component:List,
		},
	]
});

const app = new Vue({
  el: '#app',
  router,
});