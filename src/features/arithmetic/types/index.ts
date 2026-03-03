export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type Digits = 1 | 2 | 3 | 4;

export interface Question {
  id: number;
  number1: number;
  number2: number;
  operation: OperationType;
  correctAnswer: number;
}

export interface QuestionAnswer {
  questionId: number;
  userAnswer: string;
}

export interface ArithmeticState {
  operationType: OperationType | null;
  digits: Digits | null;
  questions: Question[];
  answers: Record<number, string>;
  score: number | null;
  correctCount: number | null;
  showResults: boolean;
  isLoading: boolean;
}

export interface ScoreResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
}
