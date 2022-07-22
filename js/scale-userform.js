import { form } from './user-form.js';
const buttonScaleControlSmaller = form.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = form.querySelector('.scale__control--bigger');
const inputScaleControl = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview');

let defaultScaleValue = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;
inputScaleControl.value = `${defaultScaleValue  }%`;

const changePrewiewScale = () => {
  imgUploadPreview.style.transform = `scale(${defaultScaleValue / 100})`;
};

const minusScale = () => {
  if (defaultScaleValue > MIN_SCALE_VALUE) {
    inputScaleControl.value = `${(defaultScaleValue -= SCALE_CHANGE_STEP)  }%`;
    changePrewiewScale();
  }
};

const plusScale = () => {
  if (defaultScaleValue < MAX_SCALE_VALUE) {
    inputScaleControl.value = `${(defaultScaleValue += SCALE_CHANGE_STEP)  }%`;
    changePrewiewScale();
  }
};

buttonScaleControlSmaller.addEventListener('click', () => {
  minusScale();
});

buttonScaleControlBigger.addEventListener('click', () => {
  plusScale();
});

export { imgUploadPreview };
