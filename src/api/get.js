var config = require('../config.js'),
    rest = require('restler');

const configLocal = config.development;

var get = (req, res) => {
  const queryUrl = req.originalUrl.replace('/getData', '');
  console.log('queryUrl: ', queryUrl);

  const query = `${configLocal.api.public_cbr}${queryUrl}`;
  console.log('query: ', query);

  rest.get(query).on('success', function(data, response) {
      res.send(data);
  }).on('fail', function (err, response) {
      console.log(err);
      res.status(response.statusCode).send(err);
  });

};

module.exports = get;
