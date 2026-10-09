import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Hand,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Target,
  Users,
  Volume2,
  VolumeX,
  Wrench,
  X
} from 'lucide-react';
import { useLessonAudio } from '../../shared/useLessonAudio';
import './styles.css';

import hookArt from './assets/illustrations/hook-puzzle-collaboration.png';
import hookModalArt from './assets/illustrations/modal-puzzle-stakeholders.png';
import agileArt from './assets/illustrations/agile-hybrid-rhythm.png';
import examArt from './assets/illustrations/exam-puzzle-complete.png';
import examModalArt from './assets/illustrations/modal-exam.png';

// 4 Reasons with custom illustrations
import reason1Art from './assets/illustrations/reason-shared-expertise.png';
import reason2Art from './assets/illustrations/reason-stronger-buyin.png';
import reason3Art from './assets/illustrations/reason-holistic-solutions.png';
import reason4Art from './assets/illustrations/reason-trust-transparency.png';

// 6 Behaviors with custom illustrations
import behavior1Art from './assets/illustrations/behavior-early-reporting.png';
import behavior2Art from './assets/illustrations/behavior-document-issues.png';
import behavior3Art from './assets/illustrations/behavior-open-conversations.png';
import behavior4Art from './assets/illustrations/behavior-design-workarounds.png';
import behavior5Art from './assets/illustrations/behavior-evaluate-group.png';
import behavior6Art from './assets/illustrations/behavior-escalate-collaborative.png';

const tabs = [
  'The puzzle metaphor',
  'Why collaboration matters',
  'Six practical behaviors',
  'Agile & hybrid rhythm',
  'Exam lens'
];

const reasons = [
  {
    title: 'Shared Expertise',
    tag: 'Cross-Functional Insights',
    text: 'Every stakeholder sees the issue from a different vantage point. Developers understand technical constraints, vendors understand dependencies, users understand impact, and sponsors understand business priorities.',
    icon: Users,
    image: reason1Art
  },
  {
    title: 'Stronger Buy-In',
    tag: 'Stakeholder Ownership',
    text: 'When stakeholders help shape the solution, they’re naturally more committed to implementing it.',
    icon: CheckCircle2,
    image: reason2Art
  },
  {
    title: 'Holistic, Low-Risk Solutions',
    tag: 'Big-Picture Alignment',
    text: 'Collaborative thinking prevents "fixing one thing while breaking another."',
    icon: ShieldCheck,
    image: reason3Art
  },
  {
    title: 'Trust and Transparency',
    tag: 'Open Relationships',
    text: 'Open dialogue strengthens relationships and keeps everyone aligned even during uncertainty.',
    icon: HeartHandshake,
    image: reason4Art
  }
];

const behaviors = [
  {
    title: '1. Encourage Early Reporting',
    tag: 'Psychological Safety',
    text: 'Create a space where team members can raise emerging issues without fear. Early visibility prevents escalation.',
    icon: Hand,
    image: behavior1Art
  },
  {
    title: '2. Document Issues Clearly',
    tag: 'Issue Log Precision',
    text: 'Use the Issue Log to maintain transparency around ownership, status, and impact.',
    icon: FileText,
    image: behavior2Art
  },
  {
    title: '3. Facilitate Open Conversations',
    tag: 'Cross-Team Alignment',
    text: 'Bring stakeholders together to discuss possible solutions, trade-offs, and constraints.',
    icon: MessageCircle,
    image: behavior3Art
  },
  {
    title: '4. Design Workarounds Together',
    tag: 'Collaborative Workarounds',
    text: 'Interim solutions often require input from multiple parties.',
    icon: Wrench,
    image: behavior4Art
  },
  {
    title: '5. Evaluate Options as a Group',
    tag: 'Group Evaluation',
    text: 'Testing or validating a solution is stronger when all voices are heard.',
    icon: CheckCircle2,
    image: behavior5Art
  },
  {
    title: '6. Escalate When Needed',
    tag: 'Boundary Alignment',
    text: 'Some decisions require authority beyond the team’s level. Collaborative escalation ensures alignment and speed.',
    icon: ArrowUpRight,
    image: behavior6Art
  }
];

