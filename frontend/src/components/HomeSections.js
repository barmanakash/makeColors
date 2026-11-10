import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { spotlight } from '../hooks/useReveal';

/* ---------------------------------------------------------------- */
/* Marquee ticker                                                    */
/* ---------------------------------------------------------------- */
const MARQUEE_ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'LangChain',
  'OpenAI',
  'Anthropic',
  'RAG Pipelines',
  'AI Agents',
  'Chatbots',
  'CI/CD',
  'REST APIs',
];

export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="marquee" id="marquee" aria-label="Technologies we use">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            <i aria-hidden="true">✦</i> {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Animated counters                                                 */
/* ---------------------------------------------------------------- */
function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setValue(to);
      return undefined;
    }

    let frame;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 2, suffix: '+', label: 'Years building production software' },
  { value: SERVICES.length, suffix: '', label: 'Services, frontend to AI layer' },
  { value: 3, suffix: '', label: 'Layers covered: UI, backend & AI' },
  { value: 100, suffix: '%', label: 'Responsive on every screen' },
];

export function Stats() {
  return (
    <section className="home-section stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div
              className="stat reveal"
              style={{ '--d': `${i * 90}ms` }}
              key={stat.label}
              onMouseMove={spotlight}
            >
              <strong>
                <Counter to={stat.value} suffix={stat.suffix} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Services preview                                                  */
/* ---------------------------------------------------------------- */
const FEATURED_SLUGS = [
  'full-stack-web-development',
  'ai-agent-development',
  'rag-pipelines',
  'custom-chatbots',
  'ai-business-automation',
  'deployment-cloud-solutions',
];

export function HomeServices() {
  const featured = FEATURED_SLUGS.map((slug) =>
    SERVICES.find((s) => s.slug === slug)
  ).filter(Boolean);

  return (
    <section className="home-section" id="what-we-do">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">What we do</span>
          <h2>One team for the interface, the backend, and the intelligence.</h2>
          <p>
            Most agencies hand you a website and a separate &ldquo;AI
            project.&rdquo; We build them together, so your product can reason
            over its own data from day one.
          </p>
        </div>

        <div className="home-services">
          {featured.map((service, i) => (
            <Link
              to={`/services#${service.slug}`}
              className={`home-service home-service--${service.accent} reveal`}
              style={{ '--d': `${(i % 3) * 90}ms` }}
              onMouseMove={spotlight}
              key={service.slug}
            >
              <span className="home-service-code">{service.code}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-stack">
                {service.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <span className="home-service-link">
                Learn more <i>→</i>
              </span>
            </Link>
          ))}
        </div>

        <div className="section-more reveal">
          <Link to="/services" className="btn btn-secondary btn-shine">
            View all {SERVICES.length} services <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Showcase: example solutions                                       */
/* ---------------------------------------------------------------- */
const SHOWCASE = [
  {
    tag: 'AI Chatbot',
    title: 'Support assistant inside your product',
    text: 'A chat experience that knows your docs, your plans and your customer, answers instantly, and hands over to a human when it should.',
    visual: 'chat',
  },
  {
    tag: 'RAG Search',
    title: 'Ask-your-documents knowledge base',
    text: 'Upload manuals, policies or tickets and let your team query them in plain language — with answers that cite where they came from.',
    visual: 'search',
  },
  {
    tag: 'Web App',
    title: 'Dashboards and SaaS platforms',
    text: 'Fast, responsive React front-ends on a clean Node/Express API, with analytics, roles and an AI layer that acts on live data.',
    visual: 'dash',
  },
];

function ShowcaseVisual({ kind }) {
  if (kind === 'chat') {
    return (
      <div className="sv sv-chat" aria-hidden="true">
        <span className="bubble bubble--in" />
        <span className="bubble bubble--out" />
        <span className="bubble bubble--in short" />
        <span className="typing">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }
  if (kind === 'search') {
    return (
      <div className="sv sv-search" aria-hidden="true">
        <span className="search-bar" />
        <span className="doc-line" />
        <span className="doc-line w80" />
        <span className="doc-line w60" />
        <span className="doc-chip" />
      </div>
    );
  }
  return (
    <div className="sv sv-dash" aria-hidden="true">
      <span style={{ '--h': '40%' }} />
      <span style={{ '--h': '68%' }} />
      <span style={{ '--h': '52%' }} />
      <span style={{ '--h': '86%' }} />
      <span style={{ '--h': '62%' }} />
      <span style={{ '--h': '94%' }} />
    </div>
  );
}

export function Showcase() {
  return (
    <section className="home-section" id="solutions">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Solutions</span>
          <h2>The kind of things we ship.</h2>
          <p>
            Example builds that show how the pieces fit together — each one is
            tailored to your data, your brand and your users.
          </p>
        </div>

        <div className="showcase">
          {SHOWCASE.map((item, i) => (
            <article
              className="showcase-card reveal"
              style={{ '--d': `${i * 110}ms` }}
              onMouseMove={spotlight}
              key={item.title}
            >
              <div className="showcase-visual">
                <ShowcaseVisual kind={item.visual} />
              </div>
              <span className="showcase-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Why us                                                            */
/* ---------------------------------------------------------------- */
const REASONS = [
  {
    title: 'AI built in, not bolted on',
    text: 'Agents, chatbots and RAG are designed alongside the product architecture, so they read real data and take real actions.',
  },
  {
    title: 'Design to deployment',
    text: 'From Figma file to live, monitored production — one team, no hand-off gaps between design, build and release.',
  },
  {
    title: 'Short cycles, real demos',
    text: 'You see working software every few days, not a silent few months followed by a surprise.',
  },
  {
    title: 'Support after launch',
    text: 'Updates, performance tuning, security and bug fixes continue once real users start shaping what comes next.',
  },
];

export function WhyUs() {
  return (
    <section className="home-section why" id="why-us">
      <div className="container why-grid">
        <div className="why-intro reveal">
          <span className="eyebrow">Why makeColors</span>
          <h2>A small agency that behaves like your in-house team.</h2>
          <p>
            You work directly with the people writing the code. That means
            faster decisions, honest timelines, and software that actually
            matches what you asked for.
          </p>
          <Link to="/about" className="btn btn-secondary btn-shine">
            More about us <span className="btn-arrow">→</span>
          </Link>
        </div>

        <div className="why-list">
          {REASONS.map((reason, i) => (
            <div
              className="why-item reveal"
              style={{ '--d': `${i * 90}ms` }}
              onMouseMove={spotlight}
              key={reason.title}
            >
              <span className="why-num">0{i + 1}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Process timeline                                                  */
/* ---------------------------------------------------------------- */
const STEPS = [
  {
    title: 'Discovery & Scoping',
    description:
      'We walk through your goals, current stack and data, and define what actually needs building.',
  },
  {
    title: 'Architecture & Design',
    description:
      'We plan the stack, the data flow, and exactly where an AI layer fits — before any code gets written.',
  },
  {
    title: 'Build & Iterate',
    description:
      'Development happens in short cycles with working demos along the way.',
  },
  {
    title: 'Ship & Support',
    description:
      'Deployment, CI/CD, and monitoring, plus support after launch as real usage shapes what comes next.',
  },
];

export function HomeProcess() {
  return (
    <section className="home-section" id="process">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Process</span>
          <h2>How a project runs.</h2>
        </div>

        <div className="timeline">
          {STEPS.map((step, i) => (
            <div
              className="timeline-step reveal"
              style={{ '--d': `${i * 140}ms` }}
              key={step.title}
            >
              <span className="timeline-dot">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* FAQ accordion                                                     */
/* ---------------------------------------------------------------- */
const FAQS = [
  {
    q: 'Do I need an existing product to add AI to it?',
    a: 'No. We can build the product and the AI layer together, or add agents, chatbots and RAG to an application you already run.',
  },
  {
    q: 'Which technologies do you work with?',
    a: 'React, Next.js and TypeScript on the front-end; Node.js, Express and MongoDB on the back-end; and LangChain with the OpenAI and Anthropic APIs for the AI layer.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A focused chatbot or landing site can take a few weeks; a full web application with an AI layer is planned in phases after discovery.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes. We handle updates, performance optimization, security, bug fixes and technical support so the product keeps running smoothly.',
  },
  {
    q: 'How do we get started?',
    a: 'Send us a short note about what you want to build. We reply, schedule a discovery call, and scope the work together.',
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="home-section" id="faq">
      <div className="container faq-grid">
        <div className="section-head reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions we hear a lot.</h2>
          <p>Can&rsquo;t find yours? Drop us a message and we&rsquo;ll answer it.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                className={`faq-item reveal${isOpen ? ' is-open' : ''}`}
                style={{ '--d': `${i * 70}ms` }}
                key={item.q}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden="true">+</i>
                </button>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Closing CTA                                                       */
/* ---------------------------------------------------------------- */
export function HomeCta() {
  return (
    <section className="home-section home-cta-section">
      <div className="container">
        <div className="home-cta reveal" onMouseMove={spotlight}>
          <span className="eyebrow">Let&rsquo;s work together</span>
          <h2>
            Have a project that needs a frontend, a backend, and an AI layer
            that works?
          </h2>
          <div className="home-cta-actions">
            <Link to="/contact" className="btn btn-primary btn-shine">
              Start a project <span className="btn-arrow">→</span>
            </Link>
            <a href="mailto:akabarman01@gmail.com" className="btn btn-secondary">
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
