import './pictures.js';
import './big-picture.js';
import './validate-form.js';
import './user-form.js';
import './effects-userform.js';
import './util.js';
import './filter-pictures.js';
import './upload-picture.js';
import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import { setUserFormSubmit } from './user-form.js';
import {closeUserForm} from './user-form.js';
import {filterButtonsConntainer, filterPictures} from './filter-pictures.js';

getData((photos) => {
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterButtonsConntainer.addEventListener('click', (evt) => {
    filterPictures(evt, photos);
  });
});

setUserFormSubmit(closeUserForm);
