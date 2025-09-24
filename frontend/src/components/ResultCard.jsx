import React from 'react';

export function ResultCard({ original, shortened }) {
  function copy(text) {
    navigator.clipboard?.writeText(text);
  }
  function openOriginal(url) {
    if (!url) return;
    const href = /^(https?:)?\/\//i.test(url) ? url : `https://${url}`;
    window.open(href, '_blank', 'noopener');
  }
  return (
    <section className="card">
      <div>
        <div className="label">Original</div>
        <div className="value">{original}</div>
      </div>
      <div className="row-sm" style={{ marginTop: 8 }}>
        <div>
          <div className="label">Short link</div>
          <div className="value">{shortened}</div>
        </div>
        <div style={{ display: 'grid', gridAutoFlow: 'column', gap: 8 }}>
          <button className="ghost-btn" type="button" onClick={() => openOriginal(original)}>Open</button>
          <button className="ghost-btn" type="button" onClick={() => copy(shortened)}>Copy</button>
        </div>
      </div>
    </section>
  );
}


