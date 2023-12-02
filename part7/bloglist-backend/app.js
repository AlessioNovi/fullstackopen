const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

const app = express();
const cors = require('cors');
const blogRoutes = require('./routes/blogsroutes');
const userRoutes = require('./routes/userroutes');
const testRoutes = require('./routes/testroutes');
const { info } = require('./utils/logger');

if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRoutes);
}

app.use((req, res) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
});
// eslint-disable-next-line consistent-return
app.use((error, req, res, next) => {
  info(error);
  if (res.headerSent) {
    return next(error);
  }

  if (error.name === 'ValidationError') {
    res.status(400).json({ message: error.message });
  } else if (error.name === 'CastError') {
    res.status(400).json({ message: 'malformatted id' });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ message: error.message });
  } else {
    res.json({ message: error.message });
  }
});

module.exports = app;
