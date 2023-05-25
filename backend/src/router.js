const express = require("express");
const path = require("path");

const router = express.Router();

// serve the uploads folder for uploaded resources
router.use(express.static(path.join(__dirname, "../uploads")));

// prefix all routes with /api
router.use("/api", router);

const decisionControllers = require("./controllers/decisionControllers");
const userControllers = require("./controllers/userControllers");
const {
  hashPassword,
  verifyPassword,
  refreshTokens,
  verifyToken,
  logout,
} = require("./services/auth");

router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.post("/users/logout", logout);
router.post(
  "/users",
  userControllers.uploadFile,
  userControllers.handleFile,
  hashPassword,
  userControllers.add
);

router.post("/token", refreshTokens);

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
router.put("/users/:id", hashPassword, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
