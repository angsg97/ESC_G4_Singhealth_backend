const express = require("express");
const authController = require("../auth/auth");

const router = express.Router();

// TODO: Move all AUTH routes to /auth
router.post("/tenant_signup", authController.validateEmailAndPassword, authController.tenant_signup);
router.post("/admin_signup", authController.validateEmailAndPassword, authController.admin_signup);
router.delete("/tenant_delete", authController.validateEmail, authController.tenant_delete);
router.delete("/admin_delete", authController.validateEmail, authController.admin_delete);

router.post("/login", authController.validateEmailAndPassword, authController.login);

module.exports = router;