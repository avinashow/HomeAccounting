import {contactService} from '../_services/contact.service.js';
import {transactionService} from '../_services/transaction.service.js';

export const TransactionPage = Vue.component('view-transactions', {
    template: `
    <div class="row">
        <div class="col grid-margin">
            <div class="card">
                <div class="card-body">
                    <button type="button" @click="mode='NEW';resetForm();" class="btn btn-primary float-right" data-toggle="modal" data-target="#myModal">
                        Add transaction
                    </button>
                    <table class="table">
                        <thead>
                            <tr>
                                <th v-for="column in columns">
                                    <a href="#" v-on:click="sortBy(column.name)">
                                        {{column.label}}
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction in transactions">
                                <td>{{transaction.borrower_name | formatLabel}}</td>
                                <td>{{transaction.type}}</td>
                                <td>{{transaction.payment_type}}</td>
                                <td>{{transaction.transaction_date | formatDate}}</td>
                                <td>{{transaction.amount | formatCurrency}}</td>
                                <td>
                                    <button v-on:click="mode='EDIT';selectTransaction(transaction);" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#myModal" >
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
                        <h4 class="modal-title">
                            <span v-if="mode === 'EDIT'">Edit transaction</span>
                            <span v-else>Add transaction</span>
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <form v-on:submit.prevent="toggleTransaction(form)">
                            <div class="form-group">
                                <label for="fullname">Name</label>
                                <input v-model="form.borrower_name" list="contacts-list" v-on:change="checkContactExist(form.borrower_name)" id="fullname" class="form-control">
                                <datalist id="contacts-list">
                                    <option v-for="contact in contacts" value="contact.name">{{contact.name}}</option>
                                </datalist>
                            </div>
                            <div class="form-group" v-if="contactExists">
                                <label for="phone">Phone:</label>
                                <input v-model="form.phone_num" id="phone" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="transaction-date">Date:</label>
                                <input type="date" class="form-control"
                                    v-on:input="getEpoch(form.transaction_date_copy);"
                                    v-model="form.transaction_date_copy"
                                    id="transaction-date">
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
                                <input v-model="form.interest_rate" type="number" step="0.01" id="interest" class="form-control">
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
            columns: [
                {
                    label:'Name',
                    name:'borrower_name'
                },
                {
                    label: 'Type',
                    name: 'type'
                },
                {
                    label: 'Payment type',
                    name: 'payment_type'
                },
                {
                    label: 'Transaction date',
                    name: 'transaction_date'
                }
            ],
            reverse: false,
            sortKey: 'borrower_name',
            transactions: [],
            contacts: [],
            selectedContact: {},
            contactExists: false,
            mode: 'EDIT',
            form: {
                phone_num: '',
                address:'',
                amount: '',
                type: '',
                payment_type:'principal',
                interest_rate: 0,
                borrower_id:'0',
                borrower_name: '',
                transaction_date: '',
                transaction_date_copy: '',
            }
        }
    },
    methods: {
        getEpoch: function(date) {
            this.form.transaction_date = ((new Date(date)).getTime())/1000;
        },
        sortBy: function(sortKey) {

            this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;

            this.sortKey = sortKey;


        },
        selectTransaction: function(transaction) {
            for (const [key,value] of Object.entries(transaction)) {
                if (this.form.hasOwnProperty(key)) {
                    this.form[key] = value;
                }
            }
        },
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
        toggleTransaction: function(requestObj) {
            if (this.mode === 'EDIT') {
                this.updateTransaction(requestObj);
            } else {
                this.addTransaction(requestObj);
            }
        },
        addTransaction: function(requestObj) {
            contactService.addContact({
                    name:this.form.borrower_name,
                    phone_num: this.form.phone_num,
                    address: this.form.address
                })
                .then(response => response.json())
                .then(response => {
                    let newRequestObj = {};
                    for (const [key, value] of Object.entries(requestObj)) {
                        if (key !== 'contact') {
                            newRequestObj[key] = value;
                        }
                    }
                    newRequestObj['borrower_id'] = response.contact_id;
                    transactionService.addTransaction(newRequestObj)
                        .then(response => response.json())
                        .then(response => {
                            document.getElementById('myModal').modal('hide');
                            this.resetForm();
                        })
                        .catch(error => {

                        });
                })
                .catch(error => {

                });
        },
        updateTransaction: function(transactionObj) {
            transactionService.updateTransaction(transactionObj)
                .then(response => response.json())
                .then(response => {
                    this.resetForm();
                })
                .catch(error => {

                });
        },
        resetForm: function() {
            this.form =  {
                phone_num: '',
                address:'',
                amount: '',
                type: '',
                payment_type:'principal',
                interest_rate: 0,
                borrower_id:'0',
                borrower_name:'',
                transaction_date: '',
                transaction_date_copy: '',
            };
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