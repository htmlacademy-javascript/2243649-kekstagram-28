const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const createMiniatures = (photos) => {
  photos.forEach(({url, comments, likes, id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.dataset.pictureElementId = id;
    pictureFragment.appendChild(pictureElement);
  });
  return picContainer.appendChild(pictureFragment);
};

export {createMiniatures};


