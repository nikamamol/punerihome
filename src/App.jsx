import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store';

import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRouter';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
           <ScrollToTop />
          <AppRoutes />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;