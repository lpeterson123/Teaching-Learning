import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NEWSLETTERS } from '../data/newsletters.js';
import './Resources.css';

export default function Resources() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Resources | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main>
      <section className="res-hero" aria-labelledby="res-hero-title">
        <div className="container res-hero__inner">
          <p className="res-hero__eyebrow">For the Community</p>
          <h1 id="res-hero-title" className="res-hero__title">Resources</h1>
          <p className="res-hero__subtitle">
            Practical tools and research-informed reading for educators at Episcopal High School.
          </p>
        </div>
      </section>

      <section className="res-landing" aria-label="Resource categories">
        <div className="container">
          <div className="res-folders">
            <Link to="/resources/newsletters" className="res-folder">
              <div className="res-folder__icon" aria-hidden="true">
                <svg viewBox="0 0 40 32" width="40" height="32" fill="none">
                  <rect x="0" y="6" width="40" height="26" rx="3" fill="currentColor" opacity="0.15" />
                  <rect x="0" y="6" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 11 Q20 4 40 11" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="0" y="2" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <div className="res-folder__body">
                <h2 className="res-folder__title">Newsletter Series</h2>
                <p className="res-folder__meta">Mind Over Matter &mdash; {NEWSLETTERS.length} issues</p>
              </div>
              <span className="res-folder__arrow" aria-hidden="true">→</span>
            </Link>

            <Link to="/resources/practice-deck" className="res-folder">
              <div className="res-folder__icon" aria-hidden="true">
                <svg viewBox="0 0 40 32" width="40" height="32" fill="none">
                  <rect x="0" y="6" width="40" height="26" rx="3" fill="currentColor" opacity="0.15" />
                  <rect x="0" y="6" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 11 Q20 4 40 11" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="0" y="2" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <div className="res-folder__body">
                <h2 className="res-folder__title">Practice Deck</h2>
                <p className="res-folder__meta">54 research-informed teaching strategies</p>
              </div>
              <span className="res-folder__arrow" aria-hidden="true">→</span>
            </Link>

            <Link to="/resources/beneficial-readings" className="res-folder">
              <div className="res-folder__icon" aria-hidden="true">
                <svg viewBox="0 0 40 32" width="40" height="32" fill="none">
                  <rect x="0" y="6" width="40" height="26" rx="3" fill="currentColor" opacity="0.15" />
                  <rect x="0" y="6" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M0 11 Q20 4 40 11" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="0" y="2" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <div className="res-folder__body">
                <h2 className="res-folder__title">Beneficial Readings</h2>
                <p className="res-folder__meta">Research-informed articles &amp; books</p>
              </div>
              <span className="res-folder__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
