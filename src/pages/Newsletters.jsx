import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NEWSLETTERS, SERIES_AUTHORS, SERIES_TITLE } from '../data/newsletters.js';
import './Newsletters.css';

const BASE = import.meta.env.BASE_URL;

function NewsletterCard({ issue, topic, month, year, filename }) {
  const url = `${BASE}newsletters/${filename}`;
  const issueLabel = `Issue ${issue}`;
  const issueDisplay = String(issue).padStart(2, '0');

  return (
    <article className="nl-card" aria-label={`${issueLabel}: ${topic}`}>
      <div className="nl-card__header">
        <span className="nl-card__number" aria-hidden="true">{issueDisplay}</span>
        <span className="nl-card__issue-label">{issueLabel}</span>
      </div>
      <div className="nl-card__body">
        <h3 className="nl-card__topic">{topic}</h3>
        <p className="nl-card__date">{month} {year}</p>
      </div>
      <div className="nl-card__footer">
        <a
          className="nl-card__btn nl-card__btn--view"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${issueLabel}: ${topic} (opens in new tab)`}
        >
          View PDF
        </a>
        <a
          className="nl-card__btn nl-card__btn--download"
          href={url}
          download={`Mind-Over-Matter-Issue-${issueDisplay}.pdf`}
          aria-label={`Download ${issueLabel}: ${topic}`}
        >
          Download
        </a>
      </div>
    </article>
  );
}

export default function Newsletters() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Newsletter Series | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main>
      <section className="nl-hero" aria-labelledby="nl-hero-title">
        <div className="container nl-hero__inner">
          <p className="nl-hero__eyebrow">Resources</p>
          <h1 id="nl-hero-title" className="nl-hero__title">{SERIES_TITLE}</h1>
          <p className="nl-hero__subtitle">by {SERIES_AUTHORS}</p>
        </div>
      </section>

      <section className="nl-section" aria-labelledby="nl-section-title">
        <div className="container">
          <div className="nl-back">
            <Link to="/resources" className="nl-back__link">
              ← Back to Resources
            </Link>
          </div>

          <div className="nl-grid" role="list" aria-label="Newsletter issues">
            {NEWSLETTERS.map((nl) => (
              <div key={nl.issue} role="listitem">
                <NewsletterCard {...nl} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
