// # Frontend routes
var express   = require('express'),
  get         = require('../api/get'),
  router      = express.Router(),
  adminRoutes;

adminRoutes = () => {
  router.get('/getData', get);

  return router;
};

module.exports = adminRoutes;
