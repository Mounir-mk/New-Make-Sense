const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

const userControllers = require("./controllers/userControllers");
const { hashPassword } = require("./service/auth");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

const concernedControllers = require("./controllers/concernedControllers");

router.get("/concerned", concernedControllers.browse);
router.get("/concerned/:id", concernedControllers.read);
router.put("/concerned/:id", hashPassword, concernedControllers.edit);
router.post("/concerned", hashPassword, concernedControllers.add);
router.delete("/concerned/:id", concernedControllers.destroy);

module.exports = router;
