const passport = require("passport");
const jwt = require("jsonwebtoken");
const localStrategy = require("passport-local").Strategy;
const { TenantModel, AdminModel } = require("./auth.model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { check } = require('express-validator')

const messages = {
  INVALID_EMAIL_FORMAT: "Invalid Email Format",
  EMAIL_ALR_EXISTS: "Email already exists in Database",
  CREATE_USER_ERR: "Error occurred when trying to create user",
  SIGNUP_SUCCESS: "Signup Successful",
  EMAIL_NOT_EXIST: "Email does not exist in Database",
  WRONG_PASS: "Entered password is wrong",
  LOGIN_SUCCESS: "Login Successful",
  DELETE_SUCCESS: "Deletion of user Successful",
};

const checkExistingUser = async function (model, email) {
  const user = await model.findOne({ email });
  if (user) {
    return true;
  }
};

// method to check for valid email
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const authController = {
  async tenant_signup(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      // Check for valid email
      if (!validateEmail(email)) {
        console.log(messages.INVALID_EMAIL_FORMAT);
        return res.status(400).json({ message: messages.INVALID_EMAIL_FORMAT });
      }

      // Check if duplicate Tenant or Admin exists
      const hasTenant = await checkExistingUser(TenantModel, email);
      const hasAdmin = await checkExistingUser(AdminModel, email);

      if (hasTenant || hasAdmin) {
        console.log(messages.EMAIL_ALR_EXISTS);
        return res.status(400).json({ message: messages.EMAIL_ALR_EXISTS });
      }

      // Proceed with user signup
      const user = await TenantModel.create({
        email: email,
        password: password,
      });
      if (!user) {
        next(new Error(messages.CREATE_USER_ERR));
      } else {
        return res.status(201).json({
          message: messages.SIGNUP_SUCCESS,
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
        console.log(messages.INVALID_EMAIL_FORMAT);
        return res.status(400).json({ message: messages.INVALID_EMAIL_FORMAT });
      }

      // Check if duplicate Tenant or Admin exists
      const hasTenant = await checkExistingUser(TenantModel, email);
      const hasAdmin = await checkExistingUser(AdminModel, email);

      if (hasTenant || hasAdmin) {
        console.log(messages.EMAIL_ALR_EXISTS);
        return res.status(400).json({ message: messages.EMAIL_ALR_EXISTS });
      }

      // Proceed with user signup
      const user = await AdminModel.create({
        email: email,
        password: password,
      });
      if (!user) {
        next(new Error(messages.CREATE_USER_ERR));
      } else {
        return res.status(201).json({
          message: messages.SIGNUP_SUCCESS,
          user: user,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async tenant_delete(req, res, next) {
    try {
      const email = req.body.email;
      const hasTenant = await checkExistingUser(TenantModel, email);

      if (!hasTenant) {
        console.log(messages.EMAIL_NOT_EXIST);
        return res.status(400).json({ message: messages.EMAIL_NOT_EXIST });
      }

      await TenantModel.deleteOne({
        email: email,
      });

      console.log(messages.DELETE_SUCCESS);
      return res.json({ message: messages.DELETE_SUCCESS });
    } catch (err) {
      next(err);
    }
  },

  async admin_delete(req, res, next) {
    try {
      const email = req.body.email;
      const hasAdmin = await checkExistingUser(AdminModel, email);

      if (!hasAdmin) {
        console.log(messages.EMAIL_NOT_EXIST);
        return res.status(400).json({ message: messages.EMAIL_NOT_EXIST });
      }

      await AdminModel.deleteOne({
        email: email,
      });

      console.log(messages.DELETE_SUCCESS);
      return res.json({ message: messages.DELETE_SUCCESS });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(404).json(info);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          console.log(info.message);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign(
            {
              user: body,
              isAdmin: info.isAdmin,
            },
            process.env.JWT_SECRET_KEY
          );

          return res.json({ token, isAdmin: info.isAdmin });
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  },

  validateEmailAndPassword: [
    check('email').trim().isEmail().normalizeEmail(),
    check('password').not().isEmpty().trim().escape()
  ],

  validateEmail: [
    check('email').trim().isEmail().normalizeEmail()
  ]
};

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
          console.log(messages.EMAIL_NOT_EXIST);
          return done(null, false, { message: messages.EMAIL_NOT_EXIST });
        }
        // If tenant exists, check if password matches
        else if (tenant) {
          const validate = await tenant.isValidPassword(password);
          console.log(validate);

          if (!validate) {
            console.log(messages.WRONG_PASS);
            return done(null, false, { message: messages.WRONG_PASS });
          } else {
            console.log(messages.LOGIN_SUCCESS);
            return done(null, tenant, {
              message: messages.LOGIN_SUCCESS,
              isAdmin: false,
            });
          }
        }
        // Else, check if Admin password matches
        else {
          const validate = await admin.isValidPassword(password);

          if (!validate) {
            console.log(messages.WRONG_PASS);
            return done(null, false, { message: messages.WRONG_PASS });
          } else {
            console.log(messages.LOGIN_SUCCESS);
            return done(null, admin, {
              message: messages.LOGIN_SUCCESS,
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
