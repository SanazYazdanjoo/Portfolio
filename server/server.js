import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chatHandler from '../api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal .env loader (KEY=VALUE lines) so the chat endpoint finds
// OPENAI_API_KEY in local dev without a dotenv dependency. In production the
// key comes from Vercel's environment settings and this file doesn't exist.
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const app = express();
const PORT = 3001;
const dataPath = path.join(__dirname, '../src/data/data.json');
app.use(cors());
app.use(express.json());

// Same module Vercel runs at /api/chat in production; Vite's dev server
// proxies /api/chat here (see vite.config.js).
app.post('/api/chat', chatHandler);

const readData = () => {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(rawData);
};

app.get('/api/profile', (req, res) => {
  res.json(readData().profile || {});
});

app.get('/api/voluntary', (req, res) => {
  res.json(readData().voluntary || []);
});

app.put('/api/profile', (req, res) => {
  const data = readData();
  data.profile = req.body; 
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: "Profile saved successfully!" });
});

app.put('/api/voluntary', (req, res) => {
  const data = readData();
  data.voluntary = req.body; 
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: "Voluntary data saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});