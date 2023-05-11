'use strict';
// forEach
Array.prototype.myForEach = function (callback) {
    if (this.length === 0) return;

    for (let index = 0; index < this.length; index++) {
        callback(this[index], index, this);
    }
};

let a = [1, 2, 3];
a.myForEach((item) => console.log(item)); // 1 2 3

// push
Array.prototype.myPush = function (...newItem) {
    for (let index = 0; index < newItem.length; index++) {
        this[this.length] = newItem[index];
        console.log(this.length);
    }

    return this.length;
};

let a = [1, 2, 3];
let retu = a.myPush('aboba', 'lox', 'max');
console.log(a, retu); // [ 1, 2, 3, 'aboba', 'lox', 'max' ] 6

// map
Array.prototype.myMap = function (callback) {
    if (this.length === 0) return [];

    const newArr = [];

    for (let index = 0; index < this.length; index++) {
        newArr[index] = callback(this[index], index, this);
    }

    return newArr;
};

let a = [1, 2, 3];
console.log(a.myMap((item) => item * 2)); // [ 2, 4, 6 ]

// join
Array.prototype.myJoin = function (separator = ',') {
    if (this.length === 0) return '';

    let str = '';

    for (let index = 0; index < this.length; index++) {
        if (index === this.length - 1) {
            if (this[index] === undefined || this[index] === null);
            else str += this[index];

            return str;
        }

        if (this[index] === undefined || this[index] === null) str += separator;
        else str += `${this[index]}${separator}`;
    }
};

let a = [1, 2, 3, undefined];

console.log(a.myJoin('')); // 123
console.log(a.myJoin('-')); // 1-2-3-
console.log(a.myJoin()); // 1,2,3,

// reduce (ну чо погнали нахуй)
Array.prototype.myZopa = function (callback, initialValue) {
    if (this.length === 0 && initialValue === undefined) throw new TypeError('Reduce of empty array with no initial value');

    let acc = this[0];
    let index = 1;

    if (initialValue !== undefined) {
        acc = initialValue;
        index = 0;
    }

    for (; index < this.length; index++) {
        acc = callback(acc, this[index], index, this);
    }

    return acc;
};

console.log([0, 1, 2, 3, 4].myZopa((a, b) => a + b, 10)); // 20
console.log([1, 2, 3, 4, 5].myZopa((a, b) => a + b)); // 15

console.log([].myZopa((a, b) => a + b, 12)); // 12
console.log([].myZopa((a, b) => a + b)); // TypeError

const arr = [1, 1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 9];
let anws = arr.myZopa((uniq, item) => (uniq.includes(item) ? uniq : [...uniq, item]), []);
console.log(anws); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
