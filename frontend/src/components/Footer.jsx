import React from 'react';

export function Footer() {
  const year = new Date().getFullYear();
  return <footer style={{ padding: '28px 20px 40px', color: 'var(--muted)', textAlign: 'center' }}>© {year} URL Shortener — Crafted with React</footer>;
}


