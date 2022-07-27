
import { isEscapeKey } from './util.js';
import { isValid } from './validate-form.js';
import { sendData } from './api.js';

const DEFAULT_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;

const form = document.querySelector('.img-upload__form');
const uploadFileInputElement = form.querySelector('#upload-file');
const imgUploadOverlayElement = form.querySelector('.img-upload__overlay');
const buttonCloseElement = form.querySelector('#upload-cancel');
const buttonSubmitElement = form.querySelector('#upload-submit');
const buttonScaleSmallerElement = form.querySelector('.scale__control--smaller');
const buttonScaleBiggerElement = form.querySelector('.scale__control--bigger');
const inputScaleControlElement = form.querySelector('.scale__control--value');
const imgUploadPreviewElement = form.querySelector('.img-upload__preview');

let currentScaleValue = DEFAULT_SCALE_VALUE;

inputScaleControlElement.value = `${currentScaleValue  }%`;

const changePreviewScale = () => {
  imgUploadPreviewElement.style.transform = `scale(${currentScaleValue / 100})`;
};

const minusScale = () => {
  if (currentScaleValue > MIN_SCALE_VALUE) {
    inputScaleControlElement.value = `${(currentScaleValue -= SCALE_CHANGE_STEP)  }%`;
    changePreviewScale();
  }
};

const plusScale = () => {
  if (currentScaleValue < MAX_SCALE_VALUE) {
    inputScaleControlElement.value = `${(currentScaleValue += SCALE_CHANGE_STEP)  }%`;
    changePreviewScale();
  }
};

buttonScaleSmallerElement.addEventListener('click', () => {
  minusScale();
});

buttonScaleBiggerElement.addEventListener('click', () => {
  plusScale();
});


const body = document.querySelector('body');

// Функции для вывода успешной загрузки фото
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successMessageSubmitButton = successMessage.querySelector('.success__button');

const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const failMessage = failMessageTemplate.cloneNode(true);
const failMessageSubmitButton = failMessage.querySelector('.error__button');

const hideUploadMessage = (message) => {
  body.removeChild(message);
};

const UploadMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadMessage();

    document.removeEventListener('keydown', hideUploadMessage);
  }
};

const showUploadMessage = (message, messageSubmitButton) => {
  body.append(message);

  message.style.zIndex = '10';

  messageSubmitButton.addEventListener('click', hideUploadMessage);

  document.addEventListener('keydown', UploadMessageEscKeyDown);

  document.addEventListener('click', (evt) => {
    if (!evt.target !== message) {
      hideUploadMessage(message);
    }
  });
};

// Скрывает форму

const closeUserForm = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

// Скрывает форму по нажатию ESC и удаляет прослушиватель

const imgUploadOverlayEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserForm();

    document.removeEventListener('keydown', closeUserForm);
  }
};

// При добавлении в инпут картинки открывает форму редактирования

uploadFileInputElement.addEventListener('change', () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', imgUploadOverlayEscKeyDown);
});

// Клик по крестику закрывает форму редактирования

buttonCloseElement.addEventListener('click', () => {
  closeUserForm();
  uploadFileInputElement.value = '';
  currentScaleValue = DEFAULT_SCALE_VALUE;
  changePreviewScale();
  imgUploadPreviewElement.style.transform = '';
  document.querySelector('.effect-level__slider').classList.add('hidden');
  imgUploadPreviewElement.classList = '';
  imgUploadPreviewElement.style.filter = '';
});

// Функция блокирует нажатие submit

const blockButtonSubmit = () => {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = 'Публикую...';
};

const unblockButtonSubmit = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValid) {
      blockButtonSubmit();
      sendData(
        () => {
          onSuccess();
          unblockButtonSubmit();
          showUploadMessage(successMessage, successMessageSubmitButton);
        },
        () => {
          unblockButtonSubmit();
          closeUserForm();
          showUploadMessage(failMessage, failMessageSubmitButton);
        },
        new FormData(evt.target),
      );
    }
  });
};

export { form };
export {setUserFormSubmit};
export {closeUserForm};
export {imgUploadPreviewElement};
