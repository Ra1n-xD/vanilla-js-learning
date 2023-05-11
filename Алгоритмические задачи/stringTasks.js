// Задача 1. Палиндром - слово или текст, одинаково читающееся в обоих направлениях
function palindrome(str) {
    let flag = true;

    for (let i = 0; i <= str.length - 1; i++) {
        // console.log(str[i], str[str.length - 1 - i]);
        if (str[i] !== str[str.length - 1 - i]) {
            flag = false;
            break;
        }
    }
    console.log(flag);
}
console.log(palindrome('12321')); // true;
console.log(palindrome('aboba')); // true
console.log(palindrome('anna')); // true;
console.log(palindrome('ya ebal ,a, labe ay')); // true;
console.log(palindrome('.!!.')); // true;
console.log(palindrome('123456')); // false;
console.log(palindrome('walter')); // false;

// Задача 2. Анаграмма - перестановка букв слова, что бы в результате получить другое слово
function anagram(s1, s2) {
    if (s1.length !== s2.length) return false;

    const arr1 = s1.split('').sort().join('');
    const arr2 = s2.split('').sort().join('');

    return arr1 === arr2;
}
console.log(anagram('', '')); // true
console.log(anagram('123', '123')); // true
console.log(anagram('bumdle', 'dumble')); // true
console.log(anagram('aboba', 'baoab')); // true
console.log(anagram('a', '')); // false
console.log(anagram('ab', 'a')); // false
console.log(anagram('ab', 'cd')); // false
console.log(anagram('codewars', 'hackerrank')); //false

function aclean(arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i].toLowerCase().split('').sort().join('');
        obj[sorted] = arr[i];
    }

    return Object.values(obj);
}

let arr = ['12', 'nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares', '21', 'aboba', 'baoab']; // [ '21', 'PAN', 'hectares', 'era', 'baoab' ]
console.log(aclean(arr));

// Задача 3. Панаграмма - текст, использующий все буквы алфавита (https://www.codewars.com/kata/545cedaa9943f7fe7b000048)
function isPanagram(string) {
    string = string.toLowerCase().split('');
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    for (let char of alphabet) {
        if (string.indexOf(char) === -1) {
            return false;
        }
    }

    return true;
}
console.log(isPanagram('This isnt a pangram!')); // false
console.log(isPanagram('abcdefghijklmopqrstuvwxyz')); // false
console.log(isPanagram('Detect Pangram')); // false
console.log(isPanagram('abcdefghijk lmnopqrstuvwxyz')); // true
console.log(isPanagram('Cwm fjord bank glyphs vext quiz')); // true
console.log(isPanagram('Pack my box with five dozen liquor jugs.')); // true
console.log(isPanagram('How quickly daft jumping zebras vex.')); // true
console.log(isPanagram('ABCD45EFGH,IJK,LMNOPQR56STUVW3XYZ')); // true
console.log(isPanagram('AbCdEfGhIjKlM zYxWvUtSrQpOn')); // true

// Задача 4. Поверните данную строку в правильном направлении, периодически удаляя одну букву с конца строки и прикрепляя ее к передней части.
let str = 'cat';

function rotateString(str) {
    let tempStr = str;
    for (let i = str.length - 1; i >= 0; i--) {
        tempStr = str[i] + tempStr.substring(0, str.length - 1);
        console.log(tempStr);
    }
}

rotateString(str);
/**
 * Output:
 * tca // 0 1
 * atc // 2 0
 * cat // 1 2
 */

// Задача 5. Создайте функцию alphabetPosition(str) которая принимает строку,
// заменяет буквы на номер их позиции в алфавите
// и возвращает в виде строки как показано в примере

// другие символы игнорируйте их и не включайте в результат.
// "a" = 1, "b" = 2, etc.
// alphabetPosition("The sunset sets at twelve o' clock.")
// "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
function alphabetPosition(str) {
    str = str.toLowerCase();
    let numStr = '';

    for (let char of str) {
        if (char.charCodeAt() - 96 > 0 && char.charCodeAt() < 121) {
            numStr += char.charCodeAt() - 96 + ' ';
        }
    }

    return numStr.substring(0, numStr.length - 1);
}

