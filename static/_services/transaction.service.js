export const transactionService = {
    updateTransaction,
    deleteTransaction,
    addTransaction,
    listTransactions
};

function listTransactions() {
    return fetch(`/_ah/api/homac/v1/transactions?access_token=${localStorage.getItem('accessToken')}`);
}

function addTransaction(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        formData,
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}
