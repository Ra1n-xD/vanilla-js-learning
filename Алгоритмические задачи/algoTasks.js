// Задание 1. Является ли массив чисел монотонной последовательностью
function aboba(arr) {
    let temp1 = arr[0];
    const isRaise = arr[1] > arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (isRaise) {
            if (arr[i] > temp1) temp1 = arr[i];
            else return false;
        } else if (arr[i] < temp1) {
            temp1 = arr[i];
        } else {
            return false;
        }
    }

    return true;
}

console.log(aboba([22, 11, 3])); // true
console.log(aboba([1, 2, 3])); // true
console.log(aboba([15, 10, 15])); // false
console.log(aboba([22, 11, 3, 1, 2, 3])); // false
console.log(aboba([22, 22, 22])); // false

// Задание 2. Напишите функцию, которая находит наиболее частый элемент в заданном массиве, на вывод массив из данного элемента и кол-во посторений.
function mostFrequent(arr) {
    let maxCount = 0;
    let answ;

    for (let i = 0; i <= arr.length - 1; i++) {
        let counter = 0;
        for (let j = 0; j <= arr.length - 1; j++) {
            if (arr[i] === arr[j]) counter++;
        }
        if (counter > maxCount) {
            maxCount = counter;
            answ = arr[i];
        }
    }

    return answ;
}

function mostFrequent(arr) {
    // let map = {};
    // arr.forEach((item) => (map[item] ? map[item]++ : (map[item] = 1)));
    // return Object.keys(map).find((key) => map[key] === Math.max(...Object.values(map)));

    let map = {};
    let max = '';
    let maxi = 0;

    for (let key of arr) {
        if (map[key]) map[key]++;
        else map[key] = 1;
        if (maxi < map[key]) {
            max = key;
            maxi = map[key];
        }
    }
    return [max, map[max]];
}

console.log(mostFrequent([3, 'c', 'c', 'c', 2, 3, 'c', 3, 'c', 2, 4, 9, 3])); // c встречается 5 раз

// Задание 3. Дан отсорированный массив целых чисел по возрастанию, необходимо вернуть массив квадратов отсортированных по убыванию
function doubleA(arr) {
    let left = 0;
    let right = arr.length - 1;
    const result = [];

    while (left <= right) {
        if (arr[left] * arr[left] > arr[right] * arr[right]) {
            result.push(arr[left] * arr[left]);
            left++;
        } else {
            result.push(arr[right] * arr[right]);
            right--;
        }
    }

    return result2;
    // return arr.map((item) => item * item).sort((a, b) => b - a);
}

console.log(doubleA([-25, -10, -5, 1, 2, 3, 5])); // [ 625, 100, 25, 25 , 9, 4, 1]
console.log(doubleA([1, 2, 3, 5])); // [ 25, 9, 4, 1 ]
console.log(doubleA([-25, -10, -5])); // [ 625, 100, 25 ]

// Задание 4. Дан отсортированный массив целых чисел по возрастанию, необходимо вернуть массив квадратов отсортированных по возрастанию
function doubleD(arr) {
    const result = [];

    if (arr[0] >= 0) {
        return arr.map((item) => item * item);
    } else if (arr[arr.length - 1] < 0) {
        for (let i = arr.length - 1; i >= 0; i--) {
            result.push(arr[i] * arr[i]);
        }

        return result;
    }

    let left = 0;
    let right = 0;

    let leftNum = 0;
    let rightNum = 0;

    for (let i = 1; i <= arr.length - 1; i++) {
        if (arr[i] >= 0 && arr[i - 1] < 0) {
            left = i - 1;
            right = i;
            break;
        }
    }

    while (left >= 0 && right < arr.length) {
        leftNum = Math.abs(arr[left]);
        rightNum = arr[right];

        if (leftNum < rightNum) {
            result.push(leftNum * leftNum);
            left--;
        } else {
            result.push(rightNum * rightNum);
            right++;
        }
    }

    while (left >= 0) {
        result.push(arr[left] * arr[left]);
        left--;
    }

    while (right < arr.length - 1) {
        result.push(arr[right] * arr[right]);
        right++;
    }

    return result;
}

console.log(doubleD([-25, -10, -5, 1, 2, 3, 5])); // [ 625, 100, 25, 25 , 9, 4, 1]
console.log(doubleD([1, 2, 3, 5])); // [ 25, 9, 4, 1 ]
console.log(doubleD([-25, -10, -5])); // [ 625, 100, 25 ]
