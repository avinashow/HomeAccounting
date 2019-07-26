Vue.component('view-transactions', {
    template: `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Article Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Shares</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Bootstrap 4 CDN and Starter Template</td>
                    <td>Cristina</td>
                    <td>2.846</td>
                    <td>
                    <button type="button" class="btn btn-primary"><i class="fa fa-eye"></i></button>
                    <button type="button" v-on:click="editTansaction(transaction)" class="btn btn-success"><i class="fa fa-edit"></i></button>
                    <button type="button" class="btn btn-danger"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function() {
        return {
            transactions: []
        }
    },
    methods: {
        editTransaction: function(transactionObj) {
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