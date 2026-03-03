import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../features/auth/store/userStore';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle} onClick={() => navigate('/')} role="button" tabIndex={0} onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate('/');
            }
          }}>
            VKN Smart
          </h1>
          <div className={styles.headerRight}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
};
