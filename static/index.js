Vue.component('manage-transactions', {
  template: '#summary-template',
  data: function() {
    return {
      summaryItems: [],
      totalInterest: 0,
      totalPrincipal: 0,
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
    },
    calculateTotalPrincipal() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total += parseint(item.outstanding_principal) + parseint(item.paid_principal);
      });
      this.totalPrincipal = total;
      return total;
    },
    calculateTotalInterest() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total += parseint(item.outstanding_interest) + parseint(item.paid_interest);
      });
      this.totalInterest = total;
      return total;
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