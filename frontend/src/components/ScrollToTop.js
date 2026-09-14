import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Without this, React Router keeps the scroll position when navigating
// between pages, which feels broken for a multi-page site.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
