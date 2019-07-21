Vue.component('manage-transactions', {
  template: '#summary-template',
  data: function() {
    return {
      summaryItems: [],
      headers: [
        'name',
        'paid principal',
        'paid interest',
        'outstanding principal',
        'outstanding interest',
        'last transaction date',
        'date'
      ],
      title: 'Overview',
    }
  },
  methods: {
    formatDate: function(dateStr) {
      return moment(new Date(parseInt(dateStr) * 1000)).format('MM/DD/YYYY');
    },
    formatLabel: function(value) {
      let inputArr = value.split('_');
      inputArr[0] = inputArr[0].charAt(0).toUpperCase() + inputArr[0].slice(1);
      return inputArr.join(' ');
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