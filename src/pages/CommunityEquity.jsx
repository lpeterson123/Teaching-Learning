import { useEffect, useId, useState } from 'react';
import Accordion from '../components/Accordion.jsx';
import AlignmentTable from '../components/AlignmentTable.jsx';
import './CommunityEquity.css';

const COMPETENCIES = [
  {
    id: 'knowledge',
    name: 'Cultural Knowledge',
    exceeding:
      'We demonstrate a sophisticated understanding of the range of cultures represented by students, co-workers, and families. Importantly, this includes the educator’s own culture and the School’s culture—institutional and social.',
    suggestions: [
      {
        term: 'Examine your own cultural identity.',
        body: 'Take time to learn, then interrogate your own cultural norms, and think about how they play out in the way you relate to students.',
      },
      {
        term: 'Audit your curriculum',
        body: 'for whose voices, histories, and contributions are represented and whose are missing.',
      },
      {
        term: 'Learn the cultural backgrounds',
        body: 'of your students and their families; understand how culture shapes learning and communication styles.',
      },
      {
        term: 'Engage in ongoing self-education',
        body: 'about cultures represented in your classroom and society (reading, workshops, community events).',
      },
      {
        term: 'Move cultural exploration',
        body: 'beyond food, holidays, and costumes to explore values, historical contexts, and contemporary realities.',
      },
      {
        term: 'Recognize intra-group diversity',
        body: 'to see that viewpoints and norms vary, even within a single cultural identity.',
      },
    ],
  },
  {
    id: 'engagement',
    name: 'Intentional Cultural Engagement',
    exceeding:
      'Teachers consistently incorporate diverse perspectives of learning and assessment, facilitate shared understanding among students and appreciation of cultures among students, and demonstrate awareness of the benefits and limitations of the teacher’s own cultural vantage.',
    suggestions: [
      {
        term: 'Establish and update classroom norms',
        body: 'that value multiple communication styles and establish guardrails for respectful inquiry about differences.',
      },
      {
        term: 'Model classroom norms,',
        body: 'including curiosity and humility, especially when engaging with perspectives and cultures different from your own.',
      },
      {
        term: 'Create structures for dialogue and collaboration',
        body: "where students share perspectives and build on each other's ideas.",
      },
      {
        term: 'Share the story of your own growth journey',
        body: 'with students—model vulnerability, showing we never stop learning.',
      },
      {
        term: 'Use varied participation formats',
        body: '—written reflection, small groups, fishbowl discussions, anonymous polls—so different communication styles can thrive.',
      },
      {
        term: 'Design collaborative activities',
        body: 'that intentionally mix students across cultural backgrounds, with reminders and modeling about respectful inquiry.',
      },
      {
        term: 'Whenever possible, practice anonymous grading.',
        body: 'Note the impulse to guess who you are grading; re-think your exercise of discretion on assessing clarity of expression or how much credit to award for "showing work."',
      },
    ],
  },
  {
    id: 'responsiveness',
    name: 'Intercultural Responsiveness',
    exceeding:
      'Teachers regularly take measures to correct and recalibrate in awareness of their own biases; they ask complex questions (first of themselves and then of their students); and they seek multiple cultural perspectives, especially in terms of the expectations that surround teachers’ delivery of information, students’ studying and retention of information, and student assessment.',
    suggestions: [
      {
        term: 'Reflect regularly',
        body: 'on how your own cultural position shapes your teaching assumptions and practices.',
      },
      {
        term: 'Tweak curriculum:',
        body: 'layer simpler questions and data points to form increasingly complex inquiries about culture, identity, and difference (i.e., avoid surface-level celebrations, affirmations, or statements of allyship).',
      },
      {
        term: 'Intervene thoughtfully',
        body: 'when bias or stereotyping appears in classroom discussions, and be transparent when it shows up for you—use it as a teaching moment.',
      },
      {
        term: 'Reserve space in your curriculum',
        body: 'for responding to current events that affect different student communities with care and openness.',
      },
      {
        term: 'Adapt instruction',
        body: 'based on cultural learning styles and needs in addition to focusing on the "level" of the course.',
      },
      {
        term: 'Examine your own assumptions',
        body: 'before reacting to or assessing students or behavior that might be culturally influenced.',
      },
      {
        term: 'Adjust your communication style',
        body: 'when working with families from different cultural backgrounds.',
      },
    ],
  },
  {
    id: 'growth',
    name: 'Assess and Reap Benefits of Intercultural Growth',
    exceeding:
      'Teachers assess and reap the benefits of their growth during the cycle. In so doing, they demonstrate adjusted attitudes from working across differences and they continually promote engagement with other cultures, including revised approaches in areas expected and unexpected, including growth experiences from which others might benefit.',
    suggestions: [
      {
        term: 'Create structures for student reflection',
        body: 'on their own cultural assumptions and growth, including ongoing reflection on how they respond to your various modes of instruction.',
      },
      {
        term: 'Seek feedback',
        body: 'from students, families, and colleagues from different backgrounds about your teaching.',
      },
      {
        term: 'Acknowledge mistakes and blind spots,',
        body: 'using them as learning opportunities for yourself and for your students, especially when navigating cultural differences.',
      },
      {
        term: 'Compile the story of your own growth journey,',
        body: 'using the results of your periodic reflections and check-ins.',
      },
      {
        term: 'Build relationships',
        body: 'with friends and colleagues from different backgrounds and, as relevant, learn how they approach cultural competence in work and their personal lives.',
      },
    ],
  },
];

