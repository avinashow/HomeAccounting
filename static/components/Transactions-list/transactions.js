import { transactionsTemplate } from './transactions.template.js';
import { transactionOperations } from './transactions.functions.js';

import { transactionService } from '../../_services/transaction.service.js';

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
    methods: transactionOperations,
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