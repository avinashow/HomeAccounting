Vue.filter('formatDate',function(value) {
     return moment(new Date(parseInt(value) * 1000)).format('MM/DD/YYYY');
});

 Vue.filter('formatCurrency',function(number) {
    if (!number) {
        number = 0;
      }
      number = parseInt(number);
      return number.toLocaleString('en-IN', { style:'currency',currency: 'INR' });
});

Vue.filter('formatLabel',function(value) {
    let inputArr = value.split('_');
    inputArr[0] = inputArr[0].charAt(0).toUpperCase() + inputArr[0].slice(1);
    return inputArr.join(' ');
});
