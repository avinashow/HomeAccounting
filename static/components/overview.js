export const SummaryPage = Vue.component('Summary', {
    template:`
    <section>
        <div class="row">
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="clearfix">
                  <div class="float-right">
                    <h5 class="card-title text-right">
                      Total outstanding principal
                    </h5>
                    <p class="card-text text-right">
                      {{ calculateTotalOutstandingPrincipal() | formatCurrency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="clearfix">
                  <div class="float-right">
                    <h5 class="card-title text-right">
                      Total paid principal
                    </h5>
                    <p class="card-text text-right">
                      {{ calculateTotalPaidPrincipal() | formatCurrency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="clearfix">
                  <div class="float-right">
                    <h5 class="card-title text-right">
                      Total outstanding interest
                    </h5>
                    <p class="card-text text-right">
                      {{ calculateTotalOutstandingInterest() | formatCurrency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="clearfix">
                  <div class="float-right">
                    <h5 class="card-title text-right">
                      Total paid interest
                    </h5>
                    <p class="card-text text-right">
                      {{ calculateTotalPaidInterest() | formatCurrency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col grid-margin">
            <div class="card">
              <div class="card-body">
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
              </div>
            </div>
          </div>
        </div>  
    </section>`,
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
      var vm = this;
      fetch(`/_ah/api/homac/v1/overview?access_token=${localStorage.getItem('accessToken')}`)
        .then(response => response.json())
        .then(response => {
          vm.summaryItems = response.items;
        })
        .catch(function(error) {
          vm.summaryItems = overviewOffResponse.items;
        });
    },
  });