import './pictures.js';
import './big-picture.js';
import './validate-form.js';
import './user-form.js';
import './effects-userform.js';
import './util.js';
import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import { setUserFormSubmit } from './user-form.js';
import {closeUserForm} from './user-form.js';

getData((photos) => {
  renderPhotos(photos);
});

setUserFormSubmit(closeUserForm);
