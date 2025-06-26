const express = require('express');
const fs = require('fs');
const app = express();

// ⚠️ Hardcoded secret to trigger secret scanning
const API_KEY = 'AKIAEXAMPLESECRETKEY';

// ⚠️ Dynamic eval - detected by ESLint and Code Scanning
app.get('/eval', (req, res) => {
  const userInput = req.query.code;
  eval(userInput);
  res.send('Code executed');
});

// ⚠️ Unsafe regex - can lead to ReDoS
app.get('/search', (req, res) => {
  const unsafeRegex = new RegExp(req.query.q);
  res.send('Search triggered');
});

// ⚠️ Path traversal
app.get('/read', (req, res) => {
  const file = req.query.file;
  fs.readFile(`/etc/${file}`, (err, data) => {
    if (err) return res.status(500).send('Error');
    res.send(data);
  });
});

app.listen(3000, () => console.log('Running on port 3000'));
