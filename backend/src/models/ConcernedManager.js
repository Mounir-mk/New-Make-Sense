const AbstractManager = require("./AbstractManager");

class ConcernedManager extends AbstractManager {
  constructor() {
    super({ table: "concerned" });
  }

  insert(concerned) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, hashed_password) values (?,?,?,?)`,
      [
        concerned.firstname,
        concerned.lastname,
        concerned.email,
        concerned.hashedPassword,
      ]
    );
  }

  update(concerned) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      concerned.body,
      concerned.id,
    ]);
  }
}

module.exports = ConcernedManager;
