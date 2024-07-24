const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const { router: authRoutes } = require('./routes/auth');
const collectionRoutes = require('./routes/collection');
app.use('/api/auth', authRoutes);
app.use('/api', collectionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
