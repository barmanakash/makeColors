import { Link } from 'react-router-dom';
import './About.css';

const FIGURES = [
  { value: '11 Services', label: 'From frontend to the AI layer', tone: 'primary' },
  { value: '4-Step Process', label: 'Discovery through to support', tone: 'primary' },
  { value: 'React → RAG', label: 'Full-stack through to AI', tone: 'primary' },
  { value: 'Remote-first', label: 'Working with clients anywhere', tone: 'teal' },
];

const PILLARS = [
  {
    code: '01',
    accent: 'amber',
    title: 'Full-stack product development',
    description:
      'Responsive, production-ready web applications built from the interface down to the API and database. Design and build stay connected, so what ships matches what was planned.',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    code: '02',
    accent: 'teal',
    title: 'Applied AI engineering',
    description:
      'Autonomous agents, custom chatbots and retrieval-augmented pipelines that ground an LLM in your own documents and data, integrated so the intelligence is part of the system.',
    stack: ['LangChain', 'OpenAI API', 'Anthropic API', 'RAG', 'Embeddings'],
  },
  {
    code: '03',
    accent: 'emerald',
    title: 'Delivery & long-term reliability',
    description:
      'Production deployment, CI/CD, third-party integrations and performance optimization, followed by ongoing maintenance and technical support once real usage begins.',
    stack: ['CI/CD', 'Cloud Deployment', 'Webhooks', 'Core Web Vitals'],
  },
];

const VALUES = [
  {
    tag: '01',
    tone: 'teal',
    title: 'AI built in, not bolted on',
    description:
      'Agents, chatbots and RAG pipelines are designed into the architecture from the start, so the intelligence is part of the system rather than a feature added afterward.',
  },
  {
    tag: '02',
    tone: 'primary',
    title: 'One team, frontend to AI layer',
    description:
      'Design, frontend, backend, integrations, deployment and AI work are handled together, so there are no gaps between the people building each piece.',
  },
  {
    tag: '03',
    tone: 'primary',
    title: 'Production-ready by default',
    description:
      'Responsive interfaces, CI/CD, cloud deployment and performance optimization are part of the build, not an afterthought before launch.',
  },
  {
    tag: '04',
    tone: 'emerald',
    title: 'Support after launch',
    description:
      'Updates, security, bug fixes and technical support keep your product running smoothly as real usage shapes what comes next.',
  },
];

const TOOLKIT = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'MUI', 'HTML & CSS'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Webhooks', 'Socket.io'],
  },
  {
    group: 'AI layer',
    items: [
      'LangChain',
      'OpenAI API',
      'Anthropic API',
      'Embeddings',
      'Vector search',
    ],
  },
  {
    group: 'Delivery',
    items: [
      'CI/CD',
      'GitHub',
      'Cloud Deployment',
      'Performance Audit',
      'Core Web Vitals',
    ],
  },
];

const PRINCIPLES = [
  {
    title: 'Architecture before code',
    description:
      'We decide the stack, the data flow, and exactly where an AI layer belongs before any code gets written.',
  },
  {
    title: 'Short cycles, visible progress',
    description:
      'Work happens in short iterations with working demos along the way, not a silent few months.',
  },
  {
    title: 'Built to last past launch',
    description:
      'Deployment, CI/CD and monitoring are part of the build, with support afterward as real usage shapes what comes next.',
  },
];

function About() {
  return (
    <>
      {/* Intro */}
      <section className="about-section" id="about">
        <div className="container about-intro-grid">
          <div className="about-intro">
            <span className="eyebrow">About makeColors</span>
            <h2>We build full-stack products with the AI layer designed in from day one.</h2>
            <p>
              makeColors is a full-stack development and AI engineering
              practice. We design and build web applications, then integrate AI
              agents, chatbots and RAG pipelines directly into the product, so
              the frontend, the backend and the intelligence work as one
              connected system.
            </p>
            <p>
              Whether you need a complete product built from scratch or AI
              capabilities added to an existing platform, we plan the
              architecture, the data flow and the AI layer together from the
              start, and stay with the project after it ships.
            </p>

            <div className="about-actions">
              <Link to="/contact" className="btn btn-primary">
                Start a project
              </Link>
              <Link to="/services" className="btn btn-secondary">
                See our services
              </Link>
            </div>
          </div>

          <div className="about-figures">
            {FIGURES.map((item) => (
              <div
                className={`about-figure about-figure--${item.tone}`}
                key={item.value}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="about-section" id="expertise">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Three areas, one connected system</h2>
            <p>
              Every service we offer falls into one of these areas. Each can
              stand alone, but they're designed to work together, so your
              frontend, backend and AI layer share one architecture.
            </p>
          </div>

          <div className="about-pillars">
            {PILLARS.map((pillar) => (
              <div
                className={`about-card about-card--${pillar.accent}`}
                key={pillar.code}
              >
                <span className="about-card-code">{pillar.code}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <div className="about-chips">
                  {pillar.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why makeColors */}
      <section className="about-section" id="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why makeColors</span>
            <h2>What you get when you work with us</h2>
          </div>

          <div className="about-values">
            {VALUES.map((item) => (
              <div
                className={`about-value about-value--${item.tone}`}
                key={item.title}
              >
                <span className="about-value-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="about-section" id="toolkit">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Toolkit</span>
            <h2>The stack we work in</h2>
            <p>
              Tools chosen for reliability and fit, from the interface through
              to the AI layer and the pipeline that ships it.
            </p>
          </div>

          <div className="about-toolkit">
            {TOOLKIT.map((block) => (
              <div className="about-toolkit-group" key={block.group}>
                <h3>{block.group}</h3>
                <div className="about-chips">
                  {block.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="about-section" id="approach">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Approach</span>
            <h2>How we work</h2>
          </div>

          <div className="about-principles">
            {PRINCIPLES.map((item, index) => (
              <div className="step" key={item.title}>
                <span className="step-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <Link to="/how-it-works" className="about-link">
            See the full project process
          </Link>
        </div>
      </section>

      {/* Call to action */}
      <section className="cta-band">
        <div className="container">
          <h2>Let's talk about what you're building.</h2>
          <Link to="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
