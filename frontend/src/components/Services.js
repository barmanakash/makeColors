const SERVICES = [
  {
    code: 'FS',
    accent: 'amber',
    title: 'Full-Stack Web Development',
    description:
      'Responsive, production-ready applications built with React, Next.js, Node.js and TypeScript — from Figma file to deployed interface, with no gap between design and build.',
    stack: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit'],
  },
  {
    code: 'AG',
    accent: 'teal',
    title: 'AI Agent Development',
    description:
      'Autonomous agents built on LangChain and the OpenAI / Anthropic APIs that carry out multi-step tasks — not just chat back a response.',
    stack: ['LangChain', 'OpenAI API', 'Anthropic API'],
  },
  {
    code: 'RG',
    accent: 'teal',
    title: 'RAG Pipelines',
    description:
      'Retrieval-augmented pipelines that ground an LLM in your own documents and data, so answers stay accurate instead of generic.',
    stack: ['Embeddings', 'Vector search'],
  },
  {
    code: 'CB',
    accent: 'teal',
    title: 'Custom Chatbots',
    description:
      'Conversational interfaces for support, onboarding or internal tools, built into your existing product rather than dropped in as a widget.',
    stack: ['React', 'Socket.io', 'LLM APIs'],
  },
  {
    code: 'BE',
    accent: 'amber',
    title: 'Backend & API Engineering',
    description:
      'Express APIs, database design, and CI/CD pipelines that keep the system reliable as usage — and the AI layer on top of it — grows.',
    stack: ['Node.js', 'Express', 'MongoDB'],
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>What I build</h2>
          <p>
            Everything below can stand alone, but they're built to connect —
            most projects start on the frontend and end with an AI layer
            reading and acting on real product data.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div
              className={`service-card service-card--${service.accent}`}
              key={service.code}
            >
              <span className="service-card-watermark">{service.code}</span>

              <span className="service-badge">{service.code}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="service-stack">
                {service.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
