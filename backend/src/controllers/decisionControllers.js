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
  const {
    title,
    deadline,
    publishDate,
    startContent,
    impact,
    risk,
    advantage,
    middleDecision,
    finalDecision,
  } = req.body;

  database
    .query(
      "insert into decision (title, deadline,publish_date, start_content, impact, risk, advantage, middle_decision, final_decision) values (?,?,?,?,?,?)",
      [
        title,
        deadline,
        publishDate,
        startContent,
        impact,
        risk,
        advantage,
        middleDecision,
        finalDecision,
      ]
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
