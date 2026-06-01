const cors = require('cors');
const express = require('express');
const path = require('path');
const authRoutes = require('./src/routes/auth.routes');
const healthRoutes = require('./src/routes/health.routes');
const listsRoutes = require('./src/routes/lists.routes');
const productsRoutes = require('./src/routes/products.routes');
const profileRoutes = require('./src/routes/profile.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'BC Market backend running' });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/lists', listsRoutes);
app.use('/api/profile', profileRoutes);

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
