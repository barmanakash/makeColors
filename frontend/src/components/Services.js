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
    code: 'FE',
    accent: 'amber',
    title: 'Frontend UI',
    description:
      'we will develope UI phase through Reactjs and MUI. It makes responshive both web and mobile friendly',
    stack: ['Reactjs', 'HTML & CSS', 'MUI'],
  },
  {
    code: 'BE',
    accent: 'amber',
    title: 'Backend & API Integration',
    description:
      'Express APIs, database design, and CI/CD pipelines that keep the system reliable as usage — and the AI layer on top of it — grows.',
    stack: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    code: 'WM',
    accent: 'emerald',
    title: 'Website Management & Maintenance',
    description:
      'Reliable ongoing management for your website, including updates, performance optimization, security, bug fixes, and technical support to keep everything running smoothly.',
    stack: ['Maintenance', 'Optimization', 'Technical Support'],
  },
  {
    code: 'API',
    accent: 'amber',
    title: 'API & Third-Party Integrations',
    description:
      'Connect your website or application with the tools your business already uses, including payment systems, authentication, CRMs, communication platforms, and external APIs.',
    stack: ['REST APIs', 'Webhooks', 'Third-Party APIs'],
  },
  {
    code: 'CD',
    accent: 'teal',
    title: 'Deployment & Cloud Solutions',
    description:
      'Production deployment and infrastructure setup for web applications, APIs, databases, and AI services with reliable environments and automated delivery workflows.',
    stack: ['CI/CD', 'Cloud Deployment', 'GitHub'],
  },
  {
    code: 'BA',
    accent: 'teal',
    title: 'AI & Business Automation',
    description:
      'Automate repetitive business workflows using AI, APIs, and intelligent systems to reduce manual work and help teams operate more efficiently.',
    stack: ['AI Automation', 'APIs', 'Workflows'],
  },
  {
    code: 'PO',
    accent: 'amber',
    title: 'Website Performance Optimization',
    description:
      'Improve website speed, responsiveness, and overall user experience by identifying performance bottlenecks and optimizing the application for faster delivery.',
    stack: ['Performance Audit', 'Optimization', 'Core Web Vitals'],
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>What we build</h2>
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
