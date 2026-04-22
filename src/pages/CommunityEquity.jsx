import { useEffect, useId, useState } from 'react';
import './CommunityEquity.css';

const COMPETENCIES = [
  {
    id: 'knowledge',
    name: 'Knowledge of Other Cultures',
    exceeding:
      "Teachers demonstrate sophisticated understanding of other cultures' histories, values, communication styles, and practices.",
    suggestions: [
      {
        term: 'Audit your curriculum',
        body: 'for whose voices, histories, and contributions are represented—and whose are missing.',
      },
      {
        term: 'Learn the cultural backgrounds',
        body: 'of your students and their families; understand how those backgrounds shape learning preferences and communication styles.',
      },
      {
        term: 'Engage in ongoing self-education',
        body: 'about cultures represented in your classroom and broader society (reading, workshops, community events).',
      },
      {
        term: 'Avoid "tourist" approaches',
        body: 'that reduce cultures to food, holidays, and costumes; explore deeper values, historical contexts, and contemporary realities.',
      },
      {
        term: 'Recognize within-group diversity',
        body: '—no culture is monolithic.',
      },
    ],
  },
  {
    id: 'engagement',
    name: 'Intentional Intercultural Engagement',
    exceeding:
      'Teachers consistently incorporate diverse perspectives and facilitate shared understanding among students.',
    suggestions: [
      {
        term: 'Design collaborative activities',
        body: 'that intentionally mix students across cultural backgrounds.',
      },
      {
        term: 'Establish classroom norms',
        body: 'that value multiple communication styles (not just dominant-culture norms like direct eye contact or individual competition).',
      },
      {
        term: 'Create structures for dialogue',
        body: "where students share perspectives and build on each other's ideas.",
      },
      {
        term: 'Use varied participation formats',
        body: ': written reflection, small groups, fishbowl discussions, anonymous polls—so different communication styles can thrive.',
      },
      {
        term: 'Model curiosity and humility',
        body: 'when engaging with perspectives different from your own.',
      },
    ],
  },
  {
    id: 'growth',
    name: 'Focus on Intercultural Growth',
    exceeding:
      'Teachers demonstrate adjusted attitudes from working across differences and promote engagement with diversity.',
    suggestions: [
      {
        term: 'Reflect regularly',
        body: 'on how your own cultural position shapes your teaching assumptions and practices.',
      },
      {
        term: 'Seek feedback',
        body: 'from students, families, and colleagues from different backgrounds about your teaching.',
      },
      {
        term: 'Share your own growth journey',
        body: 'with students—model that intercultural learning is lifelong.',
      },
      {
        term: 'Create structures for student reflection',
        body: 'on their own cultural assumptions and growth.',
      },
      {
        term: 'Frame mistakes as learning opportunities',
        body: '—both for yourself and students—when navigating cultural difference.',
      },
      {
        term: 'Build relationships',
        body: 'with colleagues from different backgrounds; learn from how they approach teaching.',
      },
    ],
  },
  {
    id: 'responsiveness',
    name: 'Intercultural Responsiveness',
    exceeding:
      'Teachers ask complex questions, assess their own biases, and seek multiple cultural perspectives.',
    suggestions: [
      {
        term: 'Intervene thoughtfully',
        body: 'when bias or stereotyping appears in classroom discussions—use it as a teaching moment.',
      },
      {
        term: 'Design curriculum that asks complex questions',
        body: 'about culture, identity, and difference—not just surface-level celebration.',
      },
      {
        term: 'Differentiate instruction',
        body: 'based on cultural learning styles and needs, not just academic levels.',
      },
      {
        term: 'Respond to current events',
        body: 'that affect different student communities with care and openness.',
      },
      {
        term: 'Examine your own assumptions',
        body: 'before reacting to student behavior that may be culturally influenced.',
      },
      {
        term: 'Adjust your communication style',
        body: 'when working with families from different cultural backgrounds.',
      },
    ],
  },
];

