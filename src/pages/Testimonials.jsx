// src/pages/Testimonials.jsx
import React from 'react'

const testimonials = [
  {
    quote:
      'Sanaz brings clarity and warmth to complex problems. Her prototypes communicate intent instantly.',
    name: 'Project Lead',
    title: 'Tech Company',
  },
  {
    quote:
      'She balances aesthetics and usability beautifully. Always thoughtful with user journeys.',
    name: 'Senior Designer',
    title: 'Design Agency',
  },
  {
    quote:
      'Reliable, creative, and empathetic — a strong collaborator from research to delivery.',
    name: 'Supervisor',
    title: 'University Mentor',
  },
]

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gap: '1.25rem' }}>
        {/* Intro */}
        <header style={{ display: 'grid', gap: '.5rem' }}>
          <h1 className="title h1" style={{ marginBottom: '.25rem' }}>
            Testimonials
          </h1>
          <p className="lead">
            A few words from collaborators, mentors, and clients — reflecting professionalism,
            trust, and thoughtful impact.
          </p>
        </header>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="card"
              style={{
                display: 'grid',
                gap: '.75rem',
                padding: '1.25rem',
                borderLeft: '4px solid var(--accent)',
              }}
            >
              <blockquote
                style={{
                  color: 'var(--text)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}
              >
                “{t.quote}”
              </blockquote>
              <figcaption style={{ fontSize: '.9rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)' }}>{t.name}</strong> — {t.title}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Closing note */}
        <div
          className="card"
          style={{
            background: 'var(--muted-surface)',
            border: '1px solid var(--line)',
            textAlign: 'center',
            padding: '1.5rem',
            marginTop: '1rem',
          }}
        >
          <p style={{ color: 'var(--text)' }}>
            Want to share your experience working with me?{' '}
            <a
              href="/contact"
              style={{
                color: 'var(--accent)',
                fontWeight: 500,
                textDecoration: 'underline',
              }}
            >
              Get in touch
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