const string = "The sunset sets at twelve o' clock.";
console.log(alphabetPosition(string));

// Задача 6. Нарисовать елку
function towerBuilder(nFloors) {
    let elka = [];

    for (let i = 0; i < nFloors; i++) {
        elka.push(' '.repeat(nFloors - i - 1) + '*'.repeat(i * 2 + 1) + ' '.repeat(nFloors - i - 1));
    }

    return elka;
}

console.log(towerBuilder(5));

// Задача 7. Удалить повтореяющиеся буквы в строкеe
function deleteRepeatedLetters(str) {
    if (!str) return '';

    let uniqueStr = '';
    str = str.toLowerCase();

    for (let i = 0; i <= str.length - 1; i++) {
        if (str[i] !== str[i + 1]) {
            uniqueStr += str[i];
        }
    }

    return uniqueStr;
}

const str1 = 'Добрыййй вечеррр я диспетчерррр';
console.log(deleteRepeatedLetters(str1));

// Задача 8. RGB to HEX
function rgb(r, g, b) {
    let arrRGB = [r, g, b];
    let arrHEX = arrRGB.map((item) => {
        if (item < 0) return '00';
        if (item > 255) return 'FF';

        let hexItem = item.toString(16).toUpperCase();
        if (hexItem.length < 2) {
            return '0' + item.toString(16).toUpperCase();
        }
        return item.toString(16).toUpperCase();
    });

    return `${arrHEX[0] + arrHEX[1] + arrHEX[2]}`;
}

console.log(rgb(255, 255, 255)); // returns FFFFFF
console.log(rgb(255, 255, 300)); // returns FFFFFF
console.log(rgb(0, 0, 0)); // returns 000000
console.log(rgb(148, 0, 211)); // returns 9400D3

// Задача 9. Напишите функцию generatePassword которая возвращает строку
//   состоящую из двух случайных чисел, двух случайных заглавных букв, двух случайных строчных букв
//   и двух случайных символов из вот этого набора - !@#$%

function generatePassword() {
    const numbers = '0123456789';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%';

    function generateRandStr(str) {
        return str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)];
    }

    const genPass = generateRandStr(numbers) + generateRandStr(upperChars) + generateRandStr(lowerChars) + generateRandStr(symbols);

    return genPass
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
}

console.log(generatePassword()); // for example: '4i%X5uY@'

// Задача 10. Необходимо реализовать функцию, принимающую в аргументах строку,
// состоящую из букв и вернуть новую строку,
// в которой повторяющиеся буквы заменены количеством повторений.

// Например:
// ('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD');
// => 'AV3B3V2XDHJF4D6HA4J3D2SLS3D4'
function repearedLetters(str) {
    let newStr = '';
    let repetitionCounter = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            // console.log(str[i], str[i + 1]);
            repetitionCounter++;
        } else {
            newStr += str[i];
            if (repetitionCounter > 1) {
                newStr += repetitionCounter;
                repetitionCounter = 1;
            }
        }
    }

    return newStr;
}

let str = 'AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD';
console.log(repearedLetters(str)); // AV3B3V2XDHJF4D6HA4J3D2SLS3D4

// Задача 11. Написать функцию, которой передаем имя, и она возраващает приветствие
// в зависимости от времени суток (Доброе утро\день\вечер\ночи userName)
function greetingTimeOfDay(name) {
    let timeNow = 20;

    const timeArr = [0, 6, 12, 18];

    if (timeNow >= timeArr[0]) return `Доброе ночи ${name}`;
    else if (timeNow >= timeArr[1]) return `Доброе утро ${name}`;
    else if (timeNow >= timeArr[2]) return `Доброе день ${name}`;
    else if (timeNow >= timeArr[3]) return `Доброе вечер ${name}`;
}

console.log(greetingTimeOfDay('yourUserName')); // 'Добрый вечер, ____'
