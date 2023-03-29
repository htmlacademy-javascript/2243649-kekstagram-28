
//import scale.js
//import effects.js

const HASHTAG_MAX_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Введите не более 5 хештегов. Каждый должен начинаться с символа # и может содержать буквы или числа.';
//const COMMENT_MAX_LENGTH = 140;
//const COMMENT_ERROR_TEXT = `Максимальная длина ${MESSAGE_LENGTH} символов`;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const imgUploadFile = document.querySelector('#upload-file');
//const closeImgButton = document.querySelector('#upload--cancel');
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
  //resetScale();
  //resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === textHashtags ||
document.activeElement === textComment;

function onDocumentKeydown (evt) {
  //if (isEscapeKey(evt) && !isTextFieldFocused) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImgEditor();
  }
}

/*const onCancelButtonClick = () => {
  closeImgEditor();
};
*/
const onFileUnputChange = () => {
  openImgEditor();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const checkHashtags = (tags) => tags.length <= HASHTAG_MAX_COUNT;

//const isValidHashtagCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

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
//closeImgButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

