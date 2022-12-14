const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/current", decisionControllers.browseCurrentDecisions);
router.get("/decisions/:id", decisionControllers.read);
router.put("/decisions/:id", decisionControllers.edit);
router.post("/decisions", decisionControllers.add);
router.delete("/decisions/:id", decisionControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
