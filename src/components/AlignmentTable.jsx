import { useId, useState } from 'react';
import './AlignmentTable.css';

export default function AlignmentTable({
  rows,
  firstColumnLabel = 'Discipline',
  rowNoun = 'row',
  rowNounPlural = 'rows',
  ariaLabel,
}) {
  const [openRows, setOpenRows] = useState(() => new Set());
  const tableId = useId();

  const toggle = (id) =>
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const expandAll = () => setOpenRows(new Set(rows.map((r) => r.id)));
  const collapseAll = () => setOpenRows(new Set());
  const allOpen = openRows.size === rows.length;

  return (
    <div className="al-wrapper">
      <div className="al-toolbar">
        <button
          type="button"
          className="al-btn"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen
            ? `Collapse all ${rowNounPlural}`
            : `Expand all ${rowNounPlural}`}
        </button>
      </div>

      <table className="al-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            <th scope="col" className="al-colhead al-colhead--disc">
              {firstColumnLabel}
            </th>
            <th scope="col" className="al-colhead">
              Alignment
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => {
            const isOpen = openRows.has(d.id);
            const buttonId = `${tableId}-btn-${d.id}`;
            const panelId = `${tableId}-panel-${d.id}`;
            return (
              <tr key={d.id} className={isOpen ? 'al-row al-row--open' : 'al-row'}>
                <th scope="row" className="al-rowhead">
                  <span className="al-rowhead__name">{d.name}</span>
                  {d.subtitle && (
                    <span className="al-rowhead__sub">{d.subtitle}</span>
                  )}
                </th>
                <td className="al-cell" data-label="Alignment">
                  <button
                    type="button"
                    id={buttonId}
                    className={`al-disclosure${isOpen ? ' al-disclosure--open' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(d.id)}
                  >
                    <span>
                      {isOpen ? 'Hide' : 'Show'} alignment{' '}
                      <span className="al-disclosure__count">({d.items.length})</span>
                    </span>
                    <svg
                      className="al-disclosure__icon"
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
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="al-panel"
                    hidden={!isOpen}
                  >
                    <ol className="al-panel__list">
                      {d.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
