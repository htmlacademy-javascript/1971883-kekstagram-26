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

export {getRandomNumber, checkStringLength, isEscapeKey};


