
const isString = function (string, number) {
  if (string.length <= number){
    return true;
  } else {
    return false;
  }
};
isString('проверяемая строка', 20);

const isStringTwo = function (string, number) {
  if (string.length <= number){
    return true;
  } else {
    return false;
  }
};
isStringTwo('проверяемая строка', 18);

const isStringThree = (string, number) => string.length <= number;
isStringThree('проверяемая строка', 10);


function isPalindrome (string) {
  let check = '';
  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }
  // eslint-disable-next-line eqeqeq
  return string == check;
}
isPalindrome('топот');

function isPalindromeTwo (string) {
  string = string.toLowerCase();
  let check = '';
  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }
  // eslint-disable-next-line eqeqeq
  return string == check;
}
isPalindromeTwo('ДовОд');

function isPalindromeTwo (string) {
string = string.toLowerCase();
let check = '';
  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }
  return string == check;
}
isPalindromeTwo('Кекс');

