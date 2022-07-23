
import { isEscapeKey } from './util.js';
import { isValid } from './validate-form.js';
import { sendData } from './api.js';
const form = document.querySelector('.img-upload__form');
const uploadFileInput = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const buttonCloseUploadOverlay = form.querySelector('#upload-cancel');
const buttonSubmit = form.querySelector('#upload-submit');
const buttonScaleControlSmaller = form.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = form.querySelector('.scale__control--bigger');
const inputScaleControl = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview');

const DEFAULT_SCALE_VALUE = 100;
let currentScaleValue = DEFAULT_SCALE_VALUE;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;
inputScaleControl.value = `${currentScaleValue  }%`;

const changePreviewScale = () => {
  imgUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
};

const minusScale = () => {
  if (currentScaleValue > MIN_SCALE_VALUE) {
    inputScaleControl.value = `${(currentScaleValue -= SCALE_CHANGE_STEP)  }%`;
    changePreviewScale();
  }
};

const plusScale = () => {
  if (currentScaleValue < MAX_SCALE_VALUE) {
    inputScaleControl.value = `${(currentScaleValue += SCALE_CHANGE_STEP)  }%`;
    changePreviewScale();
  }
};

buttonScaleControlSmaller.addEventListener('click', () => {
  minusScale();
});

buttonScaleControlBigger.addEventListener('click', () => {
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
  imgUploadOverlay.classList.add('hidden');
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

uploadFileInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', imgUploadOverlayEscKeyDown);
});

// Клик по крестику закрывает форму редактирования

buttonCloseUploadOverlay.addEventListener('click', () => {
  closeUserForm();
  uploadFileInput.value = '';
  document.querySelector('.img-filters__form').reset();
  currentScaleValue = DEFAULT_SCALE_VALUE;
  changePreviewScale();
  imgUploadPreview.style.transform = '';
  document.querySelector('.effect-level__slider').classList.add('hidden');
  imgUploadPreview.classList = '';
  imgUploadPreview.style.filter = '';
});

// Функция блокирует нажатие submit

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
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
export {imgUploadPreview};
