import './pictures.js';
import { isEscapeKey } from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');
const buttonLoadComments = bigPictureOverlay.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const buttonClose = bigPictureOverlay.querySelector('.big-picture__cancel');
const COMMENTS_COUNT = 5;
const visibleCommentsCount = bigPictureOverlay.querySelector('.social__visible-comments-count');
const commentsTemplate = document.querySelector('#comments-template').content.querySelector('.social__comment');

let CurrentComments = [];

// закрывает большую картинку

const closeBigPicture = () => {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

// Событие нажатия ESC при открытой большой картинке

const bigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }

  document.removeEventListener('keydown', closeBigPicture);
};

// создает комментарии по шаблдону

const loadComments = (comments) => {
  if (!comments.length) {
    return;
  }

  comments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.append(commentElement);
  });
};

// подгружает по 5 комментариев

const createMoreComments = () => {
  buttonLoadComments.classList.remove('hidden');
  loadComments(CurrentComments.splice(0, COMMENTS_COUNT));
  visibleCommentsCount.textContent = commentsList.querySelectorAll('.social__comment').length;

  if (!CurrentComments.length) {
    buttonLoadComments.classList.add('hidden');
  }
};

// Подгружает большую картинку

const showBigPictureOverlay = (userPhoto) => {
  bigPictureOverlay.classList.remove('hidden');
  bigPictureOverlay.querySelector('img').src = userPhoto.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = userPhoto.likes;
  bigPictureOverlay.querySelector('.comments-count').textContent = userPhoto.comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = userPhoto.description;

  commentsList.innerHTML = '';

  CurrentComments = [...userPhoto];
  createMoreComments();
  document.addEventListener('keydown', bigPictureEscKeydown);
};

buttonClose.addEventListener('click', () => {
  closeBigPicture();
});

// клик по кнопке Загрузить еще

buttonLoadComments.addEventListener('click', () => createMoreComments());

export { showBigPictureOverlay };
