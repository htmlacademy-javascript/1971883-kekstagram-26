import './pictures.js';

import { similarPictures } from './pictures.js';

import { isEscapeKey } from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const minPicturesList = document.querySelectorAll('.picture');

//функция отрисовывает полноразмерную картинку

const closeBigPicture = () => {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const bigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();

    document.removeEventListener('keydown', closeBigPicture);
  }
};

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

    document.addEventListener('keydown', bigPictureEscKeydown);
  });
});

const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');

buttonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});


