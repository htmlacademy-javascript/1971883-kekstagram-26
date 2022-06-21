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

const DESCRIPTIONS = [ // строка — описание фотографии
  'фото на паспорт',
  'я на море',
  'я в горах',
  'грущу',
  'в отпуске',
  'старое фото',
  'новое фото',
  'я дома',
  'покушав',
  'в дороге',
  'красивое место',
  'идеальное преступление',
  'переезд',
  'поставишь лайк - найдешь косарь',
  'если тебе гдте-то не рады в рваных носках, то и в целых туда идти не стоит',
  'я не ною, просто говорю',
  'водка и пивас - полный расколбас',
  'водка, пиво, коньячок - я иду на турничок',
  'когда меня рожали, собственно тогда я и родился',
  'можно сдавать ЕГЭ и ОГЭ, но нельзя сдавать своих пацанов!',
  'карты, деньги, два ствола, три банана, огурец, суп, картошка, холодец, кетчуп, яйца, холодец',
  'расту большой, не стал лапшой',
  'отлицно, когда мамка про сдачу забыла',
  'если моё - значит моё. Если не моё - значит не моё',
  'я похож на Джейсона Стетхема',
];

const COMMENTS_MESSAGES = [ // тексты комментариев
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [ // случайные имена комментаторов
  'Никита',
  'Алексей',
  'Глеб',
  'Артём',
  'Андрей',
  'Даниил',
  'Богдан',
  'Иван',
  'Михаил',
  'Максим',
  'Егор',
  'Макар',
  'Варвара',
  'Софья',
  'Ярослава',
  'Вера',
  'Надежда',
  'Лия',
  'Марта',
  'Мария',
  'Милана',
  'Анастасия',
  'Алёна',
  'Ксения',
  'Дарина'
];

const createIdGenerator = (minNumber, maxNumber) => { // функция возвращает уникальное число из диапазона
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(minNumber, maxNumber);
    if (previousValues.length >= (maxNumber - minNumber + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(minNumber, maxNumber);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];                   // Функция, ищущая случайный элемент в переданном массиве

const createCommentId = createIdGenerator(1, 100); // генерирует ID комментария

const SIMILAR_COMMENT_COUNT = 50; // количество необходимых комментариев

const createComment = () =>  // Функция создает комментарий
  ({
    id: createCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS_MESSAGES),
    name: getRandomArrayElement(NAMES)
  });
const similarComments = Array.from({length: SIMILAR_COMMENT_COUNT}, createComment); // массив готовых сгенерированых комментариев

const createPhotoId = createIdGenerator(1, 25); // генерирует id описаний фотографий

const createPhotoUrlId = createIdGenerator(1, 25);

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25; // Количество сгенерированых описаний фотографий

const createPhotoDescription = () =>  // функция создает описание фото
  ({
    id: createPhotoId(),
    url: `photos/${createPhotoUrlId()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: getRandomArrayElement(similarComments),
  });
const similarPhotos = Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT}, createPhotoDescription); // массив готовых сгенерированых описаний фото

similarPhotos();

