const controller = require('./db/controller.js');

const attachPublicRoutes = (app) => {
  app.get('/api/test', controller.getNow);
  app.post('/api/markers', controller.saveMarker);
  app.get('/api/group/markers', controller.getMarkersByGroupId);
};

module.exports = attachPublicRoutes;
