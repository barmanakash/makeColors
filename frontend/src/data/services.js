// Single source of truth for the services list.
// The Services page renders the cards from this, and the footer builds its
// links from it (each `slug` is the anchor id of the matching card), so the
// two can never drift out of sync.
export const SERVICES = [
  {
    slug: 'full-stack-web-development',
    code: 'FS',
    accent: 'amber',
    title: 'Full-Stack Web Development',
    description:
      'Responsive, production-ready applications built with React, Next.js, Node.js and TypeScript — from Figma file to deployed interface, with no gap between design and build.',
    stack: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit'],
  },
  {
    slug: 'ai-agent-development',
    code: 'AG',
    accent: 'teal',
    title: 'AI Agent Development',
    description:
      'Autonomous agents built on LangChain and the OpenAI / Anthropic APIs that carry out multi-step tasks — not just chat back a response.',
    stack: ['LangChain', 'OpenAI API', 'Anthropic API'],
  },
  {
    slug: 'rag-pipelines',
    code: 'RG',
    accent: 'teal',
    title: 'RAG Pipelines',
    description:
      'Retrieval-augmented pipelines that ground an LLM in your own documents and data, so answers stay accurate instead of generic.',
    stack: ['Embeddings', 'Vector search'],
  },
  {
    slug: 'custom-chatbots',
    code: 'CB',
    accent: 'teal',
    title: 'Custom Chatbots',
    description:
      'Conversational interfaces for support, onboarding or internal tools, built into your existing product rather than dropped in as a widget.',
    stack: ['React', 'Socket.io', 'LLM APIs'],
  },
  {
    slug: 'frontend-ui',
    code: 'FE',
    accent: 'amber',
    title: 'Frontend UI',
    description:
      'We build the UI layer with React.js and MUI, making it responsive and friendly on both web and mobile.',
    stack: ['Reactjs', 'HTML & CSS', 'MUI'],
  },
  {
    slug: 'backend-api-integration',
    code: 'BE',
    accent: 'amber',
    title: 'Backend & API Integration',
    description:
      'Express APIs, database design, and CI/CD pipelines that keep the system reliable as usage — and the AI layer on top of it — grows.',
    stack: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    slug: 'website-management-maintenance',
    code: 'WM',
    accent: 'emerald',
    title: 'Website Management & Maintenance',
    description:
      'Reliable ongoing management for your website, including updates, performance optimization, security, bug fixes, and technical support to keep everything running smoothly.',
    stack: ['Maintenance', 'Optimization', 'Technical Support'],
  },
  {
    slug: 'api-third-party-integrations',
    code: 'API',
    accent: 'amber',
    title: 'API & Third-Party Integrations',
    description:
      'Connect your website or application with the tools your business already uses, including payment systems, authentication, CRMs, communication platforms, and external APIs.',
    stack: ['REST APIs', 'Webhooks', 'Third-Party APIs'],
  },
  {
    slug: 'deployment-cloud-solutions',
    code: 'CD',
    accent: 'teal',
    title: 'Deployment & Cloud Solutions',
    description:
      'Production deployment and infrastructure setup for web applications, APIs, databases, and AI services with reliable environments and automated delivery workflows.',
    stack: ['CI/CD', 'Cloud Deployment', 'GitHub'],
  },
  {
    slug: 'ai-business-automation',
    code: 'BA',
    accent: 'teal',
    title: 'AI & Business Automation',
    description:
      'Automate repetitive business workflows using AI, APIs, and intelligent systems to reduce manual work and help teams operate more efficiently.',
    stack: ['AI Automation', 'APIs', 'Workflows'],
  },
  {
    slug: 'website-performance-optimization',
    code: 'PO',
    accent: 'amber',
    title: 'Website Performance Optimization',
    description:
      'Improve website speed, responsiveness, and overall user experience by identifying performance bottlenecks and optimizing the application for faster delivery.',
    stack: ['Performance Audit', 'Optimization', 'Core Web Vitals'],
  },
];
