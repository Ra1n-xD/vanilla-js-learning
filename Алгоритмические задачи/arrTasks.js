// https://habr.com/ru/company/plarium/blog/483958/
// arr.pop(); - удаленный эл (+)
// arr.shift(); - тоже самое мб (+)
// arr.push(); - длинну
// arr.unshift(); - длинну
// arr.forEach() - нихуя (+)
// arr.map() - новый массив (+)
// arr.filter() - новый массив с учетом фильтрации, который вернет true (+)
// arr.reduce() - ну он там сумму делает, ну кароч ИТОГОВОЕ ЗНАЧНЕИЕ на основе функции, кароч идите нахуй (+)
// arr.find() - первый элемент в массиве, который вернет true, если все false - undefined (+)
// arr.sort() - мутирует оригинальны массив (+)
// arr.splice() - новый массив (+)
// arr.slise() - новый массив (+)
// arr.concat() - новый массив на основе тех (+)
// arr.findIndex() - индекс найденного эл, иначе -1
// arr.includes() - метод возвращает значение true, если массив содержит определенный элемент, и значение false — если нет
// arr.reverse() - этот же массив перевернутый

// Задача 1. Отсортировать массив по убыванию\возрастанию (без использования sort, reverse)
function revSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = i; k < arr.length; k++) {
            if (arr[i] > arr[k]) {
                let arr_i = arr[i];
                arr[i] = arr[k];
                arr[k] = arr_i;
            }
        }
    }
    // for (let i = 0; i < arr.length - 1; i++) {
    //     for (let j = 0; j < arr.length - 1; j++) {
    //         if (arr[i] > arr[i + 1]) {
    //             let temp = arr[i];
    //             arr[i] = arr[i + 1];
    //             arr[i + 1] = temp;
    //             i = -1;
    //         }
    //     }
    // }
    return arr;
}
console.log(revSort([2, 4, 6, 1, 33, 14, 1, -1, 6, 102, 101]));

// Задача 2. Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить,
// чтобы в сумме получилось больше 10-ти.
const arr1 = [1, 2, 10, 0, 4, 5, 6];

function sumBecomeTen(arr) {
    let counter = 0;
    let sum = 0;
    arr.forEach((item) => {
        if (sum <= 10) {
            sum += item;
            counter++;
        }
    });
    return counter;
    // arr.reduce((acc, currValue) => (acc[1] <= 10 ? [acc[0] + 1, acc[1] + currValue] : acc), [0, 0])[0];
}

// Задача 3. Удаление повторяющихся значений
const arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9];

let anws = new Set(arr);
console.log([...anws]);

let anws2 = arr.filter((item, i) => arr.indexOf(item) === i);
console.log(anws2);

let anws3 = arr.reduce((uniq, item) => (uniq.includes(item) ? uniq : [...uniq, item]), []);
console.log(anws3);

function removeDuplicates(arr) {
    let map = {};
    const newArr = [];

    for (let i = 0; i < arr.length; i++) {
        let keyMap = arr[i];

        if (!map[keyMap]) {
            newArr.push(keyMap);
            map[keyMap] = true;
        }
        console.log(map);
    }

    return newArr;
}

// Задача 4. Напишите функцию  для преобразования суммы в монеты разного достоинства.
function amountCoins(count, coins) {
    const answ = [];

    for (let i = 0; i < coins.length; i++) {
        if (count >= coins[i]) {
            count -= coins[i];
            answ.push(coins[i]);
            i--;
        }
    }

    console.log(answ);
}

amountCoins(96, [25, 10, 5, 2, 1]);
// 96 - сумма, а 25, 10, 5, 2, 1 - монеты.
// Вывод : 25,25,25,10,10,1

// 96 - 25 = 71
// 71 - 25 = 46
// 46 - 25 = 21
// 21 - 10 = 11
// 11 - 10 = 1
//   1 - 1 = 0