function SuggestionsPanel({ suggestions, isOpen, panelId, labelledBy }) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={labelledBy}
      className="cc-suggestions"
      hidden={!isOpen}
    >
      <ul className="cc-suggestions__list">
        {suggestions.map((s) => (
          <li key={s.term}>
            <strong className="cc-suggestions__term">{s.term}</strong>{' '}
            <span>{s.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CulturalCompetencyTable({ competencies }) {
  const [openCols, setOpenCols] = useState(() => new Set());
  const tableId = useId();

  const toggleColumn = (id) =>
    setOpenCols((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const expandAll = () => setOpenCols(new Set(competencies.map((c) => c.id)));
  const collapseAll = () => setOpenCols(new Set());
  const allOpen = openCols.size === competencies.length;

  return (
    <div className="cc-wrapper">
      <div className="cc-toolbar">
        <button
          type="button"
          className="cc-btn"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen ? 'Collapse all suggestions' : 'Expand all suggestions'}
        </button>
      </div>

      <div className="cc-scroll">
        <table className="cc-table" aria-label="Cultural competencies reference table">
          <thead>
            <tr>
              <th scope="col" className="cc-rowhead cc-rowhead--corner">
                <span className="cc-rowhead__eyebrow">Row</span>
              </th>
              {competencies.map((c) => (
                <th key={c.id} scope="col" className="cc-colhead">
                  <span className="cc-colhead__eyebrow">Competency</span>
                  <span className="cc-colhead__name">{c.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="cc-rowhead">
                <span className="cc-rowhead__eyebrow">Row 1</span>
                <span className="cc-rowhead__label">
                  What it looks like at the &ldquo;Exceeding&rdquo; level
                </span>
              </th>
              {competencies.map((c) => (
                <td key={c.id} className="cc-cell cc-cell--exceeding" data-label={c.name}>
                  <p>{c.exceeding}</p>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="cc-rowhead">
                <span className="cc-rowhead__eyebrow">Row 2</span>
                <span className="cc-rowhead__label">
                  Broad Suggestions for All Teachers
                </span>
              </th>
              {competencies.map((c) => {
                const isOpen = openCols.has(c.id);
                const buttonId = `${tableId}-btn-${c.id}`;
                const panelId = `${tableId}-panel-${c.id}`;
                return (
                  <td
                    key={c.id}
                    className="cc-cell cc-cell--suggestions"
                    data-label={c.name}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className={`cc-disclosure${isOpen ? ' cc-disclosure--open' : ''}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleColumn(c.id)}
                    >
                      <span>
                        {isOpen ? 'Hide' : 'Show'} suggestions{' '}
                        <span className="cc-disclosure__count">
                          ({c.suggestions.length})
                        </span>
                      </span>
                      <svg
                        className="cc-disclosure__icon"
                        viewBox="0 0 16 16"
                        width="14"
                        height="14"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 6 L8 11 L13 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <SuggestionsPanel
                      suggestions={c.suggestions}
                      isOpen={isOpen}
                      panelId={panelId}
                      labelledBy={buttonId}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CommunityEquity() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Office of Community and Equity | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <section className="ce-hero" aria-labelledby="ce-hero-title">
        <div className="container ce-hero__inner">
          <p className="ce-hero__eyebrow">Office of Community and Equity</p>
          <h1 id="ce-hero-title" className="ce-hero__title">
            Cultural Competency in the Classroom: A Practical Guide
          </h1>
          <p className="ce-hero__subtitle">
            Four cultural competencies at the &ldquo;Exceeding&rdquo; level and
            practical, research-aligned moves teachers can make across each one.
          </p>
        </div>
      </section>

      <section className="ce-section" aria-label="Cultural competencies">
        <div className="container">
          <CulturalCompetencyTable competencies={COMPETENCIES} />
        </div>
      </section>
    </>
  );
}
