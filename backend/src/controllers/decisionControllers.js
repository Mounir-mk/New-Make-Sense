const jwt = require("jsonwebtoken");
const models = require("../models");

const browse = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;
  if (userRole !== "visitor") {
    models.decision
      .findAllDecisions()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else if (userRole === "visitor") {
    models.decision
      .findOnlyDecisionsIfConcernedByIt(userId)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const read = (req, res) => {
  models.decision
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const decision = rows[0];
        decision.comment = req.comment;
        res.send(decision);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const decision = req.body;
  decision.id = parseInt(req.params.id, 10);

  models.decision
    .update(decision)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res, next) => {
  const decision = req.body;
  models.decision
    .insert(decision)
    .then(([result]) => {
      req.body.decisionId = result.insertId;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.decision
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addConcerned = (req, res) => {
  const { users, decisionId } = req.body;
  models.decision
    .insertConcerned(users, decisionId)
    .then(() => {
      res.status(201).json(decisionId);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getComments = (req, res, next) => {
  models.comment
    .findCommentsByDecisionId(req.params.id)
    .then(([rows]) => {
      req.comment = rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  addConcerned,
  getComments,
};
