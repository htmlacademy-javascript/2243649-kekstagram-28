const IDS = [];
for(let i = 1;i <= 25;i++){
  IDS.push(i);
}

const URLS = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
];

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

const LIKES = [];
for(let j = 15;j <= 200;j++){
  LIKES.push(j);
}

const COMMENTS = [
  {
    id: 1325,
    avatar: 'img/avatar-1.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Леша',
  },
  {
    id: 1326,
    avatar: 'img/avatar-2.svg',
    message: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    name: 'Женя',
  }
];

const FILLTHEARRAY_COUNT = 25;

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  // eslint-disable-next-line space-infix-ops
  const result = Math.random() * (upper-lower+1) + lower;
  return Math.floor(result);
};

const getRandomArrayNumber = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createElement = () => ({
  id: getRandomArrayNumber(IDS),
  url: getRandomArrayNumber(URLS),
  description: getRandomArrayNumber(DESCRIPTIONS),
  like: getRandomArrayNumber(LIKES),
  comment: getRandomArrayNumber(COMMENTS),
});

const fillTheArray = Array.from({length: FILLTHEARRAY_COUNT}, createElement);
// eslint-disable-next-line no-console
console.log(fillTheArray);
