// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber < 0 || maxNumber < 0) {
    return 'Ошибка. диапазон чисел может быть только положительный, включая 0';
  }

  if (minNumber >= maxNumber) {
    return Math.floor(Math.random() * (minNumber - maxNumber + 1)) + maxNumber;  // При обратном условии вычетает из минимального максимальное
  }

  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

getRandomNumber(1, 10);

// Функция для проверки максимальной длины строки

const checkStringLength = (checkingString, maxStringLength) => {
  if (checkingString.length > maxStringLength) {
    return false;
  }

  return true;
};

checkStringLength('dskafgdnsaggkn', 25);

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorBlock = document.createElement('div');

// функции для выода ошибки загрузки сайта
const body = document.querySelector('body');

const hideError = () => {
  errorBlock.classList.add('hidden');
};

const hideErrorPureFiveSeconds = () => setTimeout(hideError, 5000);

const showError = (text) => {
  body.append(errorBlock);
  errorBlock.textContent = text;
  errorBlock.style.padding = '60px 60px';
  errorBlock.style.textAlign = 'center';
  errorBlock.style.background = 'red';
  errorBlock.style.color = 'white';
  errorBlock.style.position = 'absolute';
  errorBlock.style.top = '0';
  errorBlock.style.left = 'center';
  errorBlock.style.fontSize = '30px';
  errorBlock.style.border = '3px white solid';
  errorBlock.style.zIndex = '10';
  hideErrorPureFiveSeconds();
};
export {getRandomNumber, checkStringLength, isEscapeKey, showError, body};


