export const transactionsTemplate = `
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
                                    <button type="button" 
                                        v-on:click="deleteTransaction(transaction);"
                                        class="btn btn-outline-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal modal-full fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                            <div class="form-group" v-if="form.type !== 'payback'">
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
    </div>`;