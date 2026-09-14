import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AnimatedBrand from './AnimatedBrand';

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Services', to: '/services' },
    { label: 'How it works', to: '/how-it-works' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          <AnimatedBrand text="makeColors" />
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile-panel${open ? ' open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)}>
          Start a project
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
