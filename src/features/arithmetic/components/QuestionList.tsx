import { useNavigate } from 'react-router-dom';
import { useArithmeticStore } from '../store/arithmeticStore';
import { calculateScore } from '../utils/scoreCalculator';
import { QuestionItem } from './QuestionItem';
import styles from './QuestionList.module.css';

interface Question {
  id: number;
  number1: number;
  number2: number;
  operation: string;
}

export const QuestionList: React.FC = () => {
  const navigate = useNavigate();
  const questions = useArithmeticStore((state) => state.questions);
  const answers = useArithmeticStore((state) => state.answers);
  const setScore = useArithmeticStore((state) => state.setScore);

  // Count only answers that have actual values (not empty strings)
  const filledAnswers = Object.values(answers).filter((answer) => answer && answer.trim() !== '').length;
  const totalQuestions = questions.length;
  const progressPercentage = (filledAnswers / totalQuestions) * 100;
  const allAnswered = filledAnswers === totalQuestions;

  const getOperationSymbol = (op: string): string => {
    const symbols: Record<string, string> = {
      addition: '+',
      subtraction: '−',
      multiplication: '×',
      division: '÷',
    };
    return symbols[op];
  };

  const handlePrint = () => {
    window.print();
  };

  const onSubmit = () => {
    if (allAnswered) {
      const result = calculateScore(questions, answers);
      setScore(result.score, result.correctCount);
      setTimeout(() => {
        navigate('/arithmetic/results');
      }, 0);
    }
  };

  return (
    <div className={styles.questionListWrapper}>
      <div className={styles.questionList}>
        <div className={styles.header}>
          <h2 className={styles.title}>Step 2: Answer Questions</h2>
          <button className={styles.printBtn} onClick={handlePrint} title="Print all questions">
            🖨️ Print
          </button>
        </div>
        <div className={styles.progress}>
          <span>
            {filledAnswers} / {totalQuestions}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${Math.min(progressPercentage, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className={styles.questionsContainer}>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              value={answers[question.id] || ''}
              hasError={!allAnswered && !answers[question.id]}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate('..')}
          >
            ← Back
          </button>
          <button
            type="button"
            className={styles.submitButton}
            disabled={!allAnswered}
            onClick={onSubmit}
          >
            Submit & Check Answers
          </button>
        </div>
      </div>

      {/* Hidden Print Container - All 50 Questions */}
      <div className={styles.printContainer}>
        <div className={styles.printHeader}>
          <h1 className={styles.printTitle}>Arithmetic Practice Worksheet</h1>
          <p className={styles.printInstructions}>Answer all 50 questions</p>
        </div>

        <div className={styles.printQuestionsGrid}>
          {questions.map((question: Question) => (
            <div key={question.id} className={styles.printQuestionItem}>
              <div className={styles.printQuestionNumber}>{question.id}</div>
              <div className={styles.printQuestionContent}>
                <div className={styles.printQuestionText}>
                  {question.number1} {getOperationSymbol(question.operation)} {question.number2}
                </div>
              </div>
              <div className={styles.printInputWrapper}>
                <span className={styles.printEqualSign}>=</span>
                <span className={styles.printAnswerLine}>______</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
