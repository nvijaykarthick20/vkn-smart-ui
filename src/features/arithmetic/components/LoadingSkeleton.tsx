import styles from './LoadingSkeleton.module.css';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={styles.skeletonItem}>
            <div className={styles.skeletonNumber} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonLine} style={{ width: '100%' }} />
              <div className={styles.skeletonLine} style={{ width: '60%' }} />
            </div>
            <div className={styles.skeletonInput} />
          </div>
        ))}
      </div>
    </div>
  );
};
