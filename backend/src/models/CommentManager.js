const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  findCommentsByDecisionId(id) {
    return this.connection.query(
      `select * from comment where decision_id = ?`,
      [id]
    );
  }

  setConnection(connection) {
    this.connection = connection;
  }
}

module.exports = CommentManager;
