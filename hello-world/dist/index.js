"use strict";
let sales = 123456789;
let course = 'Typrescript';
let is_published = true;
let variable;
let numbers = [1, 2];
let user = [1, 'Mosh'];
let mySize = 1;
console.log(mySize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return 0;
    return income;
}
let employee = { id: 1,
    name: '',
    retire(date) {
        console.log(date);
    },
};
let employeee = { id: 1,
    name: '',
    retire(date) {
        console.log(date);
    },
};
function kgToLbs(weight) {
    if (typeof weight === 'number') {
        console.log(weight);
        return weight * 2.2;
    }
    else {
        console.log(parseInt(weight));
        return parseInt(weight) * 2.2;
    }
}
kgToLbs(10);
kgToLbs('10kg');
//# sourceMappingURL=index.js.map