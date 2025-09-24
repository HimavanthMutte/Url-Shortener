import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ShortenerForm } from './components/ShortenerForm';
import { ResultCard } from './components/ResultCard';
import { Footer } from './components/Footer';
import { HistoryList } from './components/HistoryList';

export default function App() {
  const [longUrl, setLongUrl] = useState('');
  const [latestResult, setLatestResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('url_short_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('url_short_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  async function handleShorten() {
    setError('');
    setLoading(true);
    setLatestResult(null);
    try {
      const resp = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl })
      });
      if (!resp.ok) throw new Error('shorten_failed');
      const data = await resp.json();
      const entry = { id: data.code, original: data.original, shortened: data.shortened, createdAt: data.createdAt };
      setLatestResult(entry);
      setHistory((prev) => [entry, ...prev].slice(0, 50));
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(code) {
    try {
      await fetch(`/api/urls/${code}`, { method: 'DELETE' });
    } catch {}
    setHistory((prev) => prev.filter((x) => x.id !== code));
    if (latestResult && latestResult.id === code) setLatestResult(null);
  }

  return (
    <main className="container">
      <Header />
      <section className="content">
        <ShortenerForm
          value={longUrl}
          onChange={setLongUrl}
          onSubmit={handleShorten}
          loading={loading}
          error={error}
        />
        {latestResult && <ResultCard original={latestResult.original} shortened={latestResult.shortened} />}
        {history.length > 0 && <HistoryList items={history} onDelete={handleDelete} />}
      </section>
      <Footer />
    </main>
  );
}


