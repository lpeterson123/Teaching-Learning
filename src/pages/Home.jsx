import { useEffect } from 'react';
import Accordion from '../components/Accordion.jsx';
import StudentExperiencePie from '../components/StudentExperiencePie.jsx';
import './Home.css';

const MISSION_STATEMENT = `Our Learning and Teaching Framework is anchored in the belief that
intentionality drives excellence. High-quality teaching is a deliberate,
reflective practice focused on creating the optimal conditions—intellectual,
environmental, and relational—that enable deep thinking, retention, and
transfer of knowledge. Within our unique 100% boarding community, we move
beyond content coverage to develop empowered, self-directed learners through
experiential and interdisciplinary opportunities aligned with the Portrait
of a Graduate. We are committed to inclusive and equitable learning for all.
This requires educators to integrate high expectations with deep understanding
and support, model professional growth, differentiate instruction, and foster
a climate where every student is challenged, feels a genuine sense of
belonging, and takes ownership of their journey as a lifelong learner.`;

const TEACHING_DOMAINS = [
  {
    id: 'domain-1',
    eyebrow: 'Domain I',
    title: 'The Learning Environment — Culture and Relationships',
    body: (
      <p>
        Creating and maintaining an organized, efficient, and purposeful learning
        environment that maximizes time on task, minimizes disruption, and
        fosters a supportive, intellectually stimulating classroom culture
        characterized by high expectations, positive relationships, and a shared
        commitment to thinking and learning.
      </p>
    ),
  },
  {
    id: 'domain-2',
    eyebrow: 'Domain II',
    title: 'Content Mastery',
    body: (
      <p>
        Deep understanding of subject matter including how students learn the
        content, common misconceptions, prerequisite knowledge, and the ability
        to represent concepts in multiple ways.
      </p>
    ),
  },
  {
    id: 'domain-3',
    eyebrow: 'Domain III',
    title: 'Instructional Clarity & Curriculum Design',
    body: (
      <p>
        The deliberate use of explanation, modeling, questioning, and structured
        activities to engage students in deep thinking and meaningful learning,
        combined with effective sequencing and curriculum design that builds
        knowledge logically from simple to complex.
      </p>
    ),
  },
  {
    id: 'domain-4',
    eyebrow: 'Domain IV',
    title: 'Practice & Memory Consolidation',
    body: (
      <p>
        Structured opportunities for guided and independent practice, retrieval,
        and spaced review that strengthen long-term memory and transfer.
      </p>
    ),
  },
  {
    id: 'domain-5',
    eyebrow: 'Domain V',
    title: 'Assessment & Feedback',
    body: (
      <p>
        Systematic checking for understanding and providing timely, actionable
        feedback that advances learning and promotes student self-assessment.
      </p>
    ),
  },
];

// Order matches pie geometry: slice 0 = top-right, slice 1 = bottom-right,
// slice 2 = bottom-left, slice 3 = top-left.
const STUDENT_EXPERIENCE = [
  {
    id: 'experience-personalized',
    title: 'Personalized Growth',
    titleLines: ['Personalized', 'Growth'],
    color: '#006890',
    body:
      "Every student is supported and challenged through differentiated outcomes, flexible groupings, and appropriate accommodations. Growth is tracked through balanced internal and external data, enabling personalized support, early intervention, and informed goal-setting that honors each learner’s trajectory.",
  },
  {
    id: 'experience-beyond',
    title: 'Learning Beyond the Classroom',
    titleLines: ['Learning Beyond', 'the Classroom'],
    color: '#5a1434',
    body:
      'Students pursue opportunities that extend learning and leadership beyond campus—through service, internships, and engagement with the greater Washington, D.C. community and the world beyond.',
  },
  {
    id: 'experience-pedagogy',
    title: 'Purposeful Pedagogy',
    titleLines: ['Purposeful', 'Pedagogy'],
    color: '#54565b',
    body:
      'Teachers employ varied questioning techniques, thinking routines, and a shared academic vocabulary that makes learning visible and transferable across disciplines. Assessment is continuous, practical, and integral to learning. Technology extends and enhances learning when it serves a clear pedagogical purpose.',
  },
  {
    id: 'experience-voice',
    title: 'Voice & Ownership',
    titleLines: ['Voice &', 'Ownership'],
    color: '#7a1e46',
    body:
      'Students shape, plan, and lead their own learning. They set meaningful goals, reflect on progress, and provide feedback on their educational experience. Through a growth mindset, they develop resilience, embrace challenges, learn from feedback, and take responsibility as members of a caring community.',
  },
];

export default function Home() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Home | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="container home-hero__inner">
          <h1 id="home-hero-title" className="home-hero__title">
            Our Teaching &amp; Learning Framework
          </h1>
          <p className="home-hero__subtitle">
            A shared vision for intentional teaching and empowered student
            learning at Episcopal High School.
          </p>
        </div>
      </section>

      <section className="mission" aria-labelledby="mission-title">
        <div className="container">
          <article
            className="framework__column framework__column--mission"
            aria-labelledby="mission-title"
          >
            <h2 id="mission-title" className="framework__heading">
              Mission Statement
            </h2>
            <p className="framework__prose">{MISSION_STATEMENT}</p>
          </article>
        </div>
      </section>

      <section className="framework" aria-label="Framework">
        <div className="container framework__grid">
          <article className="framework__column" aria-labelledby="col-experience-title">
            <h2 id="col-experience-title" className="framework__heading">
              Our Students&rsquo; Experience
            </h2>
            <p className="framework__hint">
              Hover or focus a wedge to read about that experience.
            </p>
            <StudentExperiencePie items={STUDENT_EXPERIENCE} />
          </article>

          <article className="framework__column" aria-labelledby="col-domains-title">
            <h2 id="col-domains-title" className="framework__heading">
              Key Domains of Teaching Excellence
            </h2>
            <p className="framework__hint">Select a domain to read more.</p>
            <Accordion
              items={TEACHING_DOMAINS}
              ariaLabel="Key Domains of Teaching Excellence"
            />
          </article>
        </div>
      </section>
    </>
  );
}
