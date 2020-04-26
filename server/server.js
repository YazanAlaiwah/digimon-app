'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const DB = require('./DB.js');
const methodOverride = require('method-override');
const API = require('./api.js');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', API.getAllDigimons);

app
  .route('/digimon')
  .post(API.addDigimonToDatabase)
  .get(API.selectAllDataFromDB);
//   .put(API.updataDigimonInDatabase);
app.get('/digimon/search/:type/:value', API.searchOnDigimonFromUrl);

app
  .route('/digimon/:id')
  .get(API.selectOneDigi)
  .put(API.updataDigimonInDatabase)
  .delete(API.deleteDigimonFromDatabase);

app.listen(PORT, () => console.log('hear from ' + PORT + '...'));
