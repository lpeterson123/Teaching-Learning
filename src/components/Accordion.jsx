import { useId, useState } from 'react';
import './Accordion.css';

export default function Accordion({ items, ariaLabel, highlightedIds, highlightColor }) {
  const [openKeys, setOpenKeys] = useState(() => new Set());
  const groupId = useId();

  const toggle = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <ul className="accordion" aria-label={ariaLabel}>
      {items.map((item, index) => {
        const key = item.id ?? index;
        const isOpen = openKeys.has(key);
        const isHighlighted = highlightedIds?.has(item.id) ?? false;
        const headerId = `${groupId}-h-${index}`;
        const panelId = `${groupId}-p-${index}`;
        const itemStyle =
          isHighlighted && highlightColor
            ? { '--accordion-highlight': highlightColor }
            : undefined;

        return (
          <li
            key={key}
            className={`accordion__item${isOpen ? ' accordion__item--open' : ''}${isHighlighted ? ' accordion__item--highlighted' : ''}`}
            style={itemStyle}
          >
            <h3 className="accordion__heading">
              <button
                type="button"
                id={headerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(key)}
              >
                <span className="accordion__title">
                  {item.eyebrow && (
                    <span className="accordion__eyebrow">{item.eyebrow}</span>
                  )}
                  <span className="accordion__label">{item.title}</span>
                </span>
                <span className="accordion__icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14">
                    <path
                      d="M3 6 L8 11 L13 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className="accordion__panel"
              hidden={!isOpen}
            >
              <div className="accordion__panel-inner">{item.body}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
