//export all the paths for the various tables
const Routes = require("../routes/general.routes");

//create new routes for each of the path
module.exports = (app, passport) => {
  var authentication = passport.authenticate("jwt", { session: false });

  app.use(
    `/api/staff`,
    authentication,
    new Routes("staff").router
  );
  app.use(
    `/api/tenant`,
    authentication,
    new Routes("tenant").router
  );
  app.use(
    `/api/audit`,
    authentication,
    new Routes("audit").router
  );
  app.use(
    `/api/issue`,
    authentication,
    new Routes("issue").router
  );
  app.use(
    `/api/message`,
    authentication,
    new Routes("message").router
  );
  app.use(
    `/api/image`,
    authentication,
    require("../routes/image.routes")
  );
  app.use(
    `/api/email`,
    authentication,
    require("../routes/email.routes")
  );
};
