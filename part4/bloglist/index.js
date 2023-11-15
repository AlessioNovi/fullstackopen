const mongoose = require('mongoose');
const app = require('./app');
const { PORT, MONGODB_URI } = require('./utils/config');
const { info } = require('./utils/logger');

// mongoose.set('bufferTimeoutMS', 30000);

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB');
    app.listen(PORT, () => {
      info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => info(error));
