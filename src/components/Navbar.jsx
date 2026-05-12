import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/teaching-learning', label: 'Teaching & Learning' },
  { to: '/community-equity', label: 'Office of Community and Equity' },
  { to: '/washington-program', label: 'Washington Program' },
  { to: '/washington-program/map', label: 'Washington Program Map' },
  { to: '/ai', label: 'AI' },
  { to: '/resources', label: 'Resources' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const menuButtonRef = useRef(null);

  // Close the mobile menu whenever the user navigates.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile menu is open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Close menu on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <header className="navbar" role="banner">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" aria-label="Episcopal High School — Home">
          <span className="navbar__brand-mark" aria-hidden="true">
            E
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-title">Episcopal High School</span>
            <span className="navbar__brand-sub">Teaching &amp; Learning</span>
          </span>
        </Link>

        <nav className="navbar__desktop" aria-label="Primary">
          <ul className="navbar__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={`navbar__toggle${menuOpen ? ' navbar__toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="navbar__mobile-list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                  }
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
