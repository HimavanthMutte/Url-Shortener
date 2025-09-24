import React from 'react';

export function HistoryList({ items, onDelete }) {
  return (
    <section className="card" id="history">
      <h2 className="title" style={{ fontSize: 20, marginBottom: 12 }}>Added links</h2>
      <div className="history">
        {items.map((it) => (
          <div key={it.id} className="history-row">
            <div className="history-col">
              <div className="label">Original</div>
              <div className="value">{it.original}</div>
            </div>
            <div className="history-col">
              <div className="label">Short</div>
              <div className="value">{it.shortened}</div>
            </div>
            <div className="history-actions">
              <button className="ghost-btn" type="button" onClick={() => navigator.clipboard?.writeText(it.shortened)}>Copy</button>
              <button className="ghost-btn" type="button" onClick={() => window.open(/^https?:\/\//i.test(it.original) ? it.original : `https://${it.original}`, '_blank', 'noopener')}>Open</button>
              <button className="ghost-btn" type="button" onClick={() => onDelete?.(it.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

