import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');

const uploadFileInput = form.querySelector('#upload-file');

const imgUploadOverlay = form.querySelector('.img-upload__overlay');

const buttonCloseUploadOverlay = form.querySelector('#upload-cancel');

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

buttonCloseUploadOverlay.addEventListener('click', closeUserForm);

export { form };
