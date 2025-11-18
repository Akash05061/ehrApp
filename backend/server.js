const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory "database"
let patients = [];
let nextId = 1;

// Create patient
app.post('/api/patients', (req, res) => {
  const patient = {
    id: nextId++,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  patients.push(patient);
  console.log('Created patient:', patient);
  res.json(patient);
});

// Get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// Get patient by ID
app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
