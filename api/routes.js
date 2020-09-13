const controller = require("./db/controller.js");

const attachPublicRoutes = (app) => {
  app.get("/api/v1/healthz", (req, res) => res.json("Ok"));
  app.post("/api/v1/markers", controller.saveMarker);
  // app.post('/api/v1/markers', controller.saveMarker);
  // app.get('/api/v1/group/markers', controller.getMarkersByGroupId);
};

module.exports = attachPublicRoutes;
