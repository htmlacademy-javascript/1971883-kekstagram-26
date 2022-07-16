import { isEscapeKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__overlay');

const uploadFileInput = document.querySelector('#upload-file');

const closeButtonForm = imgUploadForm.querySelector('.img-upload__cancel');

const closeUserForm = () => {
  imgUploadForm.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');
};

const imgUploadFormEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUserForm();

    document.removeEventListener('keydown', closeUserForm);
  }
};

uploadFileInput.onchange = () => {
  imgUploadForm.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', imgUploadFormEscKeyDown);
};

closeButtonForm.addEventListener('click', closeUserForm);

