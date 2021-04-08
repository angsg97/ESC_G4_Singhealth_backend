//export all the paths for the various tables
const Routes = require("../routes/general.routes");

//create new routes for each of the path
module.exports = (app, passport) => {

  const auth = passport.authenticate("jwt", { session: false });
  const admin_auth = passport.authenticate("jwt_admin", { session: false });

  const staffRoutes = new Routes(app, passport, "staff");
  const tenantRoutes = new Routes(app, passport, "tenant");
  const auditRoutes = new Routes(app, passport, "audit");
  const issueRoutes = new Routes(app, passport, "issue");
  const messageRoutes = new Routes(app, passport, "message");


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
