import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../store/userStore';
import { signupSchema } from '../../../shared/utils/validators';
import styles from './SignupPage.module.css';

interface SignupFormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { setUserName, setIsAuthenticated, setUserEmail } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setServerError('');

    try {
      // Simulate API call - replace with actual signup endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock signup - in production, create user on backend
      setUserEmail(data.email);
      setUserName(data.firstName);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <div className={styles.header}>
          <div className={styles.logo}>📚</div>
          <h1 className={styles.title}>Join VKN Smart</h1>
          <p className={styles.subtitle}>Create your learning account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {serverError && (
            <div className={styles.serverError}>
              <span className={styles.errorIcon}>⚠️</span>
              {serverError}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              {...register('firstName')}
              disabled={isLoading}
            />
            {errors.firstName && (
              <span className={styles.fieldError}>{errors.firstName.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className={styles.fieldError}>{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.signupButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Creating account...
              </>
            ) : (
              <>Create Account →</>
            )}
          </button>
        </form>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{' '}
            <button
              onClick={handleLoginClick}
              className={styles.loginLink}
              disabled={isLoading}
            >
              Log in here
            </button>
          </p>
        </div>

        <div className={styles.benefits}>
          <p className={styles.benefitsTitle}>✨ Why join VKN Smart?</p>
          <ul className={styles.benefitsList}>
            <li>Interactive math and language worksheets</li>
            <li>Track your learning progress</li>
            <li>Personalized learning experience</li>
          </ul>
        </div>
      </div>

      <div className={styles.backgroundDecor}></div>
    </div>
  );
};
