const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  // eslint-disable-next-line space-infix-ops
  const result = Math.random() * (upper-lower+1) + lower;
  return Math.floor(result);
};

const getRandomArrayNumber = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomArrayNumber};
