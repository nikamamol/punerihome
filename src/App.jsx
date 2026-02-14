import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRouter';
import { store } from './store';

// ✅ ScrollToTop component with multiple checks
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Force scroll to top
    const forceScrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    // Immediate scroll
    forceScrollToTop();

    // Multiple timeouts for safety
    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 100);

    console.log('Scrolled to top for:', pathname + search);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;