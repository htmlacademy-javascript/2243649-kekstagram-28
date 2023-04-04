import {ALERT_SHOW_TIME} from './data.js';

// Функция получения случайного числа
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Получение случайного числа из массива
const getRandomArrayNumber = (elements) => elements[getRandomNumber(0, elements.length - 1)];

//Функция для генерации ID изображений
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//Функция для уникального числа
const getUniqueNumber = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length > (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//Функция проверки нажатой клавиши ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Вывод сообщения об ошибке
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomArrayNumber, getRandomNumber, getUniqueNumber, createIdGenerator,isEscapeKey, showAlert};
