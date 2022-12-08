const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const decisionControllers = require("./controllers/decisionControllers");
const userControllers = require("./controllers/userControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/decisions", decisionControllers.getDecisions);
router.get("/decisions/:id", decisionControllers.getDecision);
router.post("/decisions", decisionControllers.postDecision);

router.get("/users", userControllers.getUsers);
router.get("/users/:id", userControllers.getUser);

module.exports = router;
