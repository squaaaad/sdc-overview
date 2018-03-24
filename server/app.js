const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const redis = require('redis');
// const restaurants = require('../db/db.js');
const RestaurantModel = require('../db/db.js');
const util = require('util');

const app = express();

var redisClient = redis.createClient({host : 'localhost', port : 6379});
redisClient.get = util.promisify(redisClient.get);

redisClient.on('ready',function() {
  console.log("Redis is ready");
});
redisClient.on('error',function() {
  console.log("Error in Redis");
});

app.use(cors());
// app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/restaurants/1');
});

app.use('/restaurants/:id', express.static('client/dist'));

app.get('/api/restaurants/:id/overview', async(req, res) => {

  // get the username parameter in the URL
  var id = req.params.id;

  const cache = await redisClient.get(id);

  if(cache){
    // console.log('found in Redis');
    res.status(200);
    res.send(cache);
  } else{
    const restaurantInfo = await RestaurantModel.find({ _id : id });
    try{
      redisClient.setex(id, 3600, JSON.stringify(restaurantInfo[0]));
      res.status(200);
      res.send(restaurantInfo[0]);
    } catch(err){
      res.status(500);
      res.send(err);
    }
  }

});


/*
app.get('/api/restaurants/:id/overview', (req, res) => {
  var id = req.params.id;
  restaurants.findOneById(req.params.id, (err, result) => {
    if (err) {
      console.log('err');
      res.status(500);
      res.send(err);
    } else {     
      res.status(200);
      // console.log(result[0]);
      res.send(result[0]);
    }
  });
});
*/


module.exports = app;
