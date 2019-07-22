Vue.component('manage-transactions', {
    template:`
    <div>
        <h1>{{title}}</h1>
        <span>
            <strong>Total outstanding principal:</strong> {{ calculateTotalOutstandingPrincipal() }}
        </span>
        <span>
            <strong>Total paid principal:</strong> {{ calculateTotalPaidPrincipal() }}
        </span>
        <span>
            <strong>Total outstanding interest:</strong> {{ calculateTotalOutstandingInterest() }}
        </span>
        <span>
            <strong>Total paid interest:</strong> {{ calculateTotalPaidInterest() }}
        </span>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="header in headers">
                        {{ formatLabel(header) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in summaryItems">
                    <td>{{ item.borrower_name }}</td>
                    <td>{{ formatCurrency(item.paid_principal) }}</td>
                    <td>{{ formatCurrency(item.paid_interest) }}</td>
                    <td>{{ formatCurrency(item.outstanding_principal) }}</td>
                    <td>{{ formatCurrency(item.outstanding_interest) }}</td>
                    <td>{{ formatDate(item.last_transaction_date) }}</td>
                    <td>{{ formatDate(item.date) }}</td>
                </tr>
            </tbody>
        </table>
    </div>`,
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