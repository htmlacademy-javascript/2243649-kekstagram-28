import {getRandomArrayNumber, getRandomNumber, createIdGenerator} from './util.js';

const SIZE = 35;
const MIN_VALUE = 0;
const STEP = 5;

const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 20;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const IDS = [];
for(let i = 1;i <= 25;i++){
  IDS.push(i);
}

const FILLTHEARRAY_COUNT = 25;

const DESCRIPTIONS = [
  'Выходные на озере',
  'Берлин после дождя',
  'Люблю пятницу',
  'Поели, можно и поспать',
  'Это я в Дубаи я ща отдыхаю',
  'И мое сердце остановилось, мое сердце замерло',
  'Привет, 2023',
  'Немного наших будней вам в ленту',
  'Красиво жить не запретишь'];

const NAMES = ['Владимир', 'Мария', 'Алексей', 'Елена', 'София', 'Матвей'];

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayNumber(COMMENTS),
  name: getRandomArrayNumber(NAMES)
});

const createElement = () => ({
  id: generatePhotoId(IDS),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayNumber(DESCRIPTIONS),
  likes: getRandomNumber(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomNumber(1, COMMENT_COUNT)}, createComment)
});

//Функция для создания массивов с данными
const fillTheArray = Array.from({length: FILLTHEARRAY_COUNT}, createElement);

export {fillTheArray};
export {SIZE};
export {MIN_VALUE};
export {STEP};
