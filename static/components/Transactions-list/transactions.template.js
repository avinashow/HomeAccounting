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
        <transaction-modal
            mode="mode"
            form="form"
            toggleTransaction="toggleTransaction(form)">
        </transaction-modal>
    </div>`;