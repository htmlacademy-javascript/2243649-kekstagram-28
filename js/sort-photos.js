import { createMiniatures } from './miniatures.js';
import { debounce } from './util.js';
import { openBP } from './open-picture.js';

const RANDOM_PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

const compareCommentsLength = (picA, picB) => picB.comments.length - picA.comments.length;

const clearPictures = () => {
  const pictureElements = picturesContainer.querySelectorAll('.picture');

  pictureElements.forEach((pictureElement) => {
    picturesContainer.removeChild(pictureElement);
  });
};


const getRandomPhotos = (photos) => {
  const randomPhotos = [];

  while (randomPhotos.length < RANDOM_PICTURE_COUNT) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    if (!randomPhotos.includes(randomPhoto)) {
      randomPhotos.push(randomPhoto);
    }
  }

  return randomPhotos;
};

const getSortedPhotos = (photos) => {

  const SortedPhotos = photos.slice().sort(compareCommentsLength);

  return SortedPhotos;
};

const getFiltersClassChange = () => {

  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!target.classList.contains('img-filters__button')) {
      return;
    }

    imgFiltersButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    target.classList.add('img-filters__button--active');
  });
};

const debouncedPhotoRender = debounce((photos) => {
  clearPictures();
  createMiniatures(photos);
  openBP(photos);
}, RERENDER_DELAY);

const getFiltersRender = (photos) => {

  imgFiltersForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.id === 'filter-default') {
      debouncedPhotoRender(photos);
    }
    if (target.id === 'filter-random') {
      debouncedPhotoRender(getRandomPhotos(photos));
    }
    if (target.id === 'filter-discussed') {
      debouncedPhotoRender(getSortedPhotos(photos));
    }
  });
};

export { getFiltersClassChange, getFiltersRender };

/*const gallery = document.getElementById('.pictures');
const defaultBtn = document.getElementById('#filter-default');
const randomBtn = document.getElementById('#filter-random');
const popularBtn = document.getElementById('#filter-discussed');

let debounceTimeout = null;

// Функция для очистки галереи
function clearGallery() {
  gallery.innerHTML = '';
}

// Функция для отрисовки списка фотографий
function renderGallery(photos) {
  clearGallery();
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.url;
    gallery.appendChild(img);
  });
}

// Функция для получения случайного списка фотографий
function getRandomPhotos(photos, count) {
  const randomPhotos = [];
  while (randomPhotos.length < count && randomPhotos.length < photos.length) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    if (!randomPhotos.includes(photos[randomIndex])) {
      randomPhotos.push(photos[randomIndex]);
    }
  }
  return randomPhotos;
}

// Функция для сортировки фотографий по количеству комментариев
function sortPhotosByComments(photos) {
  return photos.sort((a, b) => b.comments - a.comments);
}

// Функция для обновления галереи с задержкой в 500 миллисекунд
function updateGalleryWithDebounce(filterFunction) {
  // Очищаем предыдущий таймер debounce
  clearTimeout(debounceTimeout);
  // Запускаем новый таймер debounce
  debounceTimeout = setTimeout(() => {
    //getPhotosFromServer()
    createMiniatures()
      .then(photos => filterFunction(photos))
      .then(photos => renderGallery(photos));
  }, 500);
}

// Обработчик клика на кнопку "По умолчанию"
defaultBtn.addEventListener('click', () => {
  updateGalleryWithDebounce(photos => photos);
});

// Обработчик клика на кнопку "Случайные"
randomBtn.addEventListener('click', () => {
  updateGalleryWithDebounce(photos => getRandomPhotos(photos, 10));
});

// Обработчик клика на кнопку "Обсуждаемые"
popularBtn.addEventListener('click', () => {
  updateGalleryWithDebounce(photos => sortPhotosByComments(photos));
});
*/

