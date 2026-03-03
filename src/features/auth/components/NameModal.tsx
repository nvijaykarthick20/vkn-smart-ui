import { useState } from 'react';
import { useUserStore } from '../store/userStore';
import styles from './NameModal.module.css';

interface NameModalProps {
  isOpen: boolean;
  onClose: (name: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const setUserName = useUserStore((state) => state.setUserName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Name must be less than 50 characters');
      return;
    }

    setUserName(trimmedName);
    onClose(trimmedName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome! 👋</h1>
          <p className={styles.subtitle}>Please enter your name to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Continue →
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Your name helps us personalize your learning experience
          </p>
        </div>
      </div>
    </div>
  );
};