const reveals = {
  hook: {
    image: hookModalArt,
    title: 'Effective project managers bring the right stakeholders together to co-create solutions.',
    text: 'Effective project managers bring the right stakeholders together — technical experts, managers, sponsors, users, vendors, and team members — to co-create solutions. Collaboration ensures solutions are realistic, supported, and aligned with the project’s goals. Quick action matters when an issue appears, but so does involving the right people.'
  },
  agile: {
    image: agileArt,
    title: 'Daily rhythm and hybrid habits: borrow what works regardless of methodology.',
    text: 'Daily stand-ups highlight blockers that require immediate attention. Impediments boards provide a visual, evolving list of issues the team is actively resolving. Retrospectives help identify recurring patterns and improve how issues are handled. These small but consistent practices create an environment where issues are discovered, shared, and resolved together — without surprises. Even when projects aren’t fully agile, managers can adopt agile-like habits: visible issue boards, short and frequent check-ins, and collaborative problem-solving workshops.'
  },
  exam: {
    image: examModalArt,
    title: 'Issue resolution works best as a collaborative act, not a solo one.',
    text: 'Issue resolution works best as a collaborative act, not a solo one. Collaboration brings shared expertise, stronger buy-in, holistic and lower-risk solutions, and trust and transparency. Practically, that means encouraging early reporting, documenting issues clearly in the Issue Log, facilitating open conversations, designing workarounds together, evaluating options as a group, and escalating collaboratively when needed. In agile environments, this becomes a daily rhythm — stand-ups, impediments boards, retrospectives — and even outside agile, those same habits can be borrowed as a hybrid approach.',
    bullets: [
      'Four reasons collaboration works: shared expertise, stronger buy-in, holistic/low-risk solutions, trust and transparency',
      'Six practical behaviors: encourage early reporting, document clearly, facilitate open conversations, design workarounds together, evaluate as a group, escalate collaboratively',
      'Agile rhythm: daily stand-ups, impediments boards, retrospectives',
      'Hybrid approach: visible issue boards, frequent check-ins, and collaborative workshops work regardless of methodology'
    ]
  }
};

const quizzes = {
  behaviors: {
    question:
      'Scenario: A team member notices an emerging issue early but hesitates to raise it, worried about how it will be perceived. By the time it’s finally reported, the issue has grown significantly harder to resolve. Which collaborative practice does this scenario most directly illustrate the absence of?',
    answers: [
      "Document issues clearly, since the Issue Log wasn’t used",
      "Encourage early reporting by making it safe to raise issues without fear",
      "Escalate when needed, since the issue eventually required more authority to resolve",
      "Evaluate options as a group, since no group discussion occurred before the issue grew",
    ],
    correct: 1,
    good: 'Correct! This is specifically a failure to create an environment where early reporting feels safe — the issue growing harder to resolve is exactly the cost of that hesitation, not a documentation, escalation, or group-evaluation gap.',
    bad: 'Reconsider — the Issue Log, group evaluation, and escalation all come after an issue is actually reported; this scenario is about what happens before that point, when the team member hesitated to raise it at all.'
  },
  agile: {
    question:
      'Scenario: A project team is running a traditional, predictive project but wants to improve how quickly issues surface and get resolved. Without adopting a full agile framework, what is the most appropriate way to apply the practices described in this lesson?',
    answers: [
      "The team cannot benefit from any of these practices unless the entire project shifts to an agile methodology",
      "Replace the Issue Log entirely with a daily stand-up format",
      "Use agile-like visibility, check-ins, and workshops without changing the overall methodology",
      "Escalate every issue immediately regardless of severity, since agile teams escalate everything",
    ],
    correct: 2,
    good: 'Correct! This is exactly what a hybrid approach looks like — borrowing agile-like habits such as visible boards, frequent check-ins, and collaborative workshops without requiring a full methodology shift.',
    bad: 'Reconsider — these habits don’t require a full agile transformation to adopt; the Issue Log and stand-ups serve different purposes rather than replacing each other; and agile teams don’t escalate everything indiscriminately — escalation is still reserved for decisions beyond the team’s level.'
  }
};

function Modal({ data, onClose, onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <X />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={data.image} alt="" />
            <h3>{data.title}</h3>
            <div className="modal-copy">
              <p>{data.text}</p>
            </div>
          </>
        ) : (
          <div className="memory-step">
            <p className="eyebrow">EXAM-RELEVANT ENABLERS TO REMEMBER</p>
            <h3>Collaborative problem solving and hybrid rhythms.</h3>
            <ul>
              {data.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {data.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight />
          </button>
        ) : (
          <button className="modal-action" onClick={onDone}>
            Mark as read <Check />
          </button>
        )}
      </motion.section>
    </div>,
    document.body
  );
}

