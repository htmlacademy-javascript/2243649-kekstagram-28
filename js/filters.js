import {FILTERS} from './filters-options.js';

const defaultEffect = FILTERS[0];
let chosenEffect = defaultEffect;

const previewImage = document.querySelector('.img-upload__preview img');
const effectsListElements = document.querySelector('.effects');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = effectSlider.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === defaultEffect;

const showSlider = () => {
  effectSlider.classList.remove('hidden');
};

const hideSlider = () => {
  effectSlider.classList.add('hidden');
};

const updateSlider = () => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const resetEffects = () => {
  chosenEffect = defaultEffect;
  previewImage.className = (`effects__preview--${chosenEffect.name}`);
  updateSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = FILTERS.find((effect) => effect.name === evt.target.value);
  previewImage.className = (`effects__preview--${chosenEffect.name}`);
  updateSlider();
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.min,
  step: defaultEffect.step,
  connect: 'lower',
});
hideSlider();

const onSliderUpdate = () => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  previewImage.style.filter = isDefault()
    ? defaultEffect.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectsValue.value = sliderValue;
};

effectsListElements.addEventListener('change', onEffectsChange);
effectSliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
