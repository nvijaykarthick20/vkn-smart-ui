import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { Home } from './pages/Home';
import { LoginPage } from './features/auth/pages/LoginPage';
import { SignupPage } from './features/auth/pages/SignupPage';
import { ArithmeticOperation } from './features/arithmetic/pages/ArithmeticOperation';
import { TamilWorksheet } from './features/tamil/pages/TamilWorksheet';
import { useUserStore } from './features/auth/store/userStore';
import styles from './App.module.css';

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <div className={styles.app}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/arithmetic/*" element={<ArithmeticOperation />} />
              <Route path="/tamil-worksheet" element={<TamilWorksheet />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
