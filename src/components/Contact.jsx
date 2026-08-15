import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="content-section">
      <h2 className="section-title block-reveal">
        <span className="block-reveal-content">Contact</span>
      </h2>
      
      <div className="contact-layout">
        <div className="contact-info">
          <div>
            <h3 className="contact-headline">GET IN TOUCH, I’M READY TO COLLABORATE.</h3>
            <p className="bio-text" style={{ fontSize: '1rem', maxWidth: '350px' }}>
              Have an idea, project, or role you'd like to discuss? Reach out and let's construct it together.
            </p>
          </div>

          <div className="social-links-list">
            <a 
              href="https://github.com/aniketrajput-45" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>

            <a 
              href="https://www.linkedin.com/in/aniket-kumar-singh-ba572b370/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>

            <a 
              href="mailto:rajputaniket7234@gmail.com" 
              className="social-link-item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
          </div>
        </div>

        <div className="glass-panel contact-form-panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                id="form-name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="form-input"
                required
              />
              <label htmlFor="form-name" className="form-label">Name</label>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="email"
                id="form-email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="form-input"
                required
              />
              <label htmlFor="form-email" className="form-label">Email Address</label>
            </div>

            <div className="form-group">
              <textarea 
                name="message"
                id="form-message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows="4"
                className="form-input"
                required
              />
              <label htmlFor="form-message" className="form-label">Message</label>
            </div>

            <button 
              type="submit" 
              className="form-submit-btn" 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  Sending...
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                </>
              ) : status === 'success' ? (
                'Message Sent!'
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'success' && (
              <div className="success-message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Thank you! I will get back to you shortly.
              </div>
            )}
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
