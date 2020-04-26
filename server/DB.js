'use strict';
const pg = require('pg');
const client = new pg.Client(process.env.DB);
const DB = {};
DB.client = client;

DB.addDigimonToDB = function (data) {
  let { name, level, img } = data;
  let safeValues = [name, level, img];
  let SQL = 'INSERT INTO digimons (name,level,img) VALUES($1,$2,$3)';
  return client.query(SQL, safeValues);
};
DB.selectAllDataFromDB = function () {
  let SQL = 'select * from digimons';
  return client.query(SQL);
};

DB.selectOneDigi = function (id) {
  let SQL = 'SELECT * FROM digimons WHERE id=$1';
  let safeValues = [id];
  return client.query(SQL, safeValues);
};

DB.updataDigimonInDatabase = function (data, id) {
  let { name, level, img } = data;
  let SQL =
    'UPDATE digimons SET name=$1,level=$2,img=$3 WHERE id=$4 RETURNING id';
  let safeValues = [name, level, img, id];
  return client.query(SQL, safeValues);
};

DB.deleteDigimonFromDatabase = function (id) {
  let SQL = 'DELETE FROM digimons WHERE id=$1;';
  return client.query(SQL, [id]);
};

client.connect().then(() => console.log('database is conected....'));
module.exports = DB;
