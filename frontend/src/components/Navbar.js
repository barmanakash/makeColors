import { useState } from 'react';
import AnimatedBrand from './AnimatedBrand';

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'How it works', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <a href="#top" className="nav-brand">
          <AnimatedBrand text="makeColors" />
        </a>

        <nav className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary">
            Start a project
          </a>
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
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Start a project
        </a>
      </div>
    </header>
  );
}

export default Navbar;
