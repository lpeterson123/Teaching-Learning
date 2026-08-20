import { useEffect } from 'react';
import './SixPillars.css';

const BASE = import.meta.env.BASE_URL;

export default function SixPillars() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Six Teaching Pillars | Episcopal High School';
    document.body.style.overflow = 'hidden';
    return () => {
      document.title = previous;
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="sp-frame-wrap">
      <iframe
        src={`${BASE}six-pillars.html`}
        title="Six Teaching Pillars"
        className="sp-frame"
      />
    </div>
  );
}
