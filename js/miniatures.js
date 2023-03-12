const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const createMiniatures = (arraya) => {
  arraya.forEach(({url, description, comments, likes}) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;

    pictureFragment.append(thumbnail);

  });
  return picContainer.append(pictureFragment);
};

export {createMiniatures};
