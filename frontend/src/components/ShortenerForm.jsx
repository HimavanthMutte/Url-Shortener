import React from 'react';

export function ShortenerForm({ value, onChange, onSubmit, loading, error }) {
  return (
    <section className="card">
      <div className="ring" />
      <h1 className="title">Shorten your long links</h1>
      <p className="subtitle">Paste any long URL and get a beautiful short link instantly.</p>
      <div className="row">
        <input
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/very/long/link..."
        />
        <button className="button" onClick={onSubmit} disabled={!value || loading}>
          {loading ? 'Shortening…' : 'Shorten URL'}
        </button>
      </div>
      {!!error && <div className="error">{error}</div>}
    </section>
  );
}


