export const transactionsTemplate = `
    <div class="row">
        <div class="col grid-margin">
            <div class="card">
                <div class="card-body">
                    <div class="dropdown float-right">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Add
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" @click="mode='NEW';resetForm();" data-toggle="modal" data-target="#contactModal">Contact</a>
                            <a class="dropdown-item" href="#" @click="mode='NEW';resetForm();" data-toggle="modal" data-target="#myModal">Transaction</a>
                        </div>
                    </div>
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
        <div class="modal modal-full fade" id="contactModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            Add contact
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="addContact(form.contact)">
                            <div class="form-group">
                                <label for="fullname">Name:</label>
                                <input v-model="form.contact.borrower_name" id="fullname" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone:</label>
                                <input v-model="form.contact.phone_num" id="phone" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="address">Address:</label>
                                <textarea v-model="form.contact.address" class="form-control"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
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
                                <label for="fullname">Contact:</label>
                                <select v-model="form.borrower_id" class="form-control">
                                    <option>Choose</option>
                                    <option v-for="contact in contacts" v-bind:value="contact.contact_id">
                                        {{contact.name}}
                                    </option>
                                </select>
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