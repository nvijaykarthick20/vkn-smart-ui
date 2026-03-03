import { Routes, Route } from 'react-router-dom';
import { useArithmeticStore } from '../store/arithmeticStore';
import { OperationSelector } from '../components/OperationSelector';
import { QuestionList } from '../components/QuestionList';
import { ResultCard } from '../components/ResultCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import styles from '../arithmetic.module.css';

export const ArithmeticOperation: React.FC = () => {
  const isLoading = useArithmeticStore((state) => state.isLoading);

  return (
    <div className={styles.arithmetic}>
      <div className={styles.container}>
        <Routes>
          <Route index element={<OperationSelector />} />
          <Route 
            path="questions" 
            element={isLoading ? <LoadingSkeleton /> : <QuestionList />} 
          />
          <Route path="results" element={<ResultCard />} />
        </Routes>
      </div>
    </div>
  );
};
