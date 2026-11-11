import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroStudio from './HeroStudio';
import { spotlight } from '../hooks/useReveal';

const WORDS = ['thinks', 'learns', 'scales', 'converts'];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((value) => (value + 1) % WORDS.length),
      2400
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top" onMouseMove={spotlight}>
      <div className="hero-glow" aria-hidden="true" />
      <span className="hero-orb hero-orb--one" aria-hidden="true" />
      <span className="hero-orb hero-orb--two" aria-hidden="true" />
      <span className="hero-orb hero-orb--three" aria-hidden="true" />

      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow hero-pill reveal">
            <i className="pulse-dot" /> Digital agency · Full-stack + AI integration
          </span>

          <h1 className="reveal" style={{ '--d': '80ms' }}>
            Software that{' '}
            <span className="word-rotator">
              <span key={WORDS[index]} className="word-rotator-word">
                {WORDS[index]}
              </span>
            </span>{' '}
            along with your users.
          </h1>

          <p className="lede reveal" style={{ '--d': '160ms' }}>
            We design and build full-stack web applications, then wire AI
            agents, chatbots, and RAG pipelines directly into the product — so
            the intelligence is part of the system, not a feature bolted on
            afterward.
          </p>

          <div className="hero-actions reveal" style={{ '--d': '240ms' }}>
            <Link to="/contact" className="btn btn-primary btn-shine">
              Start a project <span className="btn-arrow">→</span>
            </Link>
            <Link to="/services" className="btn btn-secondary">
              See what we build
            </Link>
          </div>

          <div className="hero-meta reveal" style={{ '--d': '320ms' }}>
            <div>
              <strong>5+ yrs</strong>
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

        <div className="reveal reveal--right" style={{ '--d': '200ms' }}>
          <HeroStudio />
        </div>
      </div>

      <a href="#marquee" className="scroll-cue" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}

export default Hero;
