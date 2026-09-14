function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <h3>
            makeColo<span className="brand-r">r</span>s
          </h3>
          <p>
            Full-stack developer building web applications with AI agents,
            chatbots and RAG pipelines built in from the start.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
          <a href="#about">Background</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:1998akashbarman@gmail.com">1998akashbarman@gmail.com</a>
          <p>+91 62610 81914</p>
          <p>Jabalpur, Madhya Pradesh, India</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} Akash Barman. All rights reserved.</span>
        <span>Built with React.</span>
      </div>
    </footer>
  );
}

export default Footer;
