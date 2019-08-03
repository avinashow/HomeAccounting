
const overviewOffResponse = {
    items: [
        {
        "borrower_name": "Pavan",
        "date": "1562259702",
        "last_transaction_date": "1562299702",
        "outstanding_interest": 5000,
        "outstanding_principal": 100000,
        "paid_interest": 1000,
        "paid_principal": 0
        },
    ],
};

const transactionsOffResponse = {
    items: [
        {
            type: 'lend',
            payment_type: 'principal',
            amount: '23458',
            transaction_date: "1562259702",
            borrower_id: 1,
            borrower_name: 'pavan',
            interest_rate:'8',
            transaction_id: 1
        },
        {
            type: 'payback',
            payment_type: 'interest',
            amount: '23458',
            transaction_date: "1562259702",
            borrower_id: 2,
            borrower_name: 'avinash',
            interest_rate:'8',
            transaction_id: 2 
        }
    ]
};