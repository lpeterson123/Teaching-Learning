import { useEffect } from 'react';
import './Placeholder.css';

export default function Placeholder({ title, eyebrow }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | Episcopal High School`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <section className="placeholder" aria-labelledby="placeholder-title">
      <div className="container placeholder__inner">
        <div className="placeholder__ornament" aria-hidden="true">
          <svg viewBox="0 0 40 20" width="40" height="20">
            <path
              d="M2 18 Q20 -2 38 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="10" r="2.5" fill="currentColor" />
          </svg>
        </div>

        {eyebrow && <p className="placeholder__eyebrow">{eyebrow}</p>}

        <h1 id="placeholder-title" className="placeholder__title">
          Placeholder
        </h1>
        <p className="placeholder__page-name">{title}</p>

        <div className="placeholder__card" role="status" aria-live="polite">
          <div className="placeholder__card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path
                d="M12 2 L2 8 L12 14 L22 8 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M6 10.5 V15 L12 18 L18 15 V10.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="placeholder__card-title">Under Construction</h2>
            <p className="placeholder__card-text">
              This page is being prepared. Content will appear here soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
