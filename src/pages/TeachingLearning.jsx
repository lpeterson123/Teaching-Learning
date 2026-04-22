import { useEffect } from 'react';
import Accordion from '../components/Accordion.jsx';
import './TeachingLearning.css';

function DomainDetails({ definition, keyIndicators, implementation, research, sources }) {
  return (
    <dl className="domain-details">
      <div className="domain-details__row">
        <dt className="domain-details__term">Definition</dt>
        <dd className="domain-details__desc">
          <p>{definition}</p>
        </dd>
      </div>

      <div className="domain-details__row">
        <dt className="domain-details__term">Key Indicators</dt>
        <dd className="domain-details__desc">
          <ul className="domain-details__list">
            {keyIndicators.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </dd>
      </div>

      <div className="domain-details__row">
        <dt className="domain-details__term">Implementation</dt>
        <dd className="domain-details__desc">
          <ul className="domain-details__list">
            {implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </dd>
      </div>

      <div className="domain-details__row">
        <dt className="domain-details__term">Research Connections</dt>
        <dd className="domain-details__desc">
          <p className="domain-details__italic">{research}</p>
        </dd>
      </div>

      <div className="domain-details__row">
        <dt className="domain-details__term">Source Frameworks</dt>
        <dd className="domain-details__desc">
          <p>{sources}</p>
        </dd>
      </div>
    </dl>
  );
}

const DOMAINS = [
  {
    id: 'domain-1',
    eyebrow: 'Domain 1',
    title: 'The Learning Environment — Culture, Management, and Relationships',
    details: {
      definition:
        'Creating and maintaining an organized, efficient, and purposeful learning environment that maximizes time on task, minimizes disruption, and fosters a supportive, intellectually stimulating classroom culture characterized by high expectations, positive relationships, and a shared commitment to thinking and learning.',
      keyIndicators: [
        'Establishes clear routines and procedures',
        "Maintains consistent, fair behavioral expectations and proactively monitors students' presence within the classroom",
        'Uses language that values thinking and effort, helps to foster resilience, and cultivate a growth mindset',
        'Intentionally designs a dynamic space conducive to the learning process',
        'Builds positive teacher-student and peer relationships',
        'Motivates and engages students; generates curiosity, provides meaningful choice and student agency',
        "Demonstrates knowledge of students' individual interests, cultural backgrounds, and extracurricular lives",
      ],
      implementation: [
        'Automate classroom procedures and establish predictable lesson structures to reduce extraneous cognitive load',
        'Establish norms for productive struggle and intellectual risk-taking, while developing language that normalized such struggle as part of learning',
        'Build a culture where asking questions and seeking feedback is valued',
        'Frame feedback as growth-oriented information and model metacognitive talk to encourage thinking and self correction',
        'Create routines for retrieval practice',
        'Design the physical environment to minimize distractions (reduce extraneous load)',
        'Build in structured think time to support cognitive processing',
        'Create psychological safety for intellectual risk-taking and error',
        'Celebrate the process of retrieval and effortful thinking, not just correct answers',
        'Teach students that forgetting and re-learning strengthens memory',
        'Provide opportunities for student voice in learning processes',
      ],
      research: 'Cognitive Load Theory, Metacognition, Feedback',
      sources:
        'Coe et al. (Classroom climate, Classroom management), MARGE (Motivate, Attend), Praetorius (Classroom management, Student support), Creemers & Kyriakides (Learning environment, Time management), Great Teaching Toolkit (Maximising opportunity to learn, Creating supportive environment), Culture of Thinking (Expectations, Language, Interactions, Routines, Environment), Making Every Lesson Count (Challenge)',
    },
  },
  {
    id: 'domain-2',
    eyebrow: 'Domain 2',
    title: 'Content Mastery',
    details: {
      definition:
        'Deep understanding of subject matter including how students learn the content, common misconceptions, prerequisite knowledge, and the ability to represent concepts in multiple ways.',
      keyIndicators: [
        'Demonstrates fluent, accurate subject knowledge',
        'Uses effective analogies and representations',
        'Anticipates and addresses common misconceptions',
        'Connects new learning to prior knowledge and real-world applications',
        'Adapts explanations based on student understanding',
        'Demonstrates passion and enthusiasm for the subject',
      ],
      implementation: [
        'Continuously deepen subject knowledge through professional learning',
        'Study common student misconceptions in your subject area',
        'Develop a repertoire of analogies, examples, and representations for key concepts',
        'Create schema-building activities that explicitly connect new content to prior learning',
        'Use worked examples that make expert thinking visible',
        'Anticipate where students will struggle and prepare multiple explanatory approaches',
      ],
      research: 'Cognitive Load Theory, Interleaving, Metacognition, Feedback',
      sources:
        'Coe et al. (Content knowledge), Great Teaching Toolkit (Understanding the content), MARGE (Relate)',
    },
  },
  {
    id: 'domain-3',
    eyebrow: 'Domain 3',
    title: 'Instructional Clarity, Cognitive Activation & Curriculum Design',
    details: {
      definition:
        'The deliberate use of explanation, modeling, questioning, and structured activities to engage students in deep thinking and meaningful learning, combined with effective sequencing and curriculum design that builds knowledge logically from simple to complex.',
      keyIndicators: [
        'Provides clear, well-structured explanations',
        'Models thinking processes explicitly (think-alouds)',
        'Uses challenging questions that promote higher-order thinking',
        'Activates and builds on prior knowledge',
        'Employs Socratic questioning and discourse',
        'Promotes metacognition and self-regulation',
        'Sequences learning logically from simple to complex',
        'Designs curriculum maps that build knowledge systematically',
        'Chunks complex content into manageable segments',
      ],
      implementation: [
        'Use think-alouds to make expert thinking visible, modeling metacognitive processes',
        'Integrate dual coding by combining verbal explanations with visual representations',
        'Manage cognitive load by presenting information through complementary channels (modality effect)',
        'Prompt students to verbalize their thinking and reasoning strategies',
        "Use questioning to surface and examine students' mental models",
        'Teach metacognitive strategies explicitly: planning, monitoring, and evaluating',
        'Minimize split attention by integrating text and diagrams',
        'Chunk complex content into manageable segments to reduce intrinsic cognitive load',
        'Use worked examples and completion problems before independent practice',
        'Design curriculum maps that interleave related concepts across units',
        'Remove extraneous information from instructional materials (redundancy effect)',
        'Gradually fade scaffolds as student expertise develops (expertise reversal effect)',
      ],
      research: 'Cognitive Load Theory, Metacognition, Interleaving',
      sources:
        'Rosenshine (Questioning, Modeling, Present in small steps), Praetorius (Cognitive activation), Great Teaching Toolkit (Activating hard thinking), Making Every Lesson Count (Explanation, Modelling, Questioning), MARGE (Relate)',
    },
  },
  {
    id: 'domain-4',
    eyebrow: 'Domain 4',
    title: 'Practice & Memory Consolidation',
    details: {
      definition:
        'Structured opportunities for guided and independent practice, retrieval, and spaced review that strengthen long-term memory and transfer.',
      keyIndicators: [
        'Provides scaffolded practice with gradual release of responsibility',
        'Incorporates retrieval practice and generative learning strategies',
        'Implements regular review (daily, weekly, monthly)',
        'Monitors and adjusts practice based on student needs',
        'Uses deliberate practice with clear goals and feedback',
      ],
      implementation: [
        'Begin lessons with retrieval practice of previously learned material (5–10 min)',
        'Use spaced practice: distribute learning over time rather than massing',
        'Interleave problem types and topics within practice sessions',
        'Employ varied retrieval formats: free recall, cued recall, recognition, application',
        'Implement weekly and monthly cumulative review sessions',
        'Use elaborative interrogation ("Why does this make sense?")',
        'Have students generate their own examples and explanations',
        'Monitor confidence calibration: compare predicted vs. actual performance',
        'Design practice that requires effortful retrieval (desirable difficulties)',
      ],
      research: 'Retrieval Practice, Interleaving, Metacognition',
      sources:
        'Rosenshine (Guide practice, Independent practice, Review), MARGE (Generate), Making Every Lesson Count (Deliberate practice), Creemers & Kyriakides (Application)',
    },
  },
  {
    id: 'domain-5',
    eyebrow: 'Domain 5',
    title: 'Assessment & Feedback',
    details: {
      definition:
        'Systematic checking for understanding and providing timely, actionable feedback that advances learning and promotes student self-assessment.',
      keyIndicators: [
        'Frequently checks understanding of all students',
        'Uses formative assessment to guide instruction',
        'Provides specific, actionable feedback',
        'Ensures high success rates before moving on',
        'Teaches students to self-assess and evaluate their learning',
        'Uses errors as learning opportunities',
        'Uses evidence from formative assessment to pivot or re-teach in real time',
      ],
      implementation: [
        'Use low-stakes quizzes as formative retrieval practice opportunities',
        'Provide feedback that is task-focused, specific, and timely',
        'Implement feedback loops: feedback → student response → verification',
        'Train students in self-assessment using rubrics and success criteria',
        'Use retrieval-based assessments (free recall, cued recall) to identify gaps',
        'Frame errors as diagnostic information, not failures',
        'Teach students to generate their own questions as a metacognitive strategy',
        'Delay feedback appropriately to promote deeper processing when suitable',
      ],
      research: 'Feedback, Retrieval Practice, Metacognition',
      sources:
        'Rosenshine (Check understanding, High success rate), MARGE (Evaluate), Praetorius (Embrace errors, Feedback), Creemers & Kyriakides (Assessment), Making Every Lesson Count (Feedback)',
    },
  },
];

const ACCORDION_ITEMS = DOMAINS.map(({ id, eyebrow, title, details }) => ({
  id,
  eyebrow,
  title,
  body: <DomainDetails {...details} />,
}));

export default function TeachingLearning() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Teaching & Learning | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <section className="tl-hero" aria-labelledby="tl-hero-title">
        <div className="container tl-hero__inner">
          <p className="tl-hero__eyebrow">Teaching &amp; Learning</p>
          <h1 id="tl-hero-title" className="tl-hero__title">
            Key Domains of Teaching Excellence
          </h1>
          <p className="tl-hero__subtitle">
            A reference table of the five domains&mdash;expand a row to view its
            definition, key indicators, implementation moves, research
            connections, and source frameworks.
          </p>
        </div>
      </section>

      <section className="tl-section" aria-label="Key Domains">
        <div className="container">
          <p className="tl-hint">Select a domain to expand.</p>
          <Accordion items={ACCORDION_ITEMS} ariaLabel="Key Domains of Teaching Excellence" />
        </div>
      </section>
    </>
  );
}
