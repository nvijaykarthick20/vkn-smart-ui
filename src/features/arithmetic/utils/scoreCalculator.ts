import type { Question, ScoreResult } from '../types';

export const calculateScore = (
  questions: Question[],
  answers: Record<number, string>
): ScoreResult => {
  let correctCount = 0;
  const totalQuestions = questions.length;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    if (userAnswer && parseInt(userAnswer, 10) === question.correctAnswer) {
      correctCount++;
    }
  });

  const marksPerQuestion = 2;
  const score = correctCount * marksPerQuestion;

  return {
    score,
    correctCount,
    totalQuestions,
  };
};
