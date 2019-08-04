import {contactService} from '../_services/contact.service.js';
import {transactionService} from '../_services/transaction.service.js';

export const TransactionPage = Vue.component('view-transactions', {
    template: `
    <div class="row">
        <div class="col grid-margin">
            <div class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary float-right" data-toggle="modal" data-target="#myModal">
                        Add transaction
                    </button>
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
                        <form v-on:submit.prevent="addTransaction(form)">
                            <div class="form-group">
                                <label for="fullname">Name</label>
                                <input v-model="form.contact.name" list="contacts-list" v-on:change="checkContactExist(form.contact.name)" id="fullname" class="form-control">
                                <datalist id="contacts-list">
                                    <option v-for="contact in contacts" value="contact.name">{{contact.name}}</option>
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
                                <label for="type">Type:</label>
                                <select id="type" v-model="form.type" class="form-control">
                                    <option>Choose</option>
                                    <option value="lend">lend</option>
                                    <option value="payback">payback</option>
                                 </select>
                            </div>
                            <div class="form-group" v-if="form.type === 'payback'">
                                <label for="paymenttype">Payment type:</label>
                                <select id="paymenttype" v-model="form.payment_type" class="form-control">
                                    <option>Choose</option>
                                    <option value="principal">Principal</option>
                                    <option value="interest">Interest</option>
                                 </select>
                            </div>
                            <div class="form-group">
                                <label for="interest">Interest:</label>
                                <input v-model="form.interest" id="interest" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button class="btn btn-light" v-on:click="resetForm">Reset</button>
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
            contacts: [],
            selectedContact: {},
            contactExists: false,
            form: {
                contact: {
                    name: '',
                    phone_num: ''
                },
                amount:'',
                type:'',
                payment_type:'principal',
                interest:'',
            }
        }
    },
    methods: {
        checkContactExist: function(name) {
            this.selectedContact = this.contacts.filter((contact) => {
                return contact.name === name;
            });
            if (this.selectedContact) {
                this.contactExists = true;
            } else {
                this.contactExists = false;
            }
        },
        addTransaction: function(requestObj) {
            contactService.addContact(requestObj.contact)
                .then(response => response.json())
                .then(response => {
                    let newRequestObj = {};
                    for (const [key, value] of Object.entries(requestObj)) {
                        if (key !== 'contact') {
                            newRequestObj[key] = value;
                        }
                    }
                    console.log(newRequestObj);
                    newRequestObj['borrower_id'] = response.borrower_id;
                    transactionService.addTransaction(newRequestObj)
                        .then(response => response.json())
                        .then(response => {
                            this.resetForm();
                        })
                        .catch(error => {

                        });
                })
                .catch(error => {

                });
        },
        editTransaction: function(transactionObj) {
            serverBus.$emit('transactionSelected', transactionObj);
        },
        resetForm: function() {
            this.form =  {
                contact: {
                    name: '',
                    phone_num: ''
                },
                amount:''
            };
        },
        deleteTransaction: function(transactionobj) {
        },
    },
    created: function() {
        let vm = this;

        transactionService.listTransactions()
            .then(response => response.json())
            .then(response => {
                vm.transactions = response.items;
            })
            .catch(error => {
                vm.transactions = transactionsOffResponse.items;
            });
    }
});