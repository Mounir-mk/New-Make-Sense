const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");
const userControllers = require("./controllers/userControllers");
const { hashPassword, verifyPassword, verifyToken } = require("./service/auth");

router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.post(
  "/users",
  userControllers.uploadFile,
  userControllers.handleFile,
  hashPassword,
  userControllers.add
);

router.use(verifyToken);

// route concernings decisions

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);
router.post(
  "/decisions/:decisionId/comments",
  decisionControllers.addCommentToDecision
);

// route concernings users
router.get("/users/decisions", userControllers.browseAndCountDecisions);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