function Quiz({ data, onFinish }) {
  const [picked, setPicked] = useState(null);

  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((answer, i) => (
            <button
              key={answer}
              className={picked === i ? (i === data.correct ? 'correct' : 'wrong') : ''}
              onClick={() => setPicked(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {answer}
            </button>
          ))}
        </div>
        {picked !== null && (
          <>
            <p className={`feedback ${picked === data.correct ? 'good' : 'bad'}`}>
              {picked === data.correct ? data.good : data.bad}
            </p>
            <button className="finish-check" onClick={onFinish}>
              Finish check <ArrowRight />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function ReasonsGridPage({
  eyebrow,
  title,
  lead,
  items,
  read,
  setRead,
  after
}) {
  const [activeReason, setActiveReason] = useState(null);

  const openReason = (i) => {
    setActiveReason(i);
    setRead((prev) => prev.map((v, j) => (j === i ? true : v)));
  };

  return (
    <div className="wide-page">
      <div className="header-clean">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>

      <div className="card-grid two">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isRead = read[i];
          return (
            <button
              key={item.title}
              className={`click-card ${isRead ? 'read' : ''}`}
              onClick={() => openReason(i)}
            >
              <span className="card-icon">
                <Icon size={28} />
              </span>
              <strong>{item.title}</strong>
              {isRead ? (
                <Check className="card-arrow check" size={20} />
              ) : (
                <ArrowRight className="card-arrow" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {activeReason !== null && (
        <div className="modal-backdrop" onClick={() => setActiveReason(null)}>
          <section
            className="focus-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-x"
              onClick={() => setActiveReason(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <img
              className="modal-illustration"
              src={items[activeReason].image}
              alt={items[activeReason].title}
            />
            <h3>{items[activeReason].title}</h3>
            <div className="modal-copy">
              <p style={{ fontSize: '16px', lineHeight: 1.68 }}>{items[activeReason].text}</p>
            </div>
            <button
              className="modal-action"
              onClick={() => setActiveReason(null)}
            >
              Mark as read <Check />
            </button>
          </section>
        </div>
      )}

      {read.every(Boolean) && after}
    </div>
  );
}

function BehaviorsGridPage({
  eyebrow,
  title,
  lead,
  items,
  read,
  setRead,
  after
}) {
  const [activeBehavior, setActiveBehavior] = useState(null);

  const openBehavior = (i) => {
    setActiveBehavior(i);
    setRead((prev) => prev.map((v, j) => (j === i ? true : v)));
  };

  return (
    <div className="wide-page">
      <div className="header-clean">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
      </div>

      <div className="card-grid three">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isRead = read[i];
          return (
            <button
              key={item.title}
              className={`click-card ${isRead ? 'read' : ''}`}
              onClick={() => openBehavior(i)}
            >
              <span className="card-icon">
                <Icon size={28} />
              </span>
              <strong>{item.title}</strong>
              {isRead ? (
                <Check className="card-arrow check" size={20} />
              ) : (
                <ArrowRight className="card-arrow" size={20} />
              )}
            </button>
          );
        })}
      </div>

      {activeBehavior !== null && (
        <div className="modal-backdrop" onClick={() => setActiveBehavior(null)}>
          <section
            className="focus-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-x"
              onClick={() => setActiveBehavior(null)}
              aria-label="Close"
            >
              <X />
            </button>
            <img
              className="modal-illustration"
              src={items[activeBehavior].image}
              alt={items[activeBehavior].title}
            />
            <h3>{items[activeBehavior].title}</h3>
            <div className="modal-copy">
              <p style={{ fontSize: '16px', lineHeight: 1.68 }}>{items[activeBehavior].text}</p>
            </div>
            <button
              className="modal-action"
              onClick={() => setActiveBehavior(null)}
            >
              Mark as read <Check />
            </button>
          </section>
        </div>
      )}

      {read.every(Boolean) && after}
    </div>
  );
}

function App() {
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(Array(5).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);

  const [reasonsRead, setReasonsRead] = useState(Array(4).fill(false));
  const [behaviorsRead, setBehaviorsRead] = useState(Array(6).fill(false));

  useLessonAudio(sound);

  const mark = (i) =>
    setDone((values) => values.map((value, index) => (index === i ? true : value)));

  const go = (i) => {
    if (i >= 0 && i < 5 && (i <= page + 1 || done[i - 1])) {
      setPage(i);
    }
  };

  const finishModal = () => {
    const currentModal = modal;
    setModal(null);
    if (currentModal === 'agile') {
      setQuiz('agile');
    } else {
      mark(page);
    }
  };

  const finishQuiz = () => {
    mark(page);
    setQuiz(null);
  };

  let content;

  if (page === 0) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">
            LESSON 6.3.4 · COLLABORATE WITH RELEVANT STAKEHOLDERS ON AN APPROACH TO RESOLVE THE ISSUES
          </p>
          <h1>
            Solving issues is a <span>team sport.</span>
          </h1>
          <p className="lead">
            When a critical issue strikes a project, the instinct might be to retreat, diagnose,
            and fix it alone — like a hero mechanic working in the garage late at night. But
            projects aren’t single-car garages; they are complex ecosystems.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => setModal('hook')}
          >
            {done[0] ? 'Collaboration principle reviewed' : 'Reveal the collaborative principle'}{' '}
            <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={hookArt} alt="" />
      </div>
    );
  }

  if (page === 1) {
    content = (
      <ReasonsGridPage
        eyebrow="WHY COLLABORATION MATTERS"
        title="Issues become easier to solve when you involve the right people."
        lead="Issues become easier to solve — and often faster to fix — when you involve the right people at the right time. Click each to explore."
        items={reasons}
        read={reasonsRead}
        setRead={setReasonsRead}
        after={
          <button
            className="primary-cta centered"
            disabled={done[1]}
            onClick={() => !done[1] && mark(1)}
          >
            {done[1] ? (
              <><Check /> Benefits review completed</>
            ) : (
              <>Mark benefits review complete <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 2) {
    content = (
      <BehaviorsGridPage
        eyebrow="WHAT COLLABORATIVE RESOLUTION LOOKS LIKE"
        title="Six practices that bring clarity and momentum."
        lead="To collaborate effectively during issue resolution, project managers should encourage practices that bring clarity and momentum. Click each to explore."
        items={behaviors}
        read={behaviorsRead}
        setRead={setBehaviorsRead}
        after={
          <button
            className="knowledge-cta centered"
            disabled={done[2]}
            onClick={() => !done[2] && setQuiz('behaviors')}
          >
            {done[2] ? (
              <><Check /> Knowledge check completed</>
            ) : (
              <><Target /> Start knowledge check <ArrowRight /></>
            )}
          </button>
        }
      />
    );
  }

  if (page === 3) {
    content = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">AGILE AND HYBRID COLLABORATION PRACTICES</p>
          <h2>Rhythm built into daily work.</h2>
          <p className="lead">
            In agile environments, collaboration becomes a rhythm built into daily work — and even
            outside agile, that rhythm can still be borrowed.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => setModal('agile')}
          >
            {done[3] ? 'Agile practices reviewed' : 'Reveal agile & hybrid practices'} <ArrowRight />
          </button>
        </div>
        <img className="lesson-art" src={agileArt} alt="" />
      </div>
    );
  }

  if (page === 4) {
    content = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={examArt} alt="" />
        </div>
        <div>
          <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
          <h2>Back to that puzzle one more time —</h2>
          <p className="lead">
            because the full picture was never going to appear with only one piece in the box.
          </p>
          <button
            className="primary-cta"
            disabled={done[4]}
            onClick={() => setModal('exam')}
          >
            {done[4] ? 'Exam lens reviewed' : 'Reveal the exam lens'} <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${i < 5 ? 'done' : i === 5 ? 'active' : ''}`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound((v) => !v)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {page + 1} OF 5</p>
              <div>
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    className={`${done[i] ? 'done' : ''} ${page === i ? 'active' : ''}`}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{content}</div>
            {done[page] && (
              <p className="completion">
                <Check /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!page}
                onClick={() => go(page - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${done[page] ? 'unlocked' : ''}`}
                disabled={!done[page]}
                onClick={() => page < 4 && go(page + 1)}
              >
                {page === 4 ? 'Continue to next lesson' : 'Continue'} <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal data={reveals[modal]} onClose={() => setModal(null)} onDone={finishModal} />
      )}
      {quiz && <Quiz data={quizzes[quiz]} onFinish={finishQuiz} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
