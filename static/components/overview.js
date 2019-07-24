Vue.component('manage-transactions', {
    template:`
    <div>
        <h1>{{title}}</h1>
        <span>
            <strong>Total outstanding principal:</strong> {{ calculateTotalOutstandingPrincipal() | formatCurrency }}
        </span>
        <span>
            <strong>Total paid principal:</strong> {{ calculateTotalPaidPrincipal() | formatCurrency }}
        </span>
        <span>
            <strong>Total outstanding interest:</strong> {{ calculateTotalOutstandingInterest() | formatCurrency }}
        </span>
        <span>
            <strong>Total paid interest:</strong> {{ calculateTotalPaidInterest() | formatCurrency }}
        </span>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="header in headers">
                        {{ header | formatLabel }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in summaryItems">
                    <td>{{ item.borrower_name }}</td>
                    <td>{{ item.paid_principal | formatCurrency }}</td>
                    <td>{{ item.paid_interest | formatCurrency }}</td>
                    <td>{{ item.outstanding_principal | formatCurrency }}</td>
                    <td>{{ item.outstanding_interest | formatCurrency }}</td>
                    <td>{{ item.last_transaction_date | formatDate }}</td>
                    <td>{{ item.date | formatDate }}</td>
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
      calculateTotalOutstandingPrincipal() {
        let total = 0;
        this.summaryItems.forEach(function(item) {
          total += parseInt(item.outstanding_principal);
        });
        return total;
      },
      calculateTotalOutstandingInterest() {
        let total = 0;
        this.summaryItems.forEach(function(item) {
          total += parseInt(item.outstanding_interest);
        });
        return total;
      },
      calculateTotalPaidInterest() {
        let total = 0;
        this.summaryItems.forEach(function(item) {
          total +=  parseInt(item.paid_interest);
        });
        return total;
      },
      calculateTotalPaidPrincipal() {
        let total = 0;
        this.summaryItems.forEach(function(item) {
          total += parseInt((item.paid_principal) ? item.paid_principal : 0);
        });
        return total;
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