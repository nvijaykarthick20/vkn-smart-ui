import styles from './Card.module.css';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, children, className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {title && <h2 className={styles.cardTitle}>{title}</h2>}
      {description && <p className={styles.cardDescription}>{description}</p>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};
