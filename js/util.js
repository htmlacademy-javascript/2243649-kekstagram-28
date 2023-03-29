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

//Отмена обработчика Esc при фокусе
const stoppedPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

export {getRandomArrayNumber, getRandomNumber, getUniqueNumber, createIdGenerator,isEscapeKey, stoppedPropagation};
