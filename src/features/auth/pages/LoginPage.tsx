import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../store/userStore';
import { loginSchema } from '../../../shared/utils/validators';
import styles from './LoginPage.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { setUserName, setIsAuthenticated, setUserEmail } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError('');

    try {
      // Simulate API call - replace with actual authentication endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock authentication - in production, verify with backend
      const mockUsers: Record<string, string> = {
        'student@vkn.com': 'password123',
        'demo@vkn.com': 'demo123',
      };

      if (mockUsers[data.email] === data.password) {
        // Extract name from email for display
        const displayName = data.email.split('@')[0].charAt(0).toUpperCase() + 
                           data.email.split('@')[0].slice(1);

        setUserEmail(data.email);
        setUserName(displayName);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setServerError('Invalid email or password. Try: student@vkn.com / password123');
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <div className={styles.logo}>📚</div>
          <h1 className={styles.title}>VKN Smart</h1>
          <p className={styles.subtitle}>Interactive Learning Platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {serverError && (
            <div className={styles.serverError}>
              <span className={styles.errorIcon}>⚠️</span>
              {serverError}
            </div>
          )}

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
              placeholder="Enter your password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Logging in...
              </>
            ) : (
              <>Login →</>
            )}
          </button>
        </form>

        <div className={styles.divider}></div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have an account?{' '}
            <button
              onClick={handleSignupClick}
              className={styles.signupLink}
              disabled={isLoading}
            >
              Sign up here
            </button>
          </p>
        </div>

        <div className={styles.demoInfo}>
          <p className={styles.demoTitle}>Demo Credentials:</p>
          <p className={styles.demoText}>
            Email: <strong>student@vkn.com</strong>
          </p>
          <p className={styles.demoText}>
            Password: <strong>password123</strong>
          </p>
        </div>
      </div>

      <div className={styles.backgroundDecor}></div>
    </div>
  );
};
