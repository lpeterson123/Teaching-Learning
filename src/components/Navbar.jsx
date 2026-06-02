import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  {
    label: 'Teaching & Learning',
    children: [
      { to: '/teaching-learning', label: 'Teaching & Learning', end: true },
      { to: '/teaching-learning/practice-deck', label: 'Practice Deck' },
    ],
  },
  { to: '/community-equity', label: 'Office of Community and Equity' },
  {
    label: 'Washington Program',
    children: [
      { to: '/washington-program', label: 'Washington Program', end: true },
      { to: '/washington-program/map', label: 'Map' },
    ],
  },
  { to: '/ai', label: 'AI' },
  {
    label: 'PD Resources',
    children: [
      { to: '/professional-development', label: 'Main Page', end: true },
      { to: '/resources', label: 'Resources' },
    ],
  },
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
            {NAV_LINKS.map((link) => {
              if (link.children) {
                const isChildActive = link.children.some(
                  (c) => pathname === c.to || pathname.startsWith(c.to + '/'),
                );
                return (
                  <li key={link.label} className="navbar__dropdown">
                    <button
                      className={`navbar__link navbar__dropdown-toggle${isChildActive ? ' navbar__link--active' : ''}`}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg className="navbar__chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <ul className="navbar__dropdown-menu" role="menu">
                      {link.children.map((child) => (
                        <li key={child.to} role="none">
                          <NavLink
                            to={child.to}
                            end={child.end}
                            className={({ isActive }) =>
                              `navbar__dropdown-item${isActive ? ' navbar__dropdown-item--active' : ''}`
                            }
                            role="menuitem"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
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
              );
            })}
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
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <li key={link.label}>
                    {link.children.map((child, i) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end={child.end}
                        className={({ isActive }) =>
                          `navbar__mobile-link${i > 0 ? ' navbar__mobile-link--sub' : ''}${isActive ? ' navbar__mobile-link--active' : ''}`
                        }
                        tabIndex={menuOpen ? 0 : -1}
                      >
                        {i > 0 && <span className="navbar__mobile-sub-arrow" aria-hidden="true">↳</span>}
                        {child.label}
                      </NavLink>
                    ))}
                  </li>
                );
              }
              return (
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
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
