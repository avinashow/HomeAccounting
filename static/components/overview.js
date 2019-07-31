export const SummaryPage = Vue.component('Summary', {
    template:`
    <div>
        <h1>{{title}}</h1>
        <div class="row">
          <div class="col-md-3 col-xl-4">
            <div class="card mb-3 widget-content">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="widget-heading">
                    Total outstanding principal
                  </div>
                </div>
                <div class="widget-content-right">
                  <div class="widget-numbers">
                    <span>{{ calculateTotalOutstandingPrincipal() | formatCurrency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-xl-4">
            <div class="card mb-3 widget-content">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="widget-heading">
                    Total paid principal
                  </div>
                </div>
                <div class="widget-content-right">
                  <div class="widget-numbers">
                    <span>{{ calculateTotalPaidPrincipal() | formatCurrency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-xl-4">
            <div class="card mb-3 widget-content">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="widget-heading">
                    Total outstanding interest
                  </div>
                </div>
                <div class="widget-content-right">
                  <div class="widget-numbers">
                    <span>{{ calculateTotalOutstandingInterest() | formatCurrency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-xl-4">
            <div class="card mb-3 widget-content">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="widget-heading">
                    Total paid interest
                  </div>
                </div>
                <div class="widget-content-right">
                  <div class="widget-numbers">
                    <span>{{ calculateTotalPaidInterest() | formatCurrency }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      var that = this;
      //events.$on('on-load', function () {
        fetch(`/_ah/api/homac/v1/overview?access_token=${localStorage.getItem('accessToken')}`)
          .then(response => response.json())
          .then(response => {
            that.summaryItems = response.items;
          }).catch(function(error) {
            that.summaryItems = overviewOffResponse.items;
          });
      //});
    },
  });