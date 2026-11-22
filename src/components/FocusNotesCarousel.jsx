import { useState } from 'react';
import Icon from './Icon.jsx';
import { focusNotes } from '../data/focusNotes.js';

export default function FocusNotesCarousel() {
  const [index, setIndex] = useState(0); // the only carousel state: which slide is visible
  const total = focusNotes.length;
  const slide = focusNotes[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="carousel" aria-roledescription="carousel" aria-label="Focus notes">
      <div className="carousel__body" role="group" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${total}`}>
        <div className="carousel__text" aria-live="polite">
          <p className="carousel__meta">
            <span>Focus notes</span>
            <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </p>
          <h2>{slide.title}</h2>
          <p className="carousel__sub">{slide.subtitle}</p>
        </div>

        <div className="note-card" aria-hidden="true">
          <span className="note-card__check"><Icon name="check" size={14} /></span>
          <div className="note-card__body">
            <span className="note-card__label">{slide.cardLabel}</span>
            <strong>{slide.cardTitle}</strong>
            <div className="note-card__progress">
              <span className="bar"><span style={{ width: `${slide.progress}%` }} /></span>
              <span>{slide.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel__controls">
        <button type="button" className="round-btn round-btn--ghost" onClick={prev} aria-label="Previous slide">
          <Icon name="left" size={16} />
        </button>
        <button type="button" className="round-btn round-btn--solid" onClick={next} aria-label="Next slide">
          <Icon name="right" size={16} />
        </button>
      </div>

      <div className="carousel__dots">
        {focusNotes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            className={`dot ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
