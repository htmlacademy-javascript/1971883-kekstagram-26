import { showBigPictureOverlay } from './big-picture.js';

const picturesList = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotos = (photos) => {
  photos.forEach((userPhoto) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = userPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = userPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = userPhoto.comments.length;
    picturesList.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      showBigPictureOverlay(userPhoto);
    });
  });
};

export { renderPhotos };
