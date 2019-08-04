export const overviewService = {
    getOverview
};

function getOverview() {
    return fetch(`_ah/api/homac/v1/overview?access_token=${localStorage.getItem('accessToken')}`);
}