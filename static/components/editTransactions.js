const TransactionDetails = Vue.component('edit-transactions', {
    template: `
        <div class="col">
            <router-link to="/transactions">Back</router-link>
            <form class="well form-horizontal">
                <fieldset>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Full Name</label>
                        <div class="col-md-8 inputGroupContainer">
                            <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input id="fullName" name="fullName" placeholder="Full Name" class="form-control" required="true" value="" type="text"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Address Line 1</label>
                        <div class="col-md-8 inputGroupContainer">
                            <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><input id="addressLine1" name="addressLine1" placeholder="Address Line 1" class="form-control" required="true" value="" type="text"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Payment type</label>
                        <div class="col-md-8 inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon" style="max-width: 100%;"><i class="glyphicon glyphicon-list"></i></span>
                                <select class="selectpicker form-control">
                                    <option>A really long option to push the menu over the edget</option>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style="float:right">
                        <button type="button" class="btn btn-primary" v-on:click="updateTransaction">Save</button>
                        <button type="button" class="btn btn-default">Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
    `,
    data: function() {
        return {
            transaction: {}
        }
    },
    methods: {
        updateTransaction: function() {
            console.log(this.transaction)
        }
    },
    created: function() {
        this.transaction = this.$route.params.data;
    }
})