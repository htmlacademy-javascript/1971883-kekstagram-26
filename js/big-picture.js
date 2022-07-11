import './pictures.js';

import { similarPictures } from './pictures.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const minPicturesList = document.querySelectorAll('.picture');

//функция отрисовывает полноразмерную картинку

minPicturesList.forEach((picture, i) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureOverlay.classList.remove('hidden');

    bigPictureOverlay.querySelector('img').src = similarPictures[i].url;
    bigPictureOverlay.querySelector('.likes-count').textContent = similarPictures[i].likes;
    bigPictureOverlay.querySelector('.comments-count').textContent = similarPictures[i].comments.length;
    bigPictureOverlay.querySelector('.social__caption').textContent = similarPictures[i].description;

    const socialCount = bigPictureOverlay.querySelector('.social__comment-count');
    socialCount.classList.add('hidden');

    const commentsLoader = bigPictureOverlay.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

    const commentsData = similarPictures[i].comments;
    const commentsList = document.querySelector('.social__comments');

    commentsData.forEach(({avatar, message, name}) => {
      const commentElement = bigPictureOverlay.querySelector('.social__comment').cloneNode(true);

      commentElement.querySelector('img').src = avatar;

      commentElement.querySelector('img').alt = name;

      commentElement.querySelector('.social__text').textContent = message;

      commentsList.append(commentElement);
    });

    document.querySelector('body').classList.add('modal-open');
  });
});

const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');

buttonClose.addEventListener('click', () => {
  bigPictureOverlay.classList.add('hidden');
});

const ESC_KEY_NUMBER = 27;

const buttonCloseEvent = (evt) => {
  if (evt.keyCode === ESC_KEY_NUMBER) {
    bigPictureOverlay.classList.add('hidden');
  }
};

document.addEventListener('keydown', buttonCloseEvent);


