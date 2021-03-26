//export all the paths for the various tables
const Routes = require("../routes/general.routes");

//create new routes for each of the path
module.exports = (app, passport) => {
  const auth = passport.authenticate("jwt", { session: false });
  const admin_auth = passport.authenticate("jwt_admin", { session: false });

  app.use(
    `/api/staff`,
    auth,
    new Routes("staff").router
  );
  app.use(
    `/api/tenant`,
    auth,
    new Routes("tenant").router
  );
  app.use(
    `/api/audit`,
    auth,
    new Routes("audit").router
  );
  app.use(
    `/api/issue`,
    auth,
    new Routes("issue").router
  );
  app.use(
    `/api/message`,
    auth,
    new Routes("message").router
  );
  app.use(
    `/api/image`,
    auth,
    require("../routes/image.routes")
  );
  app.use(
    `/api/email`,
    auth,
    require("../routes/email.routes")
  );
  app.use(
    `/auth`,
    require("../routes/auth_route")
  );
};
