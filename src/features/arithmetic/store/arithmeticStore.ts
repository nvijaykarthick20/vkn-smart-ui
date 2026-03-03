import { create } from 'zustand';
import type { ArithmeticState, OperationType, Digits } from '../types';
import { generateQuestions } from '../utils/questionGenerator';

export const useArithmeticStore = create<
  ArithmeticState & {
    setOperationType: (type: OperationType | null) => void;
    setDigits: (digits: Digits | null) => void;
    generateQuestions: (operationType: OperationType, digits: Digits) => void;
    setAnswer: (questionId: number, answer: string) => void;
    setScore: (score: number, correctCount: number) => void;
    setShowResults: (show: boolean) => void;
    resetStore: () => void;
  }
>((set) => ({
  operationType: null,
  digits: null,
  questions: [],
  answers: {},
  score: null,
  correctCount: null,
  showResults: false,
  isLoading: false,

  setOperationType: (type) =>
    set({
      operationType: type,
    }),

  setDigits: (digits) =>
    set({
      digits,
    }),

  generateQuestions: (operationType, digits) => {
    set({ isLoading: true, answers: {} });
    // Simulate async operation
    setTimeout(() => {
      const questions = generateQuestions(operationType, digits, 50);
      set({
        questions,
        isLoading: false,
      });
    }, 500);
  },

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),

  setScore: (score, correctCount) =>
    set({
      score,
      correctCount,
      showResults: true,
    }),

  setShowResults: (show) =>
    set({
      showResults: show,
    }),

  resetStore: () =>
    set({
      operationType: null,
      digits: null,
      questions: [],
      answers: {},
      score: null,
      correctCount: null,
      showResults: false,
      isLoading: false,
    }),
}));
