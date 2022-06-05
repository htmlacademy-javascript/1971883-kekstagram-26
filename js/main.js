// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomNumber = function (minNumber, maxNumber) {
  if (minNumber < 0 || maxNumber < 0) {
    return console.log('Ошибка. диапазон чисел может быть только положительный, включая 0')
  };

  if (minNumber >= maxNumber) {
    return Math.floor(Math.random() * (minNumber - maxNumber + 1)) + maxNumber  // При обратном условии вычетает из минимального максимальное
  };

  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

// Функция для проверки максимальной длины строки

const checkStringLength = function (checkingString, maxStringLength) {
  if (checkingString.length > maxStringLength) {
    return false;
  };

  return true;
};


