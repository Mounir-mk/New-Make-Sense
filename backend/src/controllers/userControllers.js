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

module.exports = {
  getUsers,
  getUser,
};
