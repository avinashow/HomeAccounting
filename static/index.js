Vue.component('manage-transactions', {
  template: '#summary-template',
  data: function() {
    return {
      summaryItems: [],
       title: 'Overview',
    }
  },
  methods: {
    formatDate: function(dateStr) {
      return moment(new Date(parseInt(dateStr) * 1000)).format('MM/DD/YYYY');
    }
  },
  created: function() {
		fetch('/_ah/api/homac/v1/overview')
		.then(response => response.json())
		.then(response => {
			this.summaryItems = response.items;
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