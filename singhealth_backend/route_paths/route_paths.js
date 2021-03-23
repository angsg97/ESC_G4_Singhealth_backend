//export all the paths for the various tables
const Routes = require("../routes/general.routes");

//create new routes for each of the path
module.exports = (app, passport) => {
  app.use(
    `/api/staff`,
    passport.authenticate("jwt", { session: false }),
    new Routes("staff").router
  );
  app.use(
    `/api/tenant`,
    passport.authenticate("jwt_admin", { session: false }),
    new Routes("tenant").router
  );
  app.use(
    `/api/audit`,
    passport.authenticate("jwt", { session: false }),
    new Routes("audit").router
  );
  app.use(
    `/api/issue`,
    passport.authenticate("jwt", { session: false }),
    new Routes("issue").router
  );
  app.use(
    `/api/message`,
    passport.authenticate("jwt", { session: false }),
    new Routes("message").router
  );
  app.use(
    `/api/image`,
    passport.authenticate("jwt", { session: false }),
    require("../routes/image.routes")
  );
};
