const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview');
const previewImage = preview.querySelector('img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});
