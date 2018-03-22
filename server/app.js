const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
// const handler = require('./routes/requestHandler.js');
// const redis = require('redis');
var restaurants = require('../db/db.js');

const app = express();

// var redisClient = redis.createClient({host : 'localhost', port : 6379});
// redisClient.on('ready',function() {
//  console.log("Redis is ready");
// });
// redisClient.on('error',function() {
//  console.log("Error in Redis");
// });

app.use(cors());
// app.use(morgan('dev'));

app.get('/', (req, res) => {
  // res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s');
  res.redirect('/restaurants/1');
});

app.use('/restaurants/:id', express.static('client/dist'));

// app.get('/api/restaurants/:id/overview', handler.requestHandler);

/*
app.get('/api/restaurants/:id/overview', (req, res) => {

  // get the username parameter in the URL
  var id = req.params.id;

  // use the redis client to get restaurant info
  redisClient.get(id, (error, result) => {
    if (result) {
      // the result exists in our cache - return it to our user immediately
      console.log('found result in Redis');
      res.send(result);
    } else {
      // we couldn't find the key "id" in our cache, so get it from db
      // console.log('fetching result from db');
      restaurants.findOneById(req.params.id, (err, result) => {
        if (err) {
          console.log('err');
          res.status(500);
          res.send(err);
        } else {
          // store the key-value pair (id:restaurantinfo) in our cache
          // with an expiry of 1 minute (60s)
          // console.log('result', result[0]);
          redisClient.setex(id, 3600, JSON.stringify(result[0]));
          // console.log('saved to Redis');
          // return the result to the user            
          res.status(200);
          // console.log(result[0]);
          res.send(result[0]);
        }
      });
    }
  });
});
*/

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


module.exports = app;
