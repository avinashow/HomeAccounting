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
                                    <button class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#myModal" >
                                        Edit
                                    </button>
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
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Add/Edit Transaction</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="fullname">Name</label>
                                <input v-model="form.contactname" id="fullname" class="form-control">
                                <datalist id="contacts">
                                    
                                </datalist>
                            </div>
                            <div class="form-group" v-if="contactExists">
                                <label for="phone">Phone:</label>
                                <input v-model="form.contact.phone_num" id="phone" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="amount">Amount:</label>
                                <input v-model="form.amount" id="amount" class="form-control">
                            </div>
                            <div class="form-group">
                            </div>
                            <button class="btn btn-primary">Submit</button>
                            <button class="btn btn-light">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            transactions: [],
            contactExists: false,
            form: {
                contact: {
                    name:'',
                    phone_num:''
                },
                amount:''
            }
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
        let vm = this;
        fetch(`/_ah/api/homac/v1/transactions?access_token=${localStorage.getItem('accessToken')}`)
            .then(response =>  response.json())
            .then((response) => {
                vm.transactions = response.items;
            })
            .catch(function(error) {
                vm.transactions = transactionsOffResponse.items;
            });
    }
});