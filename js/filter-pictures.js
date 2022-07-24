import {renderPhotos} from './pictures.js';
import { debounce } from './util.js';
import {picturesList} from './pictures.js';
import { getRandomNumber } from './util.js';

const FIRST_INDEX = 0;
const LAST_INDEX = 10;
const RENDER_TIME = 500;
const randomClass = 'filter-random';
const discussedClass = 'filter-discussed';
const filterButtonsConntainer = document.querySelector('.img-filters');

const pickFilter = (currentFilter) => {
  const pictures = picturesList.querySelectorAll('.picture');
  pictures.forEach((picture) => picturesList.removeChild(picture));
  renderPhotos(currentFilter);
};

const filterDebounce = debounce(pickFilter, RENDER_TIME);

const filterPictures = (evt, photos) => {
  const filterOptionButtons = filterButtonsConntainer.querySelectorAll('.img-filters__button');
  const getDiscussedPictureElements = photos.slice().sort((nextItem, currentItem) => currentItem.comments.length - nextItem.comments.length);
  const getRandomPictureElements = photos.slice().sort((item) => item.id - getRandomNumber(FIRST_INDEX, photos.length - 1)).slice(FIRST_INDEX, LAST_INDEX);
  const target = evt.target.closest('.img-filters__button');
  const targetId = target.id;

  filterOptionButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');

  switch (targetId) {
    case randomClass:
      filterDebounce(getRandomPictureElements);
      break;
    case discussedClass:
      filterDebounce(getDiscussedPictureElements);
      break;
    default:
      filterDebounce(photos);
      break;
  }
};

export {filterPictures, filterButtonsConntainer};
