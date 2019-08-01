export const TransactionPage = Vue.component('view-transactions', {
    template: `
    <div class="row">
        <div class="col grid-margin">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Payment type</th>
                                <th scope="col">Transaction date</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction in transactions">
                                <th scope="row">{{transaction.transaction_id}}</th>
                                <td>{{transaction.borrower_name | formatLabel}}</td>
                                <td>{{transaction.type}}</td>
                                <td>{{transaction.payment_type}}</td>
                                <td>{{transaction.transaction_date | formatDate}}</td>
                                <td>{{transaction.amount | formatCurrency}}</td>
                                <td>
                                    <router-link :to="{ name:'editTransaction', params:{data: transaction} }" class="btn btn-outline-success btn-sm" >
                                        Edit
                                    </router-link>
                                    <button type="button" class="btn btn-outline-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            transactions: []
        }
    },
    methods: {
        editTransaction: function(transactionObj) {
            serverBus.$emit('transactionSelected', transactionObj);
            console.log(currentView);
        },
        deleteTransaction: function(transactionobj) {
        },
    },
    created: function() {
        //fetch('/_ah/api/homac/v1/transactions?')
        //    .then(response =>  response.json())
        getTransactionsOffResponse()
            .then((response) => {
                this.transactions = response.items;
                console.log(this.transactions);
            })
            .catch(function(error) {

            });
    }
});