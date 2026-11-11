import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MotionLayer from './components/MotionLayer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// Keep this import last so the motion styles can refine every page
import './Motion.css';
// Theme tokens + light theme overrides (must stay last)
import './Theme.css';

// Re-mounting the wrapper on every route change replays a soft page-in
// animation each time you navigate.
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="route-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <MotionLayer />
      </div>
    </BrowserRouter>
  );
}

export default App;
