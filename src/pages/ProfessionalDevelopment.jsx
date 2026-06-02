import { useEffect } from 'react';
import './ProfessionalDevelopment.css';

const BASE = import.meta.env.BASE_URL;

export default function ProfessionalDevelopment() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Resources | Episcopal High School';
    document.body.style.overflow = 'hidden';
    return () => {
      document.title = previous;
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="pd-frame-wrap">
      <iframe
        src={`${BASE}cultural-competency-dashboard.html`}
        title="Cultural Competency Dashboard"
        className="pd-frame"
      />
    </div>
  );
}
