const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

const userControllers = require("./controllers/userControllers");
const { hashPassword, verifyPassword } = require("./service/auth");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

module.exports = router;
