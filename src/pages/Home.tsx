import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleArithmeticClick = () => {
    navigate('/arithmetic');
  };

  const handleTamilClick = () => {
    navigate('/tamil-worksheet');
  };

  return (
    <div className={styles.home}>

      <div className={styles.heroSection}>
        <h1 className={styles.title}>Welcome to VKN Smart</h1>
        <p className={styles.subtitle}>
          Practice math and language skills with our interactive learning tools
        </p>
      </div>

      <div className={styles.navigationGrid}>
        <div
          className={styles.navCard}
          onClick={handleArithmeticClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleArithmeticClick();
            }
          }}
        >
          <div>
            <div className={styles.navCardIcon}>🧮</div>
            <h2 className={styles.navCardTitle}>Arithmetic Operations</h2>
            <p className={styles.navCardDescription}>
              Practice addition, subtraction, multiplication, and division with 50 questions
              tailored to your skill level.
            </p>
          </div>
          <button className={styles.navCardButton}>Start Practice</button>
        </div>

        <div
          className={styles.navCard}
          onClick={handleTamilClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTamilClick();
            }
          }}
        >
          <div>
            <div className={styles.navCardIcon}>📝</div>
            <h2 className={styles.navCardTitle}>Tamil Worksheet</h2>
            <p className={styles.navCardDescription}>
              Enhance your Tamil language skills with interactive exercises and practice
              materials.
            </p>
          </div>
          <button className={styles.navCardButton}>Coming Soon</button>
        </div>
      </div>
    </div>
  );
};
