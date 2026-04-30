import { useEffect, useMemo, useState } from 'react';
import Accordion from '../components/Accordion.jsx';
import StudentExperiencePie from '../components/StudentExperiencePie.jsx';
import './Home.css';

// Each student experience connects to a subset of the five teaching domains.
// Hovering or focusing a wedge / legend row highlights those domains in the
// accordion next to the chart.
const EXPERIENCE_TO_DOMAINS = {
  'experience-voice': ['domain-1', 'domain-3', 'domain-5'],
  'experience-personalized': ['domain-1', 'domain-4', 'domain-5'],
  'experience-pedagogy': ['domain-2', 'domain-3', 'domain-5'],
  'experience-beyond': ['domain-1', 'domain-2', 'domain-3'],
};

// Short labels used in the "Driven by" footer of the description card.
const SHORT_DOMAIN_NAMES = {
  'domain-1': 'Learning Environment',
  'domain-2': 'Content Mastery',
  'domain-3': 'Instructional Clarity',
  'domain-4': 'Practice & Memory',
  'domain-5': 'Assessment & Feedback',
};

const MISSION_STATEMENT = `At the heart of our work is a commitment to every
learner — ensuring equitable, inclusive conditions where students are
challenged, supported, and empowered to take ownership of their growth.
Within our unique 100% boarding, D.C.-area community, we cultivate
self-directed learners through purposeful experiential and interdisciplinary
opportunities, while educators model the same professional curiosity,
collaboration, and lifelong learning we ask of our students.`;

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
  const [activeExperienceId, setActiveExperienceId] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Home | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  // Augment each experience item with the list of short domain names it is
  // driven by, so the pie's description card can render the "Driven by" line.
  const pieItems = useMemo(
    () =>
      STUDENT_EXPERIENCE.map((exp) => ({
        ...exp,
        drivenBy: (EXPERIENCE_TO_DOMAINS[exp.id] ?? []).map(
          (d) => SHORT_DOMAIN_NAMES[d],
        ),
      })),
    [],
  );

  const activeExperience = pieItems.find((e) => e.id === activeExperienceId);
  const highlightedDomains = useMemo(
    () =>
      activeExperienceId
        ? new Set(EXPERIENCE_TO_DOMAINS[activeExperienceId] ?? [])
        : new Set(),
    [activeExperienceId],
  );

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
              Hover or focus a wedge to read about that experience and see the
              connected teaching domains light up.
            </p>
            <StudentExperiencePie
              items={pieItems}
              activeId={activeExperienceId}
              onActiveChange={setActiveExperienceId}
            />
          </article>

          <article className="framework__column" aria-labelledby="col-domains-title">
            <h2 id="col-domains-title" className="framework__heading">
              Key Domains of Teaching Excellence
            </h2>
            <p className="framework__hint">Select a domain to read more.</p>
            <Accordion
              items={TEACHING_DOMAINS}
              ariaLabel="Key Domains of Teaching Excellence"
              highlightedIds={highlightedDomains}
              highlightColor={activeExperience?.color}
            />
          </article>
        </div>
      </section>
    </>
  );
}
