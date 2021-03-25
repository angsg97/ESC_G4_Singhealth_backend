const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../auth/auth");

const router = express.Router();

// TODO: Move all AUTH routes to /auth
router.post("/tenant_signup", authController.tenant_signup);
router.post("/admin_signup", authController.admin_signup);
router.delete("/tenant_delete", authController.tenant_delete);
router.delete("/admin_delete", authController.admin_delete);

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
