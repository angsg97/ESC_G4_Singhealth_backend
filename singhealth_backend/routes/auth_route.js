const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.status(201).json({
      message: "User Signup successful",
      user: req.user,
    });
  }
);

router.post(
  "/admin_signup",
  passport.authenticate("admin_signup", { session: false }),
  async (req, res, next) => {
    res.status(201).json({
      message: "Admin User Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(404).json(info);
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
});

module.exports = router;
