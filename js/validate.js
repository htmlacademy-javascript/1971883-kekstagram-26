const form = document.querySelector('.img-upload__form');

const hashTagsInput = form.querySelector('.text__hashtags');

const buttonSubmit = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form);

const checkCountHashTags = (inputValue) => inputValue.trim() // проверка на количество хештегов (не более 5)
  .split(' ')
  .filter((word) => word !== '')
  .length <= 5;

pristine.addValidator(hashTagsInput, checkCountHashTags);


const checkSpacesHashTags = (inputValue) => { // проверка на разделение 1 пробелом
  if (inputValue === '') {
    return true;
  }

  return inputValue.trim().split(' ').some((word) => word === '');
};

pristine.addValidator(hashTagsInput, checkSpacesHashTags);

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const hashTagValidation = new RegExp(re);

const isValidHashTag = (hashTag) => hashTagValidation.test(hashTag); // проверка 1 хештега на соответстствие RE

const checkAllHashTAgsIsValid = (inputValue) => { // проверка валидности всех хештегов
  if (inputValue === '') {
    return true;
  }

  return inputValue.trim()
    .split(' ')
    .filter((word) => word !== '')
    .every(isValidHashTag);
};

pristine.addValidator(hashTagsInput, checkAllHashTAgsIsValid);

const checkEndSpaceHashTag = (inputValue) => !inputValue.endsWith(' '); // проверка наличия пробелов в конце

pristine.addValidator(hashTagsInput, checkEndSpaceHashTag);

const checkHashTagGrid = (inputValue) => { // проверка начала хештега с решетки
  if (inputValue === '') {
    return true;
  }
  return inputValue.trim().split(' ').filter((word) => word !== '').every((word) => word.startsWith('#'));
};

pristine.addValidator(hashTagsInput, checkHashTagGrid);

const checkDuplicatesHashTags = (inputValue) => { // проверка на дубликаты хештегов
  const hashtags = inputValue.trim().toLowerCase().split(' ').filter((word) => word !== '');
  const onceHashtags = new Set(hashtags);
  return onceHashtags.size === hashtags.length;
};

pristine.addValidator(hashTagsInput, checkDuplicatesHashTags);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
});
