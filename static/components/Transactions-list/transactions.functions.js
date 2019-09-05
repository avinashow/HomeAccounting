import { contactService } from '../../_services/contact.service.js';
import { transactionService } from '../../_services/transaction.service.js';

export const transactionOperations = {
    getEpoch: function(date) {
        this.form.transaction_date = ((new Date(date)).getTime())/1000;
    },
    selectTransaction: function(transaction) {
        for (const [key,value] of Object.entries(transaction)) {
            if (this.form.hasOwnProperty(key)) {
                if (key === 'transaction_date') {
                    this.form[key] = new Date(parseInt(value) * 1000).toDateInputValue();
                    this.form["transaction_date_copy"] = new Date(parseInt(value) * 1000).toDateInputValue();
                } else {
                    this.form[key] = value;
                }
            }
        }
    },
    selectContact: function(contact) {
        this.selectedContact = contact;
    },
    toggleTransaction: function(requestObj) {
        if (this.mode === 'EDIT') {
            this.updateTransaction(requestObj);
        } else {
            this.addTransaction(requestObj);
        }
    },
    addContact: function(requestObj) {
        let vm = this;
        contactService.addContact({
            name: requestObj.borrower_name,
            phone_num: requestObj.phone_num,
            address: requestObj.address
        })
        .then(response => response.json())
        .then(response => {
            vm.selectedContact = response;
            vm.borrower_id = response.borrower_id;
            $('#contactModal').modal('hide');
        })
        .catch(error => {
        });
    },
    addTransaction: function(requestObj) {
        let vm = this;
        let newRequestObj = {};
        for (const [key, value] of Object.entries(requestObj)) {
            if (key !== 'contact') {
                newRequestObj[key] = value;
            }
        }
        transactionService.addTransaction(newRequestObj)
            .then(response => response.json())
            .then(response => {
                this.transactions.push(response);
                $('#myModal').modal('hide');
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
    deleteTransaction: function(transactionObj) {
        let transaction = {
            transaction_id: transactionObj.transaction_id
        };
        transactionService.deleteTransaction(transaction)
            .then(response => response.json())
            .then(response => {
                this.resetForm();
            })
            .catch(error => {

            });
    },
    resetForm: function() {
        this.form =  {
            contact: {
                phone_num: '',
                address:'',
                borrower_name: '',
            },
            amount: '',
            type: '',
            payment_type:'principal',
            interest_rate: 0,
            borrower_id: 0,
            transaction_date: '',
            transaction_date_copy: '',
        }
    },
};