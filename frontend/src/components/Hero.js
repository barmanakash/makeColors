import { Link } from 'react-router-dom';
import HeroGraphic3D from './HeroGraphic3D';

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow">Full-stack development + AI integration</span>
          <h1>Software that thinks along with your users.</h1>
          <p className="lede">
            I design and build full-stack web applications, then wire AI
            agents, chatbots, and RAG pipelines directly into the product —
            so the intelligence is part of the system, not a feature bolted
            on afterward.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <Link to="/services" className="btn btn-secondary">
              See what I build
            </Link>
          </div>

          <div className="hero-meta">
            <div>
              <strong>2+ yrs</strong>
              <span>Professional dev experience</span>
            </div>
            <div>
              <strong>React → RAG</strong>
              <span>Frontend through to AI layer</span>
            </div>
            <div>
              <strong>Jabalpur, IN</strong>
              <span>Working remote-first</span>
            </div>
          </div>
        </div>

        <HeroGraphic3D />
      </div>
    </section>
  );
}

export default Hero;
