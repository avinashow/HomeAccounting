const transactions = Vue.component('view-transactions', {
    template: `
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Payment type</th>
                    <th scope="col">Transaction date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Options</th>
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
                        <button type="button" class="btn btn-primary">
                            <i class="fa fa-eye"></i>
                        </button>
                        <router-link :to="{ name:'editTransaction', params:{data: transaction} }" >
                            <i class="fa fa-edit"></i>
                        </router-link>
                        <button type="button" class="btn btn-danger">
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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