import { useNavigate } from 'react-router-dom';
import { useArithmeticStore } from '../store/arithmeticStore';
import styles from './ResultCard.module.css';

export const ResultCard: React.FC = () => {
  const navigate = useNavigate();
  const score = useArithmeticStore((state) => state.score);
  const correctCount = useArithmeticStore((state) => state.correctCount);
  const questions = useArithmeticStore((state) => state.questions);
  const answers = useArithmeticStore((state) => state.answers);
  const resetStore = useArithmeticStore((state) => state.resetStore);

  if (!questions.length) {
    return <div className={styles.result}>Loading results...</div>;
  }

  const totalQuestions = questions.length;
  const incorrectCount = totalQuestions - (correctCount || 0);
  const percentage = ((correctCount || 0) / totalQuestions) * 100;

  const getPerformanceMessage = (): string => {
    if (!percentage) return 'Keep practicing!';
    if (percentage === 100) return '🎉 Perfect Score! Outstanding!';
    if (percentage >= 80) return '🌟 Excellent Work!';
    if (percentage >= 60) return '👍 Good Job!';
    if (percentage >= 40) return '💪 Keep Practicing!';
    return '🤔 Let\'s review and try again!';
  };

  const handleRetry = () => {
    resetStore();
    navigate('..');
  };

  const handleHome = () => {
    resetStore();
    navigate('/');
  };

  return (
    <div className={styles.resultWrapper}>
      <div className={styles.result}>
        <div className={styles.header}>
          <h2 className={styles.congratulations}>{getPerformanceMessage()}</h2>
        </div>

        <div className={styles.scoreContainer}>
          <div className={styles.scoreBox}>
            <div className={styles.scoreValue}>{score ?? 0}</div>
            <div className={styles.scoreLabel}>Total Score</div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>Correct Answers</div>
            <div className={styles.statValue}>{correctCount ?? 0}</div>
            <div className={styles.statsDetails}>out of {totalQuestions}</div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.statLabel}>Accuracy</div>
            <div className={styles.statValue}>{percentage.toFixed(1)}%</div>
            <div className={styles.statsDetails}>
              {correctCount} correct, {incorrectCount} incorrect
            </div>
          </div>
        </div>

        <div className={styles.feedbackMessage}>Marks: {correctCount} × 2 = {score} / 100</div>

        {correctCount !== undefined && (
          <div className={styles.answerBreakdown}>
            <h3 className={styles.breakdownTitle}>Answer Review</h3>
            <div className={styles.answerList}>
              {questions.slice(0, 10).map((question) => {
                const userAnswer = answers[question.id];
                const isCorrect = parseInt(userAnswer, 10) === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`${styles.answerItem} ${isCorrect ? styles.correct : styles.incorrect}`}
                  >
                    <div className={styles.answerQuestion}>
                      Q{question.id}: {question.number1} {question.operation === 'addition' ? '+' : question.operation === 'subtraction' ? '−' : question.operation === 'multiplication' ? '×' : '÷'} {question.number2}
                    </div>
                    <div>
                      <span className={`${styles.answerStatus} ${isCorrect ? styles.statusCorrect : styles.statusIncorrect}`}>
                        {isCorrect ? `✓ ${userAnswer}` : `✗ Your answer: ${userAnswer}, Correct: ${question.correctAnswer}`}
                      </span>
                    </div>
                  </div>
                );
              })}
              {questions.length > 10 && (
                <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '1rem' }}>
                  ...and {questions.length - 10} more questions
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryButton} onClick={handleRetry}>
          📝 Try Again
        </button>
        <button className={styles.secondaryButton} onClick={handleHome}>
          🏠 Go Home
        </button>
      </div>
    </div>
  );
};
