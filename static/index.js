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
    formatCurrency: function(number) {
      if (!number) {
        number = 0;
      }
      number = parseInt(number);
      return number.toLocaleString('en-IN', { style:'currency',currency: 'INR' });
    },
    formatLabel: function(value) {
      let inputArr = value.split('_');
      inputArr[0] = inputArr[0].charAt(0).toUpperCase() + inputArr[0].slice(1);
      return inputArr.join(' ');
    },
    calculateTotalOutstandingPrincipal() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total += parseInt(item.outstanding_principal);
      });
      return this.formatCurrency(total);
    },
    calculateTotalOutstandingInterest() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total += parseInt(item.outstanding_interest);
      });
      return this.formatCurrency(total);
    },
    calculateTotalPaidInterest() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total +=  parseInt(item.paid_interest);
      });
      return this.formatCurrency(total);
    },
    calculateTotalPaidPrincipal() {
      let total = 0;
      this.summaryItems.forEach(function(item) {
        total += parseInt((item.paid_principal) ? item.paid_principal : 0);
      });
      return this.formatCurrency(total);
    },
  },
  created: function() {
		fetch('/_ah/api/homac/v1/overview')
      .then(response => response.json())
      .then(response => {
        this.summaryItems = response.items;
      }).catch(function(error) {
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