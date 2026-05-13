const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('BC Market backend running');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});