const mongoose = require('mongoose');
// const instrument = require('node-statsd-instrument');
// const statsd_client = new instrument.StatsD('127.0.0.1', 8125);
// const statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

const restaurantSchema = mongoose.Schema({
  _id: Number,
  name: String,
  tagline: String,
  type: String,
  vicinity: String,
  priceLevel: Number,
  zagatFood: Number,
  zagatDecor: Number,
  zagatService: Number,
  longDescription: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
// const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

// const findOneById = (id, callback) => {
//   RestaurantModel.find({ _id : id }, callback);
// };

// const insertMany = (restaurant, callback) => {
//   RestaurantModel.insertMany(restaurant, callback);
// };

// const count = () => RestaurantModel.count();

// statsd_instrument.measure(this, 'findOneById', 'mongodb_findOneById_measure');

// exports.findOneById = findOneById;
// exports.insertMany = insertMany;
// exports.count = count;
