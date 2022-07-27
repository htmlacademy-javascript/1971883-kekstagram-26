
import { isEscapeKey } from './util.js';
import { isValid } from './validate-form.js';
import { sendData } from './api.js';

const DEFAULT_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;

const body = document.querySelector('body');
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

// Функции для вывода успешной загрузки фото

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);

const showUploadMessage = (message) => {
  body.append(message);
  const hideUploadMEssage = () => {
    message.remove();
  };
  const submitButtonElement = message.querySelector('button');

  submitButtonElement.addEventListener('click', () => {
    hideUploadMEssage();
  });

  document.addEventListener('keydown', () => {
    if (isEscapeKey) {
      hideUploadMEssage();
    }
  }, {once: true});

  document.addEventListener('click', (evt) => {
    if (!evt.target !== message) {
      hideUploadMEssage();
    }
  }, {once: true});
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
          showUploadMessage(successMessageElement);
        },
        () => {
          unblockButtonSubmit();
          closeUserForm();
          showUploadMessage(errorMessageElement);
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
