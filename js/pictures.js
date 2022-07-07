import {similarPhotos} from './data.js';

const picturesList = document.querySelector('.pictures');

const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = similarPhotos();

similarPictures.forEach(({url, likes, comments}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = url;

  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesList.appendChild(pictureElement);
});
