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
        term: 'Audit your curriculum',
        body: 'for whose voices, histories, and contributions are represented—and whose are missing.',
      },
      {
        term: 'Learn the cultural backgrounds',
        body: 'of your students and their families; understand how those backgrounds shape learning preferences and communication styles.',
      },
      {
        term: 'Engage in ongoing self-education',
        body: 'about cultures represented in your classroom and broader society (reading, workshops, community events).',
      },
      {
        term: 'Avoid "tourist" approaches',
        body: 'that reduce cultures to food, holidays, and costumes; explore deeper values, historical contexts, and contemporary realities.',
      },
      {
        term: 'Recognize within-group diversity',
        body: '—no culture is monolithic.',
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
        term: 'Design collaborative activities',
        body: 'that intentionally mix students across cultural backgrounds.',
      },
      {
        term: 'Establish classroom norms',
        body: 'that value multiple communication styles (not just dominant-culture norms like direct eye contact or individual competition).',
      },
      {
        term: 'Create structures for dialogue',
        body: "where students share perspectives and build on each other's ideas.",
      },
      {
        term: 'Use varied participation formats',
        body: ': written reflection, small groups, fishbowl discussions, anonymous polls—so different communication styles can thrive.',
      },
      {
        term: 'Model curiosity and humility',
        body: 'when engaging with perspectives different from your own.',
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
        term: 'Intervene thoughtfully',
        body: 'when bias or stereotyping appears in classroom discussions—use it as a teaching moment.',
      },
      {
        term: 'Design curriculum that asks complex questions',
        body: 'about culture, identity, and difference—not just surface-level celebration.',
      },
      {
        term: 'Differentiate instruction',
        body: 'based on cultural learning styles and needs, not just academic levels.',
      },
      {
        term: 'Respond to current events',
        body: 'that affect different student communities with care and openness.',
      },
      {
        term: 'Examine your own assumptions',
        body: 'before reacting to student behavior that may be culturally influenced.',
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
        term: 'Reflect regularly',
        body: 'on how your own cultural position shapes your teaching assumptions and practices.',
      },
      {
        term: 'Seek feedback',
        body: 'from students, families, and colleagues from different backgrounds about your teaching.',
      },
      {
        term: 'Share your own growth journey',
        body: 'with students—model that intercultural learning is lifelong.',
      },
      {
        term: 'Create structures for student reflection',
        body: 'on their own cultural assumptions and growth.',
      },
      {
        term: 'Frame mistakes as learning opportunities',
        body: '—both for yourself and students—when navigating cultural difference.',
      },
      {
        term: 'Build relationships',
        body: 'with colleagues from different backgrounds; learn from how they approach teaching.',
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

function CulturalCompetencyTable({ competencies }) {
  const [openCols, setOpenCols] = useState(() => new Set());
  const tableId = useId();

  const toggleColumn = (id) =>
    setOpenCols((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const expandAll = () => setOpenCols(new Set(competencies.map((c) => c.id)));
  const collapseAll = () => setOpenCols(new Set());
  const allOpen = openCols.size === competencies.length;

  return (
    <div className="cc-wrapper">
      <div className="cc-toolbar">
        <button
          type="button"
          className="cc-btn"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen ? 'Collapse all suggestions' : 'Expand all suggestions'}
        </button>
      </div>

      <div className="cc-scroll">
        <table className="cc-table" aria-label="Cultural competencies reference table">
          <thead>
            <tr>
              <th scope="col" className="cc-corner" aria-hidden="true"></th>
              {competencies.map((c) => (
                <th key={c.id} scope="col" className="cc-colhead">
                  <span className="cc-colhead__eyebrow">Competency</span>
                  <span className="cc-colhead__name">{c.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="cc-rowhead">
                <span className="cc-rowhead__label">
                  What it looks like at the &ldquo;Exceeding&rdquo; level
                </span>
              </th>
              {competencies.map((c) => (
                <td key={c.id} className="cc-cell cc-cell--exceeding" data-label={c.name}>
                  <p>{c.exceeding}</p>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="cc-rowhead">
                <span className="cc-rowhead__label">
                  Broad Suggestions for All Teachers
                </span>
              </th>
              {competencies.map((c) => {
                const isOpen = openCols.has(c.id);
                const buttonId = `${tableId}-btn-${c.id}`;
                const panelId = `${tableId}-panel-${c.id}`;
                return (
                  <td
                    key={c.id}
                    className="cc-cell cc-cell--suggestions"
                    data-label={c.name}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className={`cc-disclosure${isOpen ? ' cc-disclosure--open' : ''}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleColumn(c.id)}
                    >
                      <span>
                        {isOpen ? 'Hide' : 'Show'} suggestions{' '}
                        <span className="cc-disclosure__count">
                          ({c.suggestions.length})
                        </span>
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
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
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
          'Teach historical events from multiple cultural perspectives (e.g., colonization from Indigenous viewpoints, the Cold War from Global South perspectives)',
          'Include literature by authors from diverse backgrounds as central texts, not supplements',
          'Examine how power structures have shaped whose stories get told and preserved',
          'Analyze primary sources from non-Western archives and oral traditions',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Explore the global history of mathematics: contributions from Babylonian, Indian, Chinese, Islamic, and African mathematical traditions',
          'Research mathematicians from underrepresented backgrounds and their contexts',
          'Understand how cultural contexts shape mathematical notation, problem-solving approaches, and applications',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Highlight scientists from diverse backgrounds and the barriers they overcame',
          'Incorporate Indigenous ecological knowledge and traditional scientific practices',
          'Examine how scientific "objectivity" has historically been shaped by cultural assumptions',
          'Discuss how access to science education varies globally and why',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Teach target cultures as living, evolving entities—not frozen in textbook stereotypes',
          'Explore dialectical and regional variations within a language community',
          'Address the colonial histories that shaped language spread',
          "Value heritage speakers' cultural knowledge as classroom resources",
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Study artistic traditions from multiple cultures with attention to their original contexts and meanings',
          'Examine how Western art history has marginalized or appropriated other traditions',
          'Invite students to explore their own cultural artistic heritage',
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
          'Assign perspective-taking writing (e.g., "Write from the viewpoint of…")',
          'Create deliberation exercises on contested historical or ethical questions where cultural values inform positions',
          'Partner with classes at schools in different regions or countries for collaborative projects',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Use group problem-solving structures that value different approaches, not just speed to a single answer',
          'Have students share and compare multiple solution methods—some of which may reflect different cultural mathematical traditions',
          'Design projects where students interview family or community members about how they use math in their lives',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Facilitate lab groups with attention to equitable participation and rotating leadership',
          'Design projects that require students to research how scientific issues (climate, health, technology) affect different communities differently',
          'Create space for students to connect scientific concepts to their family or cultural knowledge',
          'Use case studies that require weighing scientific evidence alongside community values',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Build conversation partnerships that pair students with different strengths',
          'Create cultural exchange projects with schools in target-language countries',
          'Design role-plays that require navigating cultural differences in communication (formal/informal registers, directness, hospitality norms)',
          'Have heritage speakers share their cultural expertise as co-teachers',
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          "Facilitate collaborative creative projects that blend influences from students' different backgrounds",
          'Structure critique sessions that welcome diverse aesthetic standards',
          'Create ensemble work where students must listen and respond to each other across difference',
          'Design projects where students teach peers an art form from their cultural background',
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
        subtitle: 'History, English, Social Studies',
        items: [
          'Design essential questions that probe cultural complexity: "Whose justice?" "Freedom for whom?" "What counts as progress?"',
          'Teach students to ask "Who benefits from this narrative? Whose perspective is centered or marginalized?"',
          'Create space for students to bring current events related to cultural identity into class discussion',
          'When teaching controversial topics, help students understand how cultural and historical positions shape perspectives',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Examine how math has been used as a gatekeeper and how that affects different communities',
          'Pose problems set in diverse contexts and ask students to consider whether context matters',
          'Question the "one right answer" framing and explore how mathematical modeling involves value choices',
          'Investigate how algorithms can encode bias and affect different communities differently',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Explore bioethics case studies that involve different cultural perspectives on the body, medicine, and nature',
          'Examine environmental justice: who bears the burden of pollution, resource extraction, climate change?',
          'Discuss informed consent, research ethics, and the history of exploitation of marginalized communities in research',
          'Ask students to consider: "Who decides what counts as scientific knowledge?" and "Who benefits from this research?"',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Address code-switching and linguistic identity: when and why people shift between languages or registers',
          'Discuss language policy and politics in the target culture',
          'Help students navigate cultural misunderstandings with curiosity rather than judgment',
          'Teach students to ask questions that go beyond surface differences to underlying values and worldviews',
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Examine cultural appropriation vs. appreciation: when does borrowing become theft? What obligations do artists have?',
          'Analyze how art can perpetuate stereotypes—and how it can challenge them',
          "Discuss power dynamics in whose art gets funding, exhibition space, and critical attention",
          'Create opportunities for students to use art as a medium for exploring and expressing cultural identity',
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
          'Incorporate reflective writing where students examine how their own backgrounds shape their interpretations',
          "Teach students to notice when they're making assumptions based on their own cultural lens",
          'Use "cultural autobiography" assignments that help students examine their own identities',
          'Model intellectual humility when you discover your own blind spots in interpreting texts or history',
        ],
      },
      {
        id: 'math',
        name: 'Math',
        items: [
          'Examine and question assumptions about who is "good at math" and where those assumptions come from',
          'Reflect on how you form expectations of students and whether cultural biases influence those expectations',
          'Create space for students to reflect on their own math identity and experiences',
          'Challenge fixed mindset language that may correlate with cultural stereotypes',
        ],
      },
      {
        id: 'science',
        name: 'Science',
        items: [
          'Critically examine case studies where scientific "objectivity" was compromised by cultural bias (e.g., historical medical racism)',
          'Have students research how their own communities have been impacted by scientific research—positively or negatively',
          'Reflect on representation in science and what messages students receive about who belongs',
          'Create science autobiography assignments where students trace their relationship to science',
        ],
      },
      {
        id: 'languages',
        name: 'Languages',
        items: [
          'Encourage students to reflect on their own cultural communication styles and how they differ from target-culture norms',
          'Examine language hierarchies: why some accents or dialects are valued over others',
          "Create assignments where students explore their family's language history",
          'Model for students when you learn something new about the target culture that surprises you',
        ],
      },
      {
        id: 'arts',
        name: 'The Arts',
        items: [
          'Build in regular self-reflection on artistic choices and their cultural influences',
          'Examine how standards of "good art" or "good technique" are culturally constructed',
          'Have students create artist statements that address their cultural identities and influences',
          'Create critique protocols that ask "What cultural perspective might I be missing in my response to this work?"',
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
          <CulturalCompetencyTable competencies={COMPETENCIES} />
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
