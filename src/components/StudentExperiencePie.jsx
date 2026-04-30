import { useState } from 'react';
import './StudentExperiencePie.css';

// Four equal 90° wedges drawn clockwise starting at 12 o'clock.
// Slice 0 = top-right, 1 = bottom-right, 2 = bottom-left, 3 = top-left.
const CX = 220;
const CY = 220;
const R = 200;

function buildSlice(i) {
  const startDeg = i * 90;
  const endDeg = (i + 1) * 90;
  const start = (startDeg * Math.PI) / 180;
  const end = (endDeg * Math.PI) / 180;
  const x1 = CX + R * Math.sin(start);
  const y1 = CY - R * Math.cos(start);
  const x2 = CX + R * Math.sin(end);
  const y2 = CY - R * Math.cos(end);
  const path = `M${CX},${CY} L${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 0 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;

  const midDeg = startDeg + 45;
  const mid = (midDeg * Math.PI) / 180;
  const labelR = R * 0.62;
  return {
    path,
    labelX: CX + labelR * Math.sin(mid),
    labelY: CY - labelR * Math.cos(mid),
  };
}

export default function StudentExperiencePie({ items }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const slices = items.map((_, i) => buildSlice(i));

  const handleEnter = (i) => () => setActiveIdx(i);
  const handleLeave = () => setActiveIdx(null);

  const active = activeIdx !== null ? items[activeIdx] : null;

  return (
    <div className="pie">
      <div className="pie__chart">
        <svg
          className="pie__svg"
          viewBox="0 0 440 440"
          role="img"
          aria-label="Our students' experience — four equal portions"
        >
          {slices.map((s, i) => {
            const item = items[i];
            const isActive = activeIdx === i;
            return (
              <g
                key={item.id}
                className={`pie__slice${isActive ? ' pie__slice--active' : ''}`}
                onMouseEnter={handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <path
                  d={s.path}
                  fill={item.color}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={item.title}
                  onFocus={handleEnter(i)}
                  onBlur={handleLeave}
                />
                <text
                  className="pie__label"
                  x={s.labelX}
                  y={s.labelY}
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {item.titleLines.map((line, li) => (
                    <tspan
                      key={li}
                      x={s.labelX}
                      dy={li === 0 ? `${(item.titleLines.length - 1) * -0.55}em` : '1.15em'}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="pie__panel" role="status" aria-live="polite">
        {active ? (
          <article className="pie__card">
            <span
              className="pie__card-swatch"
              style={{ backgroundColor: active.color }}
              aria-hidden="true"
            />
            <div>
              <h3 className="pie__card-title">{active.title}</h3>
              <p className="pie__card-body">{active.body}</p>
            </div>
          </article>
        ) : (
          <p className="pie__hint">
            Hover (or tab to) a wedge to read about that part of our students&rsquo; experience.
          </p>
        )}
      </div>
    </div>
  );
}
