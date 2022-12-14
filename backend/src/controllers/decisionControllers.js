const database = require("../../db");

const getDecisions = (req, res) => {
  database
    .query("select * from decision")
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getDecision = (req, res) => {
  const { id } = req.params;
  database
    .query("select * from decision where id = ?", [id])
    .then(([result]) => {
      if (result.length) {
        res.json(result[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postDecision = (req, res) => {
  const { title, deadline, content, impact, risk, advantage } = req.body;

  database
    .query(
      "insert into decision (title, deadline, content, impact, risk, advantage) values (?,?,?,?,?,?)",
      [title, deadline, content, impact, risk, advantage]
    )
    .then(([result]) => {
      res.location(`/decisions/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getDecisions,
  getDecision,
  postDecision,
};
