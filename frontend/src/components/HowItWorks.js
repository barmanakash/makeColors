const STEPS = [
  {
    title: 'Discovery & Scoping',
    description:
      'We walk through your goals, current stack and data, and define what actually needs building.',
  },
  {
    title: 'Architecture & Design',
    description:
      'I plan the stack, the data flow, and exactly where an AI layer fits — before any code gets written.',
  },
  {
    title: 'Build & Iterate',
    description:
      'Development happens in short cycles with working demos along the way, not a silent few months.',
  },
  {
    title: 'Ship & Support',
    description:
      'Deployment, CI/CD, and monitoring, plus support after launch as real usage shapes what comes next.',
  },
];

function HowItWorks() {
  return (
    <section id="process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Process</span>
          <h2>How a project runs</h2>
        </div>

        <div className="steps">
          {STEPS.map((step, index) => (
            <div className="step" key={step.title}>
              <span className="step-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
