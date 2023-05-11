'use strict';
// Переменные
// isPlugged включен ли чайник в сеть
// isOn - включен ли чайник в режим кипечения
// water количество воды в чайнике
// temp температура воды

// Функционал чайника
// [X] plugOnOff() выключить/выключить из сети чайник
// [X] powerButton() включить/выключить кипячение
// [X] waterLevel() проверить уровень воды в чайнике

// Функционал не связанный с чайником
// [X] addWater(ml) налить воды в чайник
// [X] removeWater(ml) вылить воды из чайника
// [X] coolingDown() остывание воды

function Teapot() {
    // Основные переменные
    this.isPlugged = false;
    this.isOn = false;
    this.water = 0;
    this.temp = 20;

    // Доп переменные
    this.coolingUpID = undefined; // id setInterval для кипячения
    this.coolingDownID = undefined;
    this.isBoiled = false; // кипяченная ли вода

    this.plugOnOff = () => {
        clearInterval(this.coolingDownID);
        clearInterval(this.coolingUpID);
        this.isOn = false;

        if (this.isPlugged) {
            this.isPlugged = false;
            this.coolingDown();

            console.log(`Чайник отключен от сети ↑`);
        } else {
            this.isPlugged = true;
            console.log(`Чайник в сети ↑`);
        }
    };

    this.powerButton = () => {
        clearInterval(this.coolingDownID);
        clearInterval(this.coolingUpID);

        this.isOn ? (this.isOn = false) : (this.isOn = true);

        if (this.isPlugged && this.isOn && this.water > 0) {
            this.isBoiled = true;

            this.coolingUpID = setInterval(() => {
                if (this.temp === 49) {
                    clearInterval(this.coolingUpID);

                    this.isOn = false;
                    this.coolingDown();
                }

                this.temp++;

                console.log(`Кипячение ${this.temp}C ↓`);
            }, 200);
        } else if (this.water <= 0) {
            this.isOn = false;

            console.log(`Налейте воды ↑`);
        } else if (!this.isPlugged) {
            if (this.temp > 20) this.coolingDown();

            console.log(`Питания нет, подключите чайник к сети ↑`);
        } else {
            this.isBoiled = true;
            if (this.temp > 20) this.coolingDown();

            console.log(`Кипячение остановленно ${this.temp}C ↑`);
        }
    };

    this.coolingDown = () => {
        if (this.isBoiled && this.temp > 20) {
            this.coolingDownID = setInterval(() => {
                if (this.temp === 21) {
                    clearInterval(this.coolingDownID);
                    this.isBoiled = false;
                }

                this.temp--;

                console.log(`Остывание ${this.temp}C ↑`);
            }, 200);
        }
    };

    this.addWater = (ml) => {
        this.water += ml;
        this.temp = 20;

        if (this.water > 2000) {
            this.water = 2000;

            console.log(`Чайник полный, вы пролили мимо часть воды`);
        } else {
            console.log(`Вы налили ${ml} мл, текущий уровень воды ${this.water} мл`);
        }
    };

    this.removeWater = (ml) => {
        this.water -= ml;

        if (this.water > 0) {
            console.log(`Вы вылили  ${ml} мл, Текущий уровень воды ${this.water} мл`);
        } else {
            this.water = 0;
            this.powerButton();

            console.log(`Чайник пустой ↑`);
        }
    };

    this.waterLevel = () => {
        console.log(this.water);
    };
}

let DEXP = new Teapot();

// // Водичка
// DEXP.plugOnOff();
// DEXP.addWater(1000);
// DEXP.addWater(1200);
// DEXP.removeWater(12500);
// DEXP.waterLevel();
// DEXP.removeWater(1500);
// DEXP.plugOnOff();
// DEXP.powerButton();

// // Включаем чайник во время остывания
// DEXP.plugOnOff();
// DEXP.addWater(1000);
// DEXP.powerButton();
// setTimeout(DEXP.powerButton, 8000);

// // Выдергиваем вилку
// DEXP.plugOnOff();
// DEXP.powerButton();
// setTimeout(DEXP.plugOnOff, 1500);
// setTimeout(DEXP.plugOnOff, 2000);
// setTimeout(() => DEXP.addWater(100), 2200);
// setTimeout(DEXP.powerButton, 3000);
// setTimeout(DEXP.plugOnOff, 5000);
// setTimeout(DEXP.powerButton, 5900);

// Спамим кнопкой включения
DEXP.plugOnOff();
DEXP.powerButton();
DEXP.addWater(1000);
setTimeout(DEXP.powerButton, 1500);
setTimeout(DEXP.powerButton, 2000);
setTimeout(() => DEXP.addWater(1000), 2500);
setTimeout(DEXP.powerButton, 4000);
setTimeout(() => DEXP.addWater(1000), 4500);
setTimeout(DEXP.powerButton, 5500);
setTimeout(() => DEXP.removeWater(3000), 6500);
setTimeout(() => DEXP.addWater(1000), 7500);
setTimeout(DEXP.powerButton, 9000);
setTimeout(DEXP.plugOnOff, 11000);
