import {HASHTAG_MAX_COUNT, VALID_SYMBOLS, TAG_ERROR_TEXT} from './data.js';
//import {stoppedPropagation} from './util.js';
import {resetScale} from './img-scale.js';
import {resetEffects} from './filters.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const imgUploadFile = document.querySelector('#upload-file');
const closeImgButton = document.querySelector('#upload-cancel');
//const errorMessage = document.querySelector('#error').content.querySelector('.error');
//const errorButtonElement = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы(правильность заполнения полей)
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__field-wrapper__error', //// Класс для элемента с текстом ошибки
});

const openImgEditor = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImgEditor = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textComment;

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImgEditor();
  }
}

const onCancelButtonClick = () => {
  closeImgEditor();
};

const onFileUnputChange = () => {
  openImgEditor();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const checkHashtags = (tags) => tags.length <= HASHTAG_MAX_COUNT;

//Проверка уникальности хэштегов
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Проверка валидности каждого отдельного тега
const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return checkHashtags(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  textHashtags,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};


//textHashtags.addEventListener('keydown', stoppedPropagation);
//textComment.addEventListener('keydown', stoppedPropagation);
imgUploadFile.addEventListener('change',onFileUnputChange);
closeImgButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

