/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import {isEscapeKey} from './util.js';
import { fillTheArray } from './data.js';
import {SIZE, MIN_VALUE, STEP} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');

const closeBigPicture = document.querySelector('.big-picture__cancel');

const bigPictureComments = document.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');

const bigPictureDescription = document.querySelector('.social__caption'); //описание фотографий
const socialCommentsCount = document.querySelector('.social__comment-count'); //счётчик комментариев
const commentsLoader = document.querySelector('.comments-loader'); //загрузка новых комментариев
const body = document.querySelector('body');

//Ждем загрузки страницы и только после этого начинаем искать нужный нам элемент и вешать все обработчики

const setOpenFormListener = (renderData) => {

  let socialCommentsCopy = '';


  //Массив всех превьюшек
  const userOpenPictures = document.querySelectorAll('.picture__img');


  userOpenPictures.forEach((previewPicture) => {
    function openBigPicture () {

      //Закрытие большой фотографии
      function closeUserModal () {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
        document.removeEventListener('keydown', onClosePictureClick);
      }
      //8.15 убираем класс у счётчика комментариев и загрузки новых комментариев
      socialCommentsCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');

      closeBigPicture.addEventListener('click', () => {
        closeUserModal();
      });

      //Отображение комментариев
      const getCommentItem = (element) => {
        socialComments.textContent = '';
        const socialComment = document.createElement('li');
        socialComment.classList.add('social__comment');
        const socialCommentImg = document.createElement('img');
        socialCommentImg.classList.add('social__picture');
        socialCommentImg.src = element.avatar;
        socialComment.alt = element.name;
        socialComment.width = SIZE;
        socialComment.height = SIZE;
        socialComment.appendChild(socialCommentImg);
        const socialCommentText = document.createElement('p');
        socialCommentText.classList.add('social__text');
        socialCommentText.textContent = element.message;
        socialComment.appendChild(socialCommentText);
        socialCommentsCopy = socialComment;
      };

      const getSocialComment = (elements) => {
        commentsLoader.classList.remove('hidden');
        const commentFragment = document.createDocumentFragment();
        const secondCommentFragment = document.createDocumentFragment();
        let commentsToShowCount = MIN_VALUE;
        let quantityComment = MIN_VALUE;
        const onLoadCommentsClick = () => {
          socialComments.textContent = '';
          commentsToShowCount += STEP;
          quantityComment += STEP;
          const commentsToShow = elements.slice(0, commentsToShowCount);
          commentsToShow.forEach((element) => {
            getCommentItem(element);
            secondCommentFragment.appendChild(socialCommentsCopy);
            if (element === elements[elements.length - 1]) {
              commentsLoader.classList.add('hidden');
              socialCommentsCount.textContent = `${elements.length} из ${elements.length} комментариев`;
            } else {
              commentsLoader.classList.remove('hidden');
              socialCommentsCount.textContent = `${quantityComment} из ${elements.length} комментариев`;
            }
            return secondCommentFragment;
          });
          socialComments.appendChild(secondCommentFragment);
        };
        onLoadCommentsClick();
        commentsLoader.addEventListener('click', onLoadCommentsClick);
        socialComments.appendChild(commentFragment);
      };

      //Закрытие на клавишу ESC
      const onDocumentEscKeydown = (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          closeUserModal();
        }
      };

      function onClosePictureClick () {
        onDocumentEscKeydown();
      }
      //Поиск в массиве совпадения айди
      const kekstagramPost = renderData.find((element) => element.id === Number(previewPicture.id));
      bigPictureImg.src = kekstagramPost.url;
      bigPictureLikes.textContent = kekstagramPost.likes;
      bigPictureComments.textContent = kekstagramPost.comments.length;
      bigPictureDescription.textContent = kekstagramPost.description;
      bigPicture.classList.remove('hidden');
      getSocialComment(kekstagramPost.comments);
      body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentEscKeydown);
    }

    previewPicture.addEventListener('click', () => {
      openBigPicture();
    });

  });
};
document.addEventListener('DOMContentLoaded', () => {
  setOpenFormListener(fillTheArray);
});
export {setOpenFormListener};
