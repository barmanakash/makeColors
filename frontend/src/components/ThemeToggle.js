import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mc-theme';
const META_COLORS = { dark: '#0b0e14', light: '#f5f7fc' };

// The inline script in public/index.html sets data-theme before the first
// paint (so there is no flash); this reads that value back.
function readInitialTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

function ThemeToggle() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // storage can be blocked (private mode); the theme still works
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', META_COLORS[theme]);
  }, [theme]);

  function handleClick() {
    const root = document.documentElement;
    // briefly enables a smooth colour cross-fade for the whole page
    root.classList.add('theme-fade');
    window.setTimeout(() => root.classList.remove('theme-fade'), 500);
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`theme-toggle${isLight ? ' is-light' : ''}`}
      onClick={handleClick}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <svg
        className="theme-icon theme-icon--sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="theme-icon theme-icon--moon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}

export default ThemeToggle;
