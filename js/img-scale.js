import {SCALE_STEP, MAX_SCALE, MIN_SCALE, DEFAULT_SCALE} from './data.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const getimgScale = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

//Уменьшение масштаба
const deleteButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  getimgScale(newValue);
};

//Увеличение масштаба
const addButtonClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  getimgScale(newValue);
};

const resetScale = () => getimgScale(DEFAULT_SCALE);
//{ scaleControlValue.value = getimgScale(DEFAULT_SCALE)};

scaleControlSmaller.addEventListener('click', deleteButtonClick);
scaleControlBigger.addEventListener('click', addButtonClick);

export {resetScale};
