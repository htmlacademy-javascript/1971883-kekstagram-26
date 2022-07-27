import { checkStringLength } from './util.js';
import { form } from './user-form.js';
const MAX_HASHTAGS = 5;
const DESCRIPTION_LETTER_LENGTH = 140;
const hashTagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'text__input',
  errorTextParent: 'text__input',
  errorTextClass: 'error-text'
});

// получает массив отдельных хештегов

const getAllHashtags = (value) => (value.trim().toLowerCase().split(' '));

// Возвращает каждый хештег проверенный на регулярное выраженние

const validateHashTag = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return allHAshTAgs.every((hashtag) => re.test(hashtag));
};

pristine.addValidator(hashTagsInput, validateHashTag, 'Хештег начинается с решётки. Максимальная длина хештега - 20 символов. Используйте только буквы и цифры', 1, false);

// Возвращает хештеги, которые не повтиоряются

const validateTwiceHashTags = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  return new Set(allHAshTAgs).size === allHAshTAgs.length;
};

pristine.addValidator(hashTagsInput, validateTwiceHashTags, 'Хештеги не должны повторяться', 1, false);

// Возвращает хештеги, если их доступное количество

const validateQuantityHashTags = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  return allHAshTAgs.length <= MAX_HASHTAGS;
};

pristine.addValidator(hashTagsInput, validateQuantityHashTags, 'Разрешено не больше 5 хеш-тегов. Хештеги разделяются 1 пробелом', 1, false);

// Возвращает валидность описания фото

const validateComment = (value) => value.length === 0 || checkStringLength(value, DESCRIPTION_LETTER_LENGTH);

pristine.addValidator(commentInput, validateComment, 'В описании должно быть не больше 140 символов', 1, false);

const isValid = () => pristine.validate();

export { isValid };
