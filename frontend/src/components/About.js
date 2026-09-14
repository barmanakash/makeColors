function About() {
  return (
    <section id="about">
      <div className="container about">
        <div className="about-copy">
          <span className="eyebrow">About</span>
          <h2>Production experience, channelled into full-stack and AI engineering.</h2>
          <p>
            This practice is built on hands-on experience shipping
            production interfaces at SVAM International and DXC Technology,
            and operational work with IGT Solutions. That foundation now
            extends into backend engineering and applied AI — designing
            systems where a reliable full-stack architecture and an AI
            layer are planned together from day one, not stitched on
            afterward.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat stat--primary">
            <strong>2+ Years</strong>
            <span>Production experience</span>
          </div>
          <div className="stat stat--primary">
            <strong>3 Teams</strong>
            <span>SVAM · DXC · IGT Solutions</span>
          </div>
          <div className="stat stat--primary">
            <strong>B.Tech IT</strong>
            <span>SRIT, Jabalpur</span>
          </div>
          <div className="stat stat--teal">
            <strong>Active Focus</strong>
            <span>AI agents, RAG, LLM integration</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
