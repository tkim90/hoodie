const controller = require('./db/controller.js');

const attachPublicRoutes = (app) => {
  app.get('/api/test', controller.getNow);
  app.post('/api/saveMarker', controller.saveMarker);
};

module.exports = attachPublicRoutes;
