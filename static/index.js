Vue.component('manage-transactions', {
  template: '#manage-template',
  data: function() {
    return {
      summaryItems: [{
        "date": "1562259702", 
        "last_transaction_date": "1562299702", 
        "name": "Pavan", 
        "outstanding_interest": 5000.0, 
        "outstanding_principal": 100000.0, 
        "paid_interest": 1000.0
       }, 
       {
        "date": "1563059702", 
        "last_transaction_date": "1563159702", 
        "name": "Avinash", 
        "outstanding_interest": 15000.0, 
        "outstanding_principal": 200000.0, 
        "paid_interest": 4000.0
       }],
    }
  },
  created:function() {
		fetch('https://swapi.co/api/films/'+this.$route.params.id)
		.then(res => res.json())
		.then(res => {
			console.log(res);
			this.film = res;
		});
	},
});

const app = new Vue({
  el: '#app',
  data: {
    message: 'wecome to vue.js',
    currentView: 'manage-transactions',
  },
});