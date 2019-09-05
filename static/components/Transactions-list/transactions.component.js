import { transactionsTemplate } from './transactions.template.js';
import { transactionOperations } from './transactions.functions.js';
import { transactionService } from '../../_services/transaction.service.js';
import { contactService } from '../../_services/contact.service.js';
import '../../responses.js';

export const TransactionPage = Vue.component('view-transactions', {
    template: transactionsTemplate,
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
                },
                {
                    label: 'Amount',
                    name: 'amount',
                }
            ],
            reverse: false,
            transactions: [],
            contacts: [],
            selectedContact: {},
            contactExists: false,
            mode: 'EDIT',
            form: {
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
                transaction_id: 0,
                transaction_date: '',
                transaction_date_copy: '',
            }
        }
    },
    methods: transactionOperations,
    created: function() {
        let vm = this;

        contactService.getContacts()
            .then(response => response.json())
            .then(response => {
                vm.contacts = response.items;
            })
            .catch(error => {
                // TODO alerts
            });


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