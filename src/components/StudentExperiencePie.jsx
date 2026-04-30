import { useState } from 'react';
import './StudentExperiencePie.css';

// Annular sector geometry. Slice 0 = top-right, then clockwise.
const CX = 220;
const CY = 220;
const R_OUTER = 200;
const R_INNER = 64; // smaller central hole than the reference image

function buildSlice(i) {
  const startDeg = i * 90;
  const endDeg = (i + 1) * 90;
  const start = (startDeg * Math.PI) / 180;
  const end = (endDeg * Math.PI) / 180;

  const x1o = CX + R_OUTER * Math.sin(start);
  const y1o = CY - R_OUTER * Math.cos(start);
  const x2o = CX + R_OUTER * Math.sin(end);
  const y2o = CY - R_OUTER * Math.cos(end);
  const x1i = CX + R_INNER * Math.sin(start);
  const y1i = CY - R_INNER * Math.cos(start);
  const x2i = CX + R_INNER * Math.sin(end);
  const y2i = CY - R_INNER * Math.cos(end);

  // Outer arc clockwise (sweep=1), then line in, inner arc CCW back (sweep=0).
  return [
    `M ${x1o.toFixed(2)} ${y1o.toFixed(2)}`,
    `A ${R_OUTER} ${R_OUTER} 0 0 1 ${x2o.toFixed(2)} ${y2o.toFixed(2)}`,
    `L ${x2i.toFixed(2)} ${y2i.toFixed(2)}`,
    `A ${R_INNER} ${R_INNER} 0 0 0 ${x1i.toFixed(2)} ${y1i.toFixed(2)}`,
    'Z',
  ].join(' ');
}

// Items are passed in slice order (0..3 = TR, BR, BL, TL). The 2×2 legend
// is laid out in reading order matching slice spatial positions:
//   Top row:    TL, TR    => indices [3, 0]
//   Bottom row: BL, BR    => indices [2, 1]
const LEGEND_ORDER = [3, 0, 2, 1];

export default function StudentExperiencePie({ items, activeId, onActiveChange }) {
  const slicePaths = items.map((_, i) => buildSlice(i));

  const setActive = (id) => () => onActiveChange?.(id);
  const clearActive = () => onActiveChange?.(null);

  const activeIdx = items.findIndex((item) => item.id === activeId);
  const active = activeIdx >= 0 ? items[activeIdx] : null;

  return (
    <div className="pie">
      <div className="pie__chart">
        <svg
          className="pie__svg"
          viewBox="0 0 440 440"
          role="img"
          aria-label="Our students' experience — four equal portions"
        >
          {slicePaths.map((d, i) => {
            const item = items[i];
            const isActive = activeIdx === i;
            return (
              <path
                key={item.id}
                className={`pie__slice${isActive ? ' pie__slice--active' : ''}`}
                d={d}
                fill={item.color}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={item.title}
                onMouseEnter={setActive(item.id)}
                onMouseLeave={clearActive}
                onFocus={setActive(item.id)}
                onBlur={clearActive}
              />
            );
          })}
        </svg>
      </div>

      <ul className="pie__legend" aria-label="Legend">
        {LEGEND_ORDER.map((idx) => {
          const item = items[idx];
          const isActive = activeIdx === idx;
          return (
            <li
              key={item.id}
              className={`pie__legend-item${isActive ? ' pie__legend-item--active' : ''}`}
              onMouseEnter={setActive(item.id)}
              onMouseLeave={clearActive}
              onFocus={setActive(item.id)}
              onBlur={clearActive}
              tabIndex={0}
            >
              <span
                className="pie__legend-swatch"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="pie__legend-name">{item.title}</span>
            </li>
          );
        })}
      </ul>

      <div className="pie__panel" role="status" aria-live="polite">
        {active ? (
          <article
            className="pie__card"
            style={{ '--card-accent': active.color }}
          >
            <p className="pie__card-eyebrow">Student Outcome</p>
            <h3 className="pie__card-title">{active.title}</h3>
            <p className="pie__card-body">{active.body}</p>
            {active.drivenBy && active.drivenBy.length > 0 && (
              <>
                <hr className="pie__card-divider" />
                <p className="pie__card-driven">
                  <span className="pie__card-driven-label">Driven by</span>
                  <span className="pie__card-driven-list">
                    {active.drivenBy.join(' · ')}
                  </span>
                </p>
              </>
            )}
          </article>
        ) : (
          <p className="pie__hint">
            Hover (or tab to) a wedge or legend item to read about that part of
            our students&rsquo; experience.
          </p>
        )}
      </div>
    </div>
  );
}
