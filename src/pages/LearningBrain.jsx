import { useEffect } from 'react';
import './LearningBrain.css';

const BASE = import.meta.env.BASE_URL;

export default function LearningBrain() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Learning & the Brain | Episcopal High School';
    document.body.style.overflow = 'hidden';
    return () => {
      document.title = previous;
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="lb-frame-wrap">
      <iframe
        src={`${BASE}brain-model.html`}
        title="Interactive Brain Learning Model"
        className="lb-frame"
      />
    </div>
  );
}
