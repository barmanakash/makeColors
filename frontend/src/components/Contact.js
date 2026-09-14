import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Full-Stack Web Development',
  'AI Agent Development',
  'RAG Pipeline',
  'Custom Chatbot',
  'Frontend & UI',
  'Backend & API Engineering',
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
              Tell me a bit about what you're building — a product that
              needs a frontend and backend, or an AI layer wired into
              something that already exists. I read every message myself.
            </p>

            <div className="contact-direct">
              <a href="mailto:1998akashbarman@gmail.com">
                1998akashbarman@gmail.com
              </a>
              <span>+91 62610 81914</span>
              <span>Jabalpur, Madhya Pradesh, India</span>
            </div>
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
