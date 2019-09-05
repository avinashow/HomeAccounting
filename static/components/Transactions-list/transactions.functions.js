import { contactService } from '../../_services/contact.service.js';
import { transactionService } from '../../_services/transaction.service.js';

export const transactionOperations = {
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
                if (key === 'transaction_date') {
                    this.form[key] = new Date(parseInt(value) * 1000).toDateInputValue();
                    this.form["transaction_date_copy"] = new Date(parseInt(value) * 1000).toDateInputValue();
                } else {
                    this.form[key] = value;
                }
            }
        }
    },
    checkContactExist: function(name) {
        this.selectedContact = this.contacts.filter((contact) => {
            return contact.name === name;
        })[0];

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
    addContact: function() {
        let vm = this;
        contactService.addContact({
            name:this.form.borrower_name,
            phone_num: this.form.phone_num,
            address: this.form.address
        })
        .then(response => response.json())
        .then(response => {
            vm.selectedContact = response;
        })
        .catch(error => {
        });
    },
    addTransaction: function(requestObj) {
        let vm = this;
        let newRequestObj = {};
        for (const [key, value] of Object.entries(requestObj)) {
            if (key !== 'address' && key !== 'borrower_name' && key !== 'transaction_date_copy') {
                newRequestObj[key] = value;
            }
        }
        newRequestObj['borrower_id'] = vm.selectedContact.contact_id;
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
};