function SuggestionsPanel({ suggestions, isOpen, panelId, labelledBy }) {
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={labelledBy}
      className="cc-suggestions"
      hidden={!isOpen}
    >
      <ul className="cc-suggestions__list">
        {suggestions.map((s) => (
          <li key={s.term}>
            <strong className="cc-suggestions__term">{s.term}</strong>{' '}
            <span>{s.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CulturalCompetencyStack({ competencies }) {
  const [openCards, setOpenCards] = useState(() => new Set());
  const stackId = useId();

  const toggle = (id) =>
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const expandAll = () => setOpenCards(new Set(competencies.map((c) => c.id)));
  const collapseAll = () => setOpenCards(new Set());
  const allOpen = openCards.size === competencies.length;

  return (
    <div className="cc-stack">
      <div className="cc-toolbar">
        <button
          type="button"
          className="cc-btn"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen ? 'Collapse all suggestions' : 'Expand all suggestions'}
        </button>
      </div>

      <div className="cc-cards">
        {competencies.map((c) => {
          const isOpen = openCards.has(c.id);
          const buttonId = `${stackId}-btn-${c.id}`;
          const panelId = `${stackId}-panel-${c.id}`;
          return (
            <article key={c.id} className="cc-card">
              <div className="cc-card__header">
                <span className="cc-card__eyebrow">Competency</span>
                <h3 className="cc-card__name">{c.name}</h3>
              </div>
              <div className="cc-card__body">
                <p className="cc-card__exceeding-label">
                  What it looks like at the &ldquo;Exceeding&rdquo; level
                </p>
                <p className="cc-card__exceeding-text">{c.exceeding}</p>
                <button
                  type="button"
                  id={buttonId}
                  className={`cc-disclosure${isOpen ? ' cc-disclosure--open' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(c.id)}
                >
                  <span>
                    {isOpen ? 'Hide' : 'Show'} suggestions{' '}
                    <span className="cc-disclosure__count">({c.suggestions.length})</span>
                  </span>
                  <svg
                    className="cc-disclosure__icon"
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
                <SuggestionsPanel
                  suggestions={c.suggestions}
                  isOpen={isOpen}
                  panelId={panelId}
                  labelledBy={buttonId}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const ALIGNMENTS = [
  {
    id: 'knowledge',
    eyebrow: '1',
    title: 'Cultural Knowledge',
    disciplines: [
      {
        id: 'humanities',
        name: 'Humanities',
        items: [
          'Teach from multiple perspectives (e.g., colonization from Indigenous viewpoints, the Cold War from Global South perspectives)',
          'Include literature by authors from diverse backgrounds as central texts, not supplements',
          'Examine how power structures have shaped whose stories are preserved and celebrated',
          'Analyze primary sources from non-Western archives and oral traditions',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Reference the global history of mathematics from diverse traditions (e.g., Babylonian, Islamic, African)',
          'Highlight the diverse contexts and identities of mathematicians who contributed to the specific concepts being taught',
          'Understand how cultural contexts shape mathematical notation, problem-solving approaches, and applications',
          'Address and challenge entrenched stereotypes regarding math "ability" by emphasizing cultural values and practices',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Highlight scientists from diverse backgrounds and the barriers they overcame',
          'Incorporate diverse ecological perspectives and traditional scientific practices into the study of natural systems',
          'Examine how scientific "objectivity" has historically been shaped by cultural assumptions',
          'Contextualize the global distribution of scientific resources and the impact of geography on scientific discovery',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Teach target cultures as living, evolving entities—not frozen in textbook stereotypes',
          'Explore dialectical and regional variations within a language community',
          'Address the colonial histories that shaped language spread',
          "Value heritage speakers' cultural knowledge as resources without placing the burden of teaching on them",
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Study artistic traditions from multiple cultures with attention to their original contexts and meanings',
          'Examine how Western art history has marginalized or appropriated other traditions',
          'Encourage students to draw upon their own cultural artistic heritage in their creative output',
          'Discuss the ethics of cultural borrowing vs. cultural exchange in creative work',
        ],
      },
    ],
  },
  {
    id: 'engagement',
    eyebrow: '2',
    title: 'Intentional Cultural Engagement',
    disciplines: [
      {
        id: 'humanities',
        name: 'Humanities',
        items: [
          'Structure Socratic seminars or Harkness discussions that explicitly invite multiple cultural interpretations of texts',
          'Assign perspective-taking exercises (e.g., "Write from the viewpoint of...")',
          'Create deliberation exercises on contested historical or ethical questions in which cultural values inform positions',
          'Partner with classes at schools in different regions or with different demographics for collaborative projects',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Use group problem-solving structures that value different approaches, not just speed to a single answer',
          'Facilitate the sharing of varied solution methods, acknowledging that different cultures may prioritize different algorithmic or representational approaches to the same problem',
          'Design applications that require students to engage with the mathematical needs and realities of diverse communities',
          'Model how mathematical reasoning can be used as a tool for cross-cultural communication and problem-solving',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Facilitate lab groups with attention to equitable participation and rotating leadership',
          'Incorporate projects that explore how global issues (climate, health) affect communities in different ways',
          'Create space for students to connect scientific concepts to their family or cultural knowledge',
          'Use case studies that require weighing scientific evidence alongside community values',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Build conversation partnerships that pair students with different strengths',
          'Create cultural exchange opportunities with target-language speakers or countries',
          'Design role-plays that require navigating cultural differences in communication (formal/informal registers, directness, hospitality norms)',
          "Invite heritage speakers to contribute their expertise as co-creators of the classroom's cultural understanding",
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          "Facilitate collaborative projects that blend influences from students' different backgrounds",
          'Structure critique sessions that welcome diverse aesthetic standards',
          'Create ensemble work in which students must listen and respond to each other across differences',
          'Invite students to lead peers in exploring techniques or art forms rooted in their own cultural backgrounds',
        ],
      },
    ],
  },
  {
    id: 'responsiveness',
    eyebrow: '3',
    title: 'Intercultural Responsiveness',
    disciplines: [
      {
        id: 'humanities',
        name: 'Humanities',
        items: [
          'Design essential questions that probe cultural complexity: "Whose justice?" "Freedom for whom?" "What counts as progress?"',
          'Teach students to ask "Who benefits from this narrative? Whose perspective is centered or marginalized?"',
          'Create space for responding to current events related to cultural identity',
          'When teaching controversial topics, help students understand how cultural and historical positions shape perspectives',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Audit course assessment data and placement recommendations to identify and remove hidden barriers that may prevent students from underrepresented communities from advancing to higher-level math',
          'Pose problems in diverse contexts and explore how those contexts influence mathematical choices',
          'Question the "one right answer" framing and examine how mathematical modeling involves value choices',
          'Investigate how algorithms and data can encode bias and affect communities differently',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Explore bioethics case studies that involve different cultural perspectives on the body and nature',
          'Examine environmental justice and the disproportionate impact of pollution/climate change on marginalized groups',
          'Discuss the history of ethics, including informed consent, and the exploitation of marginalized communities in scientific research',
          'Ask students to consider: "Who decides what counts as scientific knowledge?" and "Who benefits from this research?"',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Address code-switching and linguistic identity: when and why people shift between languages or registers',
          'Discuss language policy and the politics of language in the target culture',
          'Model curiosity rather than judgment when navigating cultural misunderstandings in the classroom',
          'Teach students to probe beyond surface differences to find underlying cultural values and worldviews',
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Teach students the professional habit of identifying the cultural and historical origins of techniques or styles they use in their own work',
          'Analyze how artistic standards can perpetuate stereotypes, and how they can challenge them',
          'Discuss power dynamics, including the ethics of representation, in whose art gets funding, exhibition space, and critical attention',
          'Provide diverse mediums and opportunities for students to express their cultural identities through art',
        ],
      },
    ],
  },
  {
    id: 'growth',
    eyebrow: '4',
    title: 'Assess and Reap Benefits of Intercultural Growth',
    disciplines: [
      {
        id: 'humanities',
        name: 'Humanities',
        items: [
          'Model intellectual humility by sharing personal growth or blind spots discovered in interpreting history',
          "Teach students to notice when they're making assumptions based on their own cultural lens",
          'Incorporate reflection on how individual backgrounds shape the interpretation of texts',
          'Assess student growth in their ability to synthesize multiple cultural perspectives',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          "Audit your participation and effort criteria to ensure they don't inadvertently favor specific cultural communication styles over actual mathematical comprehension",
          'Implement name-less grading practices for high-stakes assessments to ensure feedback and scoring are based solely on demonstrated mastery rather than perceived ability or potential',
          'Create opportunities for students to develop a positive math identity regardless of their cultural background',
          'Challenge fixed mindset language that correlates with cultural stereotypes',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Critically examine how your own curriculum may inadvertently reinforce cultural biases in scientific "objectivity"',
          'Reflect on the messages students receive about "who belongs" in science based on classroom representation',
          'Model transparency when discussing historical medical racism or exploitation in your field',
          'Design assessments that require students to adapt scientific solutions to specific regional or cultural constraints (e.g., resource availability, climate factors, or local infrastructure)',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Model for students when you learn something new or are surprised by a target-culture norm',
          'Challenge language hierarchies in the classroom by valuing diverse accents and dialects',
          'Validate the diverse linguistic histories students bring to the classroom as assets for learning',
          'Encourage student reflection on how their own communication styles differ from target-culture norms',
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Engage in regular self-reflection on how your own cultural aesthetic influences your grading and feedback',
          'Examine how standards of "good art" or "good technique" are culturally constructed and potentially biased',
          'Create critique protocols that require considering missing cultural perspectives in a work',
          'Assess student growth in using art as a medium for intercultural dialogue and self-expression',
        ],
      },
    ],
  },
];

const DISCIPLINES = [
  { id: 'humanities', name: 'Humanities' },
  { id: 'math', name: 'Math' },
  { id: 'science', name: 'Science' },
  { id: 'languages', name: 'Languages' },
  { id: 'arts', name: 'The Arts' },
];

// Transpose ALIGNMENTS (grouped by competency) into rows grouped by
// discipline. Each discipline accordion then holds a table with 4
// competency rows — preserving any subtitles from the source images.
const ALIGNMENTS_BY_DISCIPLINE = DISCIPLINES.map(({ id, name }) => {
  const rows = ALIGNMENTS.map((comp) => {
    const disc = comp.disciplines.find((d) => d.id === id);
    return {
      id: comp.id,
      name: comp.title,
      subtitle: disc.subtitle,
      items: disc.items,
    };
  });
  return { id, name, rows };
});

const ALIGNMENT_ACCORDION_ITEMS = ALIGNMENTS_BY_DISCIPLINE.map((d) => ({
  id: d.id,
  eyebrow: 'Discipline',
  title: d.name,
  body: (
    <AlignmentTable
      rows={d.rows}
      firstColumnLabel="Competency"
      rowNoun="competency"
      rowNounPlural="competencies"
      ariaLabel={`${d.name} — competency alignment`}
    />
  ),
}));

export default function CommunityEquity() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Office of Community and Equity | Episcopal High School';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <section className="ce-hero" aria-labelledby="ce-hero-title">
        <div className="container ce-hero__inner">
          <p className="ce-hero__eyebrow">Office of Community and Equity</p>
          <h1 id="ce-hero-title" className="ce-hero__title">
            Cultural Competency in the Classroom: A Practical Guide
          </h1>
          <p className="ce-hero__subtitle">
            Four cultural competencies at the &ldquo;Exceeding&rdquo; level and
            practical, research-aligned moves teachers can make across each one.
          </p>
        </div>
      </section>

      <section className="ce-section" aria-label="Cultural competencies">
        <div className="container">
          <CulturalCompetencyStack competencies={COMPETENCIES} />
        </div>
      </section>

      <section className="ce-section ce-section--alignment" aria-labelledby="ce-alignment-title">
        <div className="container">
          <header className="ce-section__header">
            <p className="ce-section__eyebrow">Discipline Alignment</p>
            <h2 id="ce-alignment-title" className="ce-section__title">
              Cultural Competency Across the Curriculum
            </h2>
            <p className="ce-section__subtitle">
              Expand a discipline to see how each of the four cultural
              competencies aligns to its teaching, then expand a competency to
              reveal concrete teaching moves.
            </p>
          </header>

          <Accordion
            items={ALIGNMENT_ACCORDION_ITEMS}
            ariaLabel="Cultural competency discipline alignment"
          />
        </div>
      </section>
    </>
  );
}
