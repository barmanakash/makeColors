import { useLocation } from 'react-router-dom';
import { SERVICES } from '../data/services';

function Services() {
  // A link like /services#rag-pipelines (e.g. from the footer) highlights
  // the matching card after ScrollToTop brings it into view.
  const { hash } = useLocation();
  const activeSlug = hash.replace('#', '');

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
              id={service.slug}
              className={`service-card service-card--${service.accent}${
                service.slug === activeSlug ? ' is-targeted' : ''
              }`}
              key={service.slug}
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
