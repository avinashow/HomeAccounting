export const transactionService = {
    addTransaction,
    listTransactions
};

function listTransactions() {
    return fetch(`/_ah/api/homac/v1/transactions?access_token=${localStorage.getItem('accessToken')}`);
}

function addTransaction(transactionData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(transactionData),
    };

    return fetch(`/_ah/api/homac/v1/transactions?access_token=${localStorage.getItem('accessToken')}`, requestOptions);
}
