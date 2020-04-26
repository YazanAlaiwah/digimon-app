'use strict';
const API = {};
const DB = require('./DB.js');
const superagent = require('superagent');

API.getAllDigimons = function (req, res) {
  superagent
    .get('https://digimon-api.herokuapp.com/api/digimon')
    .then((data) => res.render('index', { digimons: data.body }));
};

API.addDigimonToDatabase = function (req, res) {
  DB.addDigimonToDB(req.body).then((data) => res.redirect('/digimon'));
};

API.selectAllDataFromDB = function (req, res) {
  DB.selectAllDataFromDB().then((data) =>
    res.render('saved', { savedDigimons: data.rows })
  );
};

API.selectOneDigi = function (req, res) {
  DB.selectOneDigi(req.params.id).then((data) =>
    res.render('details', { data: data.rows })
  );
};

API.updataDigimonInDatabase = function (req, res) {
  DB.updataDigimonInDatabase(req.body, req.params.id).then((data) =>
    res.send('/digimon')
  );
};

API.deleteDigimonFromDatabase = function (req, res) {
  DB.deleteDigimonFromDatabase(req.params.id).then((data) =>
    res.redirect('/digimon')
  );
};

API.searchOnDigimonFromUrl = function (req, res) {
  superagent
    .get(
      `https://digimon-api.herokuapp.com/api/digimon/${req.params.type}/${req.params.value}`
    )
    .then((data) => res.send(data.body))
    .catch((err) => console.log(err, 'sffdsf'));
};
module.exports = API;
