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

function isPalindromeThree (string) {
string = string.toLowerCase();
let check = '';
  for (let i = string.length - 1; i >= 0; i--) {
    check += string[i];
  }
  return string == check;
}
isPalindromeThree('Кекс');

const getTypeNumber = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
  if (!Number.isNaN(parseInt(string.at(i), 10))) {
  result += string.at(i);
  }
  }
  return parseInt(result, 10);
  }

  getTypeNumber('2023 год')


  const getTypeNumberTwo = (string) => {
    let result = '';
    for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
    result += string.at(i);
    }
    }
    return parseInt(result, 10);
    }

  getTypeNumberTwo('ECMAScript 2022')

  const getTypeNumberThree = (string) => {
    let result = '';
    for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
    result += string.at(i);
    }
    }
    return parseInt(result, 10);
    }

  getTypeNumberThree('1 кефир, 0.5 батона')


  const getTypeNumberFour = (string) => {
    let result = '';
    for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
    result += string.at(i);
    }
    }
    return parseInt(result, 10);
    }

  getTypeNumberFour('а я томат')

  const solutionOne = (string, minLength, pad) => {
    const actualPad = minLength - string.length;
    if (actualPad<=0) {
      return string;
    }
    return pad.slice(0,actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
  }
  solutionOne('1', 2, '0')

  const solutionTwo = (string, minLength, pad) => {
    const actualPad = minLength - string.length;
    return actualPad <= 0
    ? string
    : pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
  }

  solutionTwo('1',4,'0')

  const solutionThree = (string, minLength, pad) => {
    const actualPad = minLength - string.length;
    if (actualPad<=0) {
      return string;
    }
    return pad.slice(0,actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
  }
  solutionThree('q', 4, 'werty')

  const solutionFour = (string, minLength, pad) => {
    const actualPad = minLength - string.length;
    if (actualPad<=0) {
      return string;
    }
    return pad.slice(0,actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
  }
  solutionFour('q', 4, 'we')

  const solutionFive = (string, minLength, pad) => {
    const actualPad = minLength - string.length;
    if (actualPad<=0) {
      return string;
    }
    return pad.slice(0,actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
  }
  solutionFive('qwerty', 4, '0')
