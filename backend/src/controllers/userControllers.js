const database = require("../../db");

const getUsers = (req, res) => {
  database
    .query("select * from user")
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  database
    .query("select * from user where id = ?", [id])
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

const getDecisionsWithUsers = (req, res) => {
  const { id } = req.params;
  database
    .query(
      "select u.firstname, u.lastname, d.title, d.id from user u inner join decision d on d.user_id = u.id where u.id = ?",
      [id]
    )
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUser,
  getDecisionsWithUsers,
};
