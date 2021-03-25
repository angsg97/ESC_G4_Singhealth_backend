const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { TenantModel, AdminModel } = require("./auth.model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const checkExistingUser = async function (model, email) {
  const user = await model.findOne({ email });
  if (user) {
    return true;
  }
};

// method to check for valid emailgit fetch
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const authController = {
  async signup(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // Check for valid email
      if (!validateEmail(email)) {
        console.log("Invalid Email Format");
        return res.status(400).json({ message: "Invalid Email Format" });
      }

      // Check if duplicate Tenant exists
      const hasTenant = await checkExistingUser(TenantModel, email);
      if (hasTenant) {
        console.log("Email already exists in Tenant account");
        return res
          .status(400)
          .json({ message: "Email already exists in Tenant account" });
      }

      // Check if duplicate Admin exists
      const hasAdmin = await checkExistingUser(AdminModel, email);
      if (hasAdmin) {
        console.log("Email already exists in Admin account");
        return res
          .status(400)
          .json({ message: "Email already exists in Admin account" });
      }

      // Proceed with user signup
      const user = await TenantModel.create({
        email: email,
        password: password,
      });
      if (!user) {
        next(new Error("Error occurred when trying to create user"));
      } else {
        return res.status(201).json({
          message: "Tenant Signup Successful",
          user: user,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async admin_signup(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // Check for valid email
      if (!validateEmail(email)) {
        console.log("Invalid Email Format");
        return res.status(400).json({ message: "Invalid Email Format" });
      }

      // Check if duplicate Tenant exists
      const hasTenant = await checkExistingUser(TenantModel, email);
      if (hasTenant) {
        console.log("Email already exists in Tenant account");
        return res
          .status(400)
          .json({ message: "Email already exists in Tenant account" });
      }

      // Check if duplicate Admin exists
      const hasAdmin = await checkExistingUser(AdminModel, email);
      if (hasAdmin) {
        console.log("Email already exists in Admin account");
        return res
          .status(400)
          .json({ message: "Email already exists in Admin account" });
      }

      // Proceed with user signup
      const user = await AdminModel.create({
        email: email,
        password: password,
      });
      if (!user) {
        next(new Error("Error occurred when trying to create user"));
      } else {
        return res.status(201).json({
          message: "Admin Signup Successful",
          user: user,
        });
      }
    } catch (err) {
      next(err);
    }
  },

};

// Signup middleware to allow creation of tenant in DB
// passport.use(
//   "signup",
//   new localStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async function (email, password, done) {
//       // First, check for already existing user
//       try {
//         // Check for correct email
//         if (!TenantModel.validateEmail(email)) {
//           console.log("Invalid Email Format");
//           return done(null, false, {
//             message: "Invalid Email Format",
//           });
//         }

//         const hasTenant = await checkExistingUser(TenantModel, email);
//         if (hasTenant) {
//           console.log("Email already exists in Tenant account");
//           return done(null, false, {
//             message: "Email already exists in Tenant account",
//           });
//         }

//         const hasAdmin = await checkExistingUser(AdminModel, email);
//         if (hasAdmin) {
//           console.log("Email already exists in Admin account");
//           return done(null, false, {
//             message: "Email already exists in Admin account",
//           });
//         }
//       } catch (err) {
//         done(err);
//       }

//       //Else, proceed with the creation of new tenant
//       try {
//         const user = await TenantModel.create({
//           email: email,
//           password: password,
//         });
//         return done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// Signup middleware to allow creation of admin user in DB
// passport.use(
//   "admin_signup",
//   new localStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async function (email, password, done) {
//       // First, check for already existing user
//       try {
//         const hasTenant = await checkExistingUser(TenantModel, email);
//         if (hasTenant) {
//           console.log("Email already exists in Tenant account");
//           return done(null, false, {
//             message: "Email already exists in Tenant account",
//           });
//         }

//         const hasAdmin = await checkExistingUser(AdminModel, email);
//         if (hasAdmin) {
//           console.log("Email already exists in Admin account");
//           return done(null, false, {
//             message: "Email already exists in Admin account",
//           });
//         }
//       } catch (err) {
//         done(err);
//       }

//       //Else, proceed with the creation of new admin user
//       try {
//         const user = await AdminModel.create({
//           email: email,
//           password: password,
//         });
//         return done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// Login middleware to authenticate user
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const tenant = await TenantModel.findOne({ email });
        const admin = await AdminModel.findOne({ email });

        // If tenant and admin email both don't exist in the database
        if (!tenant && !admin) {
          console.log("User not found");
          return done(null, false, { message: "User not found" });
        }
        // If tenant exists, check if password matches
        else if (tenant) {
          const validate = await tenant.isValidPassword(password);
          console.log(validate);

          if (!validate) {
            console.log("Tenant password is wrong");
            return done(null, false, { message: "Wrong Password" });
          } else {
            return done(null, tenant, {
              message: "Logged in as User Succesfully",
              isAdmin: false,
            });
          }
        }
        // Else, check if Admin password matches
        else {
          const validate = await admin.isValidPassword(password);

          if (!validate) {
            console.log("Admin password is wrong");
            return done(null, false, { message: "Wrong Password" });
          } else {
            return done(null, admin, {
              message: "Logged in as Admin Succesfully",
              isAdmin: true,
            });
          }
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Verification Middleware to verify JWT token for requests
passport.use(
  "jwt",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Verification Middleware to verify JWT token for requests + Checking is User is admin
passport.use(
  "jwt_admin",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        if (token.isAdmin) {
          return done(null, token.user);
        } else {
          return done(null, null);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = authController;