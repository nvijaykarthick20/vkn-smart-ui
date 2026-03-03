import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useArithmeticStore } from '../store/arithmeticStore';
import { operationSelectionSchema } from '../../../shared/utils/validators';
import type { OperationSelectionFormData } from '../../../shared/utils/validators';
import type { OperationType, Digits } from '../types';
import styles from './OperationSelector.module.css';

export const OperationSelector: React.FC = () => {
  const navigate = useNavigate();
  const generateQuestions = useArithmeticStore((state) => state.generateQuestions);
  const setOperationType = useArithmeticStore((state) => state.setOperationType);
  const setDigits = useArithmeticStore((state) => state.setDigits);
  const operationType = useArithmeticStore((state) => state.operationType);
  const digits = useArithmeticStore((state) => state.digits);

  // Reset selections when component mounts
  useEffect(() => {
    setOperationType(null);
    setDigits(null);
  }, [setOperationType, setDigits]);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<OperationSelectionFormData>({
    resolver: zodResolver(operationSelectionSchema),
  });

  // Clear form on mount
  useEffect(() => {
    reset();
  }, [reset]);

  const operationTypes: Array<{ label: string; value: OperationType }> = [
    { label: 'Addition', value: 'addition' },
    { label: 'Subtraction', value: 'subtraction' },
    { label: 'Multiplication', value: 'multiplication' },
    { label: 'Division', value: 'division' },
  ];

  const digitOptions: Array<{ label: string; value: Digits }> = [
    { label: '1 Digit', value: 1 },
    { label: '2 Digits', value: 2 },
    { label: '3 Digits', value: 3 },
    { label: '4 Digits', value: 4 },
  ];

  const handleOperationSelect = (value: OperationType) => {
    setOperationType(value);
    setValue('operationType', value);
  };

  const handleDigitSelect = (value: Digits) => {
    setDigits(value);
    setValue('digits', value.toString() as '1' | '2' | '3' | '4');
  };

  const onSubmit = () => {
    if (operationType && digits) {
      generateQuestions(operationType, digits);
      navigate('questions');
    }
  };

  const isValid = operationType && digits;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.selector}>
      <h2 className={styles.selectorTitle}>Step 1: Select Operation and Difficulty</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Operation Type</label>
        <div className={styles.optionGrid}>
          {operationTypes.map((op) => (
            <button
              key={op.value}
              type="button"
              className={`${styles.optionButton} ${operationType === op.value ? styles.selected : ''}`}
              onClick={() => handleOperationSelect(op.value)}
            >
              {op.label}
            </button>
          ))}
        </div>
        {errors.operationType && <p className={styles.error}>{errors.operationType.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Number of Digits</label>
        <div className={styles.optionGrid}>
          {digitOptions.map((digit) => (
            <button
              key={digit.value}
              type="button"
              className={`${styles.optionButton} ${digits === digit.value ? styles.selected : ''}`}
              onClick={() => handleDigitSelect(digit.value)}
            >
              {digit.label}
            </button>
          ))}
        </div>
        {errors.digits && <p className={styles.error}>{errors.digits.message}</p>}
      </div>

      <button type="submit" className={styles.submitButton} disabled={!isValid}>
        Generate Questions
      </button>
    </form>
  );
};