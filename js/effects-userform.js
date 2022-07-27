import { imgUploadPreviewElement } from './user-form.js';
import { form } from './user-form.js';

const sliderElement = form.querySelector('.effect-level__slider');
const inputValue = form.querySelector('.effect-level__value');
sliderElement.classList.add('hidden');

sliderElement.classList.add('hidden');
imgUploadPreviewElement.style.filter = 'none';
imgUploadPreviewElement.classList = ['img-upload__preview'];

// набор опций каждого слайдера

const sliderOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },

  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },

  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  },

  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },

  heat: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  }
};

// Создает слайдер

noUiSlider.create(sliderElement, {
  range: {min: 0,
    max: 100000000,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

// Функция изменяет эффект по нажатию на радиокнопку

const changeEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effectValue = evt.target.value;
    if (effectValue === 'none') {
      sliderElement.classList.add('hidden');
      imgUploadPreviewElement.style.filter = 'none';
      imgUploadPreviewElement.classList = ['img-upload__preview'];
      return;
    }

    sliderElement.classList.remove('hidden');
    imgUploadPreviewElement.classList = ['img-upload__preview'];
    imgUploadPreviewElement.classList.add(`effects__preview--${effectValue}`);
    sliderElement.noUiSlider.updateOptions(sliderOptions[effectValue]);

    sliderElement.noUiSlider.on('update', () => {
      inputValue.value = sliderElement.noUiSlider.get();
      if (effectValue === 'chrome') {
        imgUploadPreviewElement.style.filter = `grayscale(${inputValue.value})`;
      }

      if (effectValue === 'sepia') {
        imgUploadPreviewElement.style.filter = `sepia(${inputValue.value})`;
      }

      if (effectValue === 'marvin') {
        imgUploadPreviewElement.style.filter = `invert(${inputValue.value}%)`;
      }

      if (effectValue === 'phobos') {
        imgUploadPreviewElement.style.filter = `blur(${inputValue.value}px)`;
      }

      if (effectValue === 'heat') {
        imgUploadPreviewElement.style.filter = `brightness(${inputValue.value})`;
      }
    });
  }
};

// добавляет событие изменения эффекта на радиокнопку

form.addEventListener('change', changeEffect);
