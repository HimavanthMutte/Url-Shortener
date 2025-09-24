require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { customAlphabet } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/url_shortener';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(express.json());
app.use(morgan('dev'));

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);

const urlSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  original: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/shorten', async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'url is required' });
    }

    const code = nanoid();
    const doc = await Url.create({ code, original: url });
    res.status(201).json({ id: doc._id, code: doc.code, original: doc.original, shortened: `${BASE_URL}/${doc.code}`, createdAt: doc.createdAt });
  } catch (err) {
    res.status(500).json({ error: 'failed_to_shorten' });
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const items = await Url.find({}).sort({ createdAt: -1 }).limit(200).lean();
    res.json(items.map(d => ({ id: d._id, code: d.code, original: d.original, shortened: `${BASE_URL}/${d.code}`, createdAt: d.createdAt })));
  } catch (err) {
    res.status(500).json({ error: 'failed_to_list' });
  }
});

app.delete('/api/urls/:code', async (req, res) => {
  try {
    const { code } = req.params;
    await Url.deleteOne({ code });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'failed_to_delete' });
  }
});

app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const doc = await Url.findOne({ code });
    if (!doc) return res.status(404).send('Not found');
    res.redirect(doc.original.startsWith('http') ? doc.original : `https://${doc.original}`);
  } catch (err) {
    res.status(500).send('error');
  }
});

async function start() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error('Failed to start server', e);
  process.exit(1);
});



