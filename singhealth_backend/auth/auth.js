const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("./auth.model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Signup middleware to allow creation of user in DB
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      // First, check for already existing user
      try {
        const user = await UserModel.findOne({ email });
        if (user) {
          return done(null, false, {message: "User already exists"})
        }
      } catch (err) {
        done(err);
      }

      //Else, proceed with the creation of new user
      try {
        const user = await UserModel.create({
          email: email,
          password: password,
        });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Login middleware to authenticate user
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function(email, password, done) {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
          console.log("User not found");
        }
        
        const validate = await user.isValidPassword(password);

        if (!validate) {
          console.log("Wrong pass");
          return done(null, false, { message: "Wrong Password" });
        }
        
        return done(null, user, { message: "Logged in Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Verification Middleware to verify JWT token for requests
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
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
