import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Without this, React Router keeps the scroll position when navigating
// between pages, which feels broken for a multi-page site.
//
// If the URL has a #hash (e.g. /services#rag-pipelines from the footer),
// scroll to that element instead of the top of the page.
//
// `key` changes on every navigation, even when clicking a link to the URL
// you're already on. Without it, clicking the same footer link a second
// time (after scrolling away) wouldn't scroll back to the card.
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;
