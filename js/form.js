import {isEscapeKey} from './util.js';
import {HASHTAG_MAX_COUNT, VALID_SYMBOLS, TAG_ERROR_TEXT} from './data.js';
import {resetScale} from './img-scale.js';
import {resetEffects} from './filters.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const imgUploadFile = document.querySelector('#upload-file');
const closeImgButton = document.querySelector('#upload-cancel');
const submitButtonElement = form.querySelector('.img-upload__submit');
const body = document.querySelector('body');

const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');

const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы(правильность заполнения полей)
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__field-wrapper__error', //// Класс для элемента с текстом ошибки
});

const openImgEditor = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const closeImgEditor = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textComment;

function onDocumentEscKeydown (evt) {
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

// Блокировка кнопки формы на время ожидания ответа сервера
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

// Разблокировка кнопки формы после получения ответа от сервера
const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

// Показ сообщения об успешной отправке
const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successElement);
    } else {
      const successElementClone = document.querySelector('.success');
      successElementClone.classList.remove('hidden');
    }
  };
};
const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorElement);
    } else {
      const errorElementClone = document.querySelector('.error');
      errorElementClone.classList.remove('hidden');
    }
  };
};

const showFullErrorMessage = showErrorMessage();

// Скрыть показ успешной/ошибочной отправки
const hideModalMessage = () => {
  successElement.classList.add('hidden');
  errorElement.classList.add('hidden');
};

// Закрытие сообщения об успешной/ошибочной отправке при клике на body
const closeModalMessageWithClickOnBody = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
};

// Закрытие сообщения об успешной/ошибочной отправке при клике кнопку
const closeModalMessageWithClickOnButton = () => {
  hideModalMessage();
};

// Закрытие сообщения об успешной/ошибочной отправке при нажатии Esc
const closeModalMessageWithPressEsc = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
  }
};

// Отправка формы
const onFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      successButtonElement.addEventListener('click', closeModalMessageWithClickOnButton);
      errorButtonElement.addEventListener('click', closeModalMessageWithClickOnButton);
      document.addEventListener('keydown', closeModalMessageWithPressEsc);
      document.addEventListener('click', closeModalMessageWithClickOnBody);
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

imgUploadFile.addEventListener('change',onFileUnputChange);
closeImgButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

export {onFormSubmit, closeImgEditor, onDocumentEscKeydown, showFullSuccessMessage ,showFullErrorMessage};
