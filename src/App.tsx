import { MainPage } from './pages/MainPage';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <MainPage />
    </HelmetProvider>
  );
}

export default App;
