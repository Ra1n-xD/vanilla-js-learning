'use strict';
// Задача 1. Возьмем пример, который мы уже рассматривали, но в него добавлено несколько ошибок.
// Скопируйте этот код в отдельный файл и исправьте его, чтобы он не только работал, но был красивым и понятным.
// За эталон можно брать код из книги и лекций.
const items = [{ price: 10 }, { price: 20 }, { price: 30 }, { price: 40 }];

for (const item of items) {
    console.log(`Price: ${item.price}`);
}

// Задача 2. Теперь давайте сделаем функцию, которая вычислит сумму всей покупки.
// Дайте функции понятное название и добавьте такие правила: нужно проверять, является ли цена числом (при помощи typeof), суммируем только положительные цены,
// а если находим не число или отрицательное число, то выдаем ошибку при помощи throw.
function calculateSum(cart) {
    let sum = 0;
    for (const { price } of cart) {
        if (typeof price != 'number' || price < 0) {
            throw 'Ошибка в данных';
        }
        sum += price;
    }
    return sum;
}

console.log(calculateSum(items));

// Задача 3. Возьмите эту структуру данных и для нее напишите функцию, которая дополняет ее товарами по примеру тех, которые уже есть.
// Функция принимает название каталога, название и стоимость товара. Если каталога не существует, то его необходимо создать и добавить туда товар.
// Также сделать проверку на ввод числа, функция должна принимать числа даже в строке, но при вводе строки выводить NaN.
const purchase = {
    Electronics: [
        { name: 'Laptop', price: 1500 },
        { name: 'Keyboard', price: 100 }
    ],
    Textile: [
        { name: 'Bag', price: 50 },
        { name: 'Laptop', price: 100 }
    ],
    addToCart(cart, name, price) {
        if (typeof +price != 'number' || isNaN(price)) {
            throw 'пасаси';
        }
        if (this[cart]) {
            this[cart].push({ name: name, price: +price });
        } else {
            this[cart] = { name: name, price: +price };
        }
    }
};

purchase.addToCart('Electronics', 'eeee', '100');
console.log(purchase);

// Задача 4. Напишите функцию find, которая будет проходить по структуре из предыдущей задачи и находить товар по его имени (проверяя все группы товаров).
// Имена могут повторяться, но на этот раз нас интересует только первый товар,у которого имя совпало.
function findFirst(cart, name) {
    for (const key in cart) {
        for (const item of cart[key]) {
            if (item.name == name) return item;
        }
    }
}

const resultFirst = findFirst(purchase, 'Laptop'); //{ name: 'Laptop', price: 1500 }
console.log(resultFirst);

// Задача 5. Теперь расширим предыдущую задачу: нужно так изменить функцию find, чтобы она возвращала массив,
// содержащий все товары с указанным именем. Если ни одного не нашли, то пустой массив.
function findAll(cart, name) {
    const result = [];
    for (const key in cart) {
        for (const item of cart[key]) {
            if (item.name == name) result.push(item);
        }
    }
    return result;
}

const resultAll = findAll(purchase, 'Laptop');
console.log(resultAll);

// Задача 6. Найти вес всех вещей, цена которых более 80 и количество менее 7
const foods = [
    { name: 'Паста болоньезе', weight: 350, price: 33, quanity: 3 },
    { name: 'Спаггети', weight: 350, price: 56, quanity: 8 },
    { name: 'Суп', weight: 400, price: 68, quanity: 16 },
    { name: 'Пицца', weight: 675, price: 139, quanity: 30 },
    { name: 'Молоко', weight: 1600, price: 339, quanity: 8 },
    { name: 'Овощи', weight: 740, price: 159, quanity: 1 }, // +
    { name: 'Сыр', weight: 230, price: 99, quanity: 4 },
    { name: 'Мука', weight: 230, price: 69, quanity: 5 }
];

let totalWeight = 0;

for (let item of foods) {
    if (item.price > 80 && item.quanity < 7) {
        totalWeight += item.weight;
    }
}

console.log(totalWeight);

// Задание 5. Сфомировать структуру из примера
const employees = [
    {
        name: 'Ilya',
        gender: 'male',
        year: '1998'
    },
    {
        name: 'Maxim',
        gender: 'male',
        year: '1993'
    },
    {
        name: 'Lena',
        gender: 'female',
        year: '2001'
    },
    {
        name: 'Masha',
        gender: 'female',
        year: '1999'
    },
    {
        name: 'Ivan',
        gender: 'male',
        year: '2003'
    }
];

/* 
    {
    "male": [{
        "name": "Ilya",
        "year": "1998"
        }, 
        {
        "name": "Maxim",
        "year": "1993"
        }, 
        {
        "name": "Ivan",
        "year": "2003"
        }],
        
    "female": [{
        "name": "Lena",
        "year": "2001"
        }, 
        {
        "name": "Masha",
        "year": "1999"
        }]
    }
    
  */

function sortGender(arr) {
    let answ = { male: [], female: [] };

    for (let obj of arr) {
        if (obj['gender'] === 'male') {
            delete obj.gender;
            answ['male'].push(obj);
        } else {
            delete obj.gender;
            answ['female'].push(obj);
        }
    }

    console.log(answ);
}
sortGender(employees);
