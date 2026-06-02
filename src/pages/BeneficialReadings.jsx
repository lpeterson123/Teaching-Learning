import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BeneficialReadings.css';

// CSV served from public/ — upload beneficial-readings.csv to the public folder to populate this page.
const CSV_URL = `${import.meta.env.BASE_URL}beneficial-readings.csv`;

// RFC-4180 compliant CSV parser — handles quoted fields with commas/newlines.
function parseCSV(raw) {
  const rows = [];
  let row = [];
  let field = '';
  let inQ = false;

  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (inQ) {
      if (c === '"' && raw[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else { field += c; }
    } else {
      if (c === '"') { inQ = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c !== '\r') { field += c; }
    }
  }
  if (row.length || field) { row.push(field); rows.push(row); }
  return rows;
}

function toReadings(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const col = (keyword) => headers.findIndex((h) => h.includes(keyword));

  const titleIdx  = col('name');
  const authorIdx = col('author');
  const dateIdx   = col('date');
  const tagIdx    = col('tag');
  const descIdx   = col('description');
  const linkIdx   = col('link');
  const coverIdx  = col('cover');

  return rows
    .slice(1)
    .filter((r) => r[titleIdx]?.trim())
    .map((r, i) => ({
      id: i,
      title:      r[titleIdx]?.trim()  ?? '',
      author:     r[authorIdx]?.trim() ?? '',
      date:       r[dateIdx]?.trim()   ?? '',
      tags:       r[tagIdx]?.trim().split(',').map((t) => t.trim()).filter(Boolean) ?? [],
      description:r[descIdx]?.trim()   ?? '',
      link:       r[linkIdx]?.trim()   ?? '',
      coverPhoto: r[coverIdx]?.trim()  ?? '',
    }));
}

const TAG_COLOR = {
  'ai':                  'br-tag--blue',
  'science of learning': 'br-tag--teal',
  'assessment':          'br-tag--amber',
};
const tagClass = (tag) => TAG_COLOR[tag.toLowerCase()] ?? 'br-tag--slate';

function ReadingCard({ title, author, date, tags, description, link, coverPhoto }) {
  return (
    <article className="br-card">
      <div className="br-card__media">
        {coverPhoto
          ? <img src={coverPhoto} alt={`Cover of ${title}`} className="br-card__img" />
          : (
            <div className="br-card__placeholder">
              <span className="br-card__placeholder-text">{title}</span>
            </div>
          )
        }
      </div>

      <div className="br-card__info">
        <h3 className="br-card__title">{title}</h3>
        <p className="br-card__author">{author}</p>
        <div className="br-card__meta">
          {date && <span className="br-card__date">{date}</span>}
          {tags.map((tag) => (
            <span key={tag} className={`br-tag ${tagClass(tag)}`}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="br-card__overlay">
        <p className="br-card__desc">{description}</p>
        {link && (
          <a
            href={link}
            className="br-card__read-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More →
          </a>
        )}
      </div>
    </article>
  );
}

export default function BeneficialReadings() {
  const [readings, setReadings] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const previous = document.title;
    document.title = 'Beneficial Readings | Episcopal High School';

    fetch(CSV_URL)
      .then((res) => { if (!res.ok) throw new Error(); return res.text(); })
      .then((text) => { setReadings(toReadings(parseCSV(text))); setStatus('ok'); })
      .catch(() => setStatus('error'));

    return () => { document.title = previous; };
  }, []);

  return (
    <main>
      <section className="br-hero" aria-labelledby="br-title">
        <div className="container br-hero__inner">
          <p className="br-hero__eyebrow">Resources</p>
          <h1 id="br-title" className="br-hero__title">Beneficial Readings</h1>
          <p className="br-hero__subtitle">Research-informed articles and books for educators.</p>
        </div>
      </section>

      <section className="br-section">
        <div className="container">
          <div className="br-back">
            <Link to="/resources" className="br-back__link">← Back to Resources</Link>
          </div>

          {status === 'loading' && <p className="br-status">Loading readings…</p>}
          {status === 'error'   && <p className="br-status br-status--error">Readings unavailable. Upload <code>beneficial-readings.csv</code> to the public folder to populate this page.</p>}
          {status === 'ok' && readings.length === 0 && <p className="br-status">No readings found. Upload <code>beneficial-readings.csv</code> to the public folder.</p>}
          {status === 'ok' && readings.length > 0 && (
            <div className="br-grid" role="list" aria-label="Beneficial readings">
              {readings.map((r) => (
                <div key={r.id} role="listitem">
                  <ReadingCard {...r} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
