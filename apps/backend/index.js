const cors = require('cors');
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'BC Market backend running' });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Unexpected server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
