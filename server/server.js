require('newrelic');

const mongoose = require('mongoose');

const app = require('./app');

const dbAddress = process.env.DB_ADDRESS || 'localhost';

mongoose.connect(`mongodb://${dbAddress}/sdc-overview`);

app.listen(3002, () => {
  console.log('Listening on port 3002');
});