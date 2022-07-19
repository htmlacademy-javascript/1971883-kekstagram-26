import { checkStringLength } from './util.js';
import { form } from './user-form.js';
const pristine = new Pristine(form);
const hashTagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

// получает массив отдельных хештегов

const getAllHashtags = (value) => (value.trim().toLowerCase().split(' '));

// Возвращает каждый хештег проверенный на регулярное выраженние

const validateHashTag = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return allHAshTAgs.every((hashtag) => re.test(hashtag));
};

pristine.addValidator(hashTagsInput, validateHashTag);

// Возвращает хештеги, которые не повтиоряются

const validateTwiceHashTags = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  return new Set(allHAshTAgs).size === allHAshTAgs.length;
};

pristine.addValidator(hashTagsInput, validateTwiceHashTags);

// Возвращает хештеги, если их доступное количество

const validateQuantityHashTags = (value) => {
  const allHAshTAgs = getAllHashtags(value);
  return allHAshTAgs.length <= 5;
};

pristine.addValidator(hashTagsInput, validateQuantityHashTags);

// Возвращает валидность описания фото

const validateComment = (value) => value.length === 0 || checkStringLength(value, 140);

pristine.addValidator(commentInput, validateComment);

const isValid = () => pristine.validate();

export { isValid };


