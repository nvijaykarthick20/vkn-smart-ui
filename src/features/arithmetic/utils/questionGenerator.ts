import type { Question, OperationType, Digits } from '../types';

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNumberRange = (digits: Digits): [number, number] => {
  switch (digits) {
    case 1:
      return [1, 9];
    case 2:
      return [10, 99];
    case 3:
      return [100, 999];
    case 4:
      return [1000, 9999];
  }
};

const calculateAnswer = (num1: number, num2: number, operation: OperationType): number => {
  switch (operation) {
    case 'addition':
      return num1 + num2;
    case 'subtraction':
      return num1 - num2;
    case 'multiplication':
      return num1 * num2;
    case 'division':
      return Math.floor(num1 / num2);
  }
};

export const generateQuestions = (
  operationType: OperationType,
  digits: Digits,
  count: number = 50
): Question[] => {
  const [min, max] = getNumberRange(digits);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let num1 = getRandomNumber(min, max);
    let num2 = getRandomNumber(min, max);

    // For division, ensure the result is a whole number
    if (operationType === 'division') {
      num2 = getRandomNumber(1, 9);
      // Make num1 divisible by num2
      num1 = num2 * getRandomNumber(min, max);
    }

    // For subtraction, ensure result is positive
    if (operationType === 'subtraction' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    const correctAnswer = calculateAnswer(num1, num2, operationType);

    questions.push({
      id: i + 1,
      number1: num1,
      number2: num2,
      operation: operationType,
      correctAnswer,
    });
  }

  return questions;
};
