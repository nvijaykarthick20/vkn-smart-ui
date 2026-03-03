import styles from '../tamil.module.css';

export const TamilWorksheet: React.FC = () => {
  return (
    <div className={styles.tamilPage}>
      <div className={styles.comingSoonCard}>
        <div className={styles.comingSoonIcon}>📚</div>
        <h1 className={styles.comingSoonTitle}>Tamil Worksheet</h1>
        <p className={styles.comingSoonText}>Coming Soon</p>
      </div>
    </div>
  );
};
