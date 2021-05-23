const mongoose = require('mongoose');
const app = require('./middleware/index');

mongoose
  .connect(process.env.db_connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log('connected');
    app.listen(process.env.PORT || 8080);
  })
  .catch((error) => {
    throw new Error('Could not connect to database', error);
  });
