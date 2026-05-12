import { useEffect } from 'react';
import { NEWSLETTERS, SERIES_AUTHORS, SERIES_TITLE } from '../data/newsletters.js';
import './Resources.css';

const BASE = import.meta.env.BASE_URL;

function NewsletterCard({ issue, topic, month, year, filename }) {
  const url = `${BASE}newsletters/${filename}`;
  const issueLabel = `Issue ${issue}`;
  const issueDisplay = String(issue).padStart(2, '0');

  return (
    <article className="res-card" aria-label={`${issueLabel}: ${topic}`}>
      <div className="res-card__header">
        <span className="res-card__number" aria-hidden="true">{issueDisplay}</span>
        <span className="res-card__issue-label">{issueLabel}</span>
      </div>
      <div className="res-card__body">
        <h3 className="res-card__topic">{topic}</h3>
        <p className="res-card__date">{month} {year}</p>
      </div>
      <div className="res-card__footer">
        <a
          className="res-card__btn res-card__btn--view"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${issueLabel}: ${topic} (opens in new tab)`}
        >
          View PDF
        </a>
        <a
          className="res-card__btn res-card__btn--download"
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

      <section className="res-newsletters" aria-labelledby="newsletters-title">
        <div className="container">
          <header className="res-section-header">
            <p className="res-section-label">Newsletter Series</p>
            <h2 id="newsletters-title" className="res-section-title">{SERIES_TITLE}</h2>
            <p className="res-section-byline">by {SERIES_AUTHORS}</p>
          </header>

          <div className="res-grid" role="list" aria-label="Newsletter issues">
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
