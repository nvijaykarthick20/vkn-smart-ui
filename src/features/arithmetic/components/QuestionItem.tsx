import { useArithmeticStore } from '../store/arithmeticStore';
import type { Question } from '../types';
import styles from './QuestionItem.module.css';

interface QuestionItemProps {
  question: Question;
  value: string;
  hasError: boolean;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, value, hasError }) => {
  const setAnswer = useArithmeticStore((state) => state.setAnswer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d*$/.test(newValue)) {
      setAnswer(question.id, newValue);
    }
  };

  const getOperationSymbol = (): string => {
    const symbols: Record<string, string> = {
      addition: '+',
      subtraction: '−',
      multiplication: '×',
      division: '÷',
    };
    return symbols[question.operation];
  };

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionNumber}>{question.id}</div>
      <div className={styles.questionContent}>
        <div className={styles.questionText}>
          {question.number1} {getOperationSymbol()} {question.number2}
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.equalSign}>=</span>
        <input
          type="text"
          inputMode="numeric"
          className={`${styles.input} ${hasError && !value ? styles.error : ''}`}
          value={value}
          onChange={handleChange}
          placeholder="?"
        />
      </div>
    </div>
  );
};
