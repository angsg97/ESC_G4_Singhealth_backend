//export all the paths for the various tables
const Routes = require("../routes/general.routes");

//create new routes for each of the path
module.exports = (app) => {
  app.use(`/api/staff`, new Routes("staff").router);
  app.use(`/api/tenant`, new Routes("tenant").router);
  app.use(`/api/audit`, new Routes("audit").router);
  app.use(`/api/issue`, new Routes("issue").router);
  app.use(`/api/message`, new Routes("message").router);
};
