import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-col">
          <h4>Services</h4>
          {SERVICES.map((service) => (
            <Link key={service.slug} to={`/services#${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <Link to="/services">Services</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-brand">
          <h3>
            makeColo<span className="brand-r">r</span>s
          </h3>
          <p>
            Full-stack developer building web applications with AI agents,
            chatbots and RAG pipelines built in from the start.
          </p>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:1998akashbarman@gmail.com">1998akashbarman@gmail.com</a>
            <p>+91 62610 81914</p>
            <p>Jabalpur, Madhya Pradesh, India</p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} makeColors. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
