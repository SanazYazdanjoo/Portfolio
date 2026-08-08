import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const dataPath = path.join(__dirname, '../src/data/data.json');
app.use(cors());
app.use(express.json());

const readData = () => {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(rawData);
};

// GET routes (loading data)

app.get('/api/profile', (req, res) => {
  res.json(readData().profile || {});
});

app.get('/api/voluntary', (req, res) => {
  res.json(readData().voluntary || []);
});

// PUT routes (saving data)

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

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});