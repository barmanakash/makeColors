import { useState } from 'react';

const SERVICE_OPTIONS = [
  'AI Agent Development',
  'AI & Business Automation',
  'RAG Pipeline',
  'Custom Chatbot',
  'Full-Stack Web Development',
  'Frontend & UI',
  'Backend & API Integration',
  'Website Management & Maintenance',
  'API & Third-Party Integrations',
  'Deployment & Cloud Solutions',
  'Website Performance Optimization',
  'Something else',
];

const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api/contact';

const initialForm = {
  name: '',
  email: '',
  service: SERVICE_OPTIONS[0],
  message: '',
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.detail?.[0]?.msg || data?.detail || 'Something went wrong. Please try again.'
        );
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err.message ||
        'Could not reach the server. Make sure the backend is running.'
      );
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-intro">
            <span className="eyebrow">Contact</span>
            <h2>Start a project</h2>
            <p>
              Tell us about your project vision—whether you need a complete full-stack product built from scratch,
              or AI capabilities integrated into an existing platform.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="service">What do you need?</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="What are you building, and what would help most right now?"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'success' && (
              <p className="form-status form-status-success" role="status">
                Thanks — I'll get back to you within a day or two.
              </p>
            )}

            {status === 'error' && (
              <p className="form-status form-status-error" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
