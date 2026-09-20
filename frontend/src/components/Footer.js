import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-col">
          <h4>Products</h4>
          <Link>AI Agent Development</Link>
          <Link>AI & Business Automation</Link>
          <Link>RAG Pipeline</Link>
          <Link>Custom Chatbot</Link>
          <Link>Full-Stack Web Development</Link>
          <Link>Frontend & UI</Link>
          <Link>Backend & API Integration</Link>
          <Link>Website Management & Maintenance</Link>
          <Link>API & Third-Party Integrations</Link>
          <Link>Deployment & Cloud Solutions</Link>
          <Link>Website Performance Optimization</Link>
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
