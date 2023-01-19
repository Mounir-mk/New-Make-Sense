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
      `select c.id, c.content, c.user_id, c.decision_id, u.firstname, u.lastname, u.image_url from comment c join user u on c.user_id = u.id where decision_id = ?`,
      [id]
    );
  }

  insert(comment) {
    return this.connection.query(
      `insert into ${this.table} (content, user_id, decision_id) values (?, ?, ?)`,
      [comment.content, comment.user_id, comment.decision_id]
    );
  }

  setConnection(connection) {
    this.connection = connection;
  }
}

module.exports = CommentManager;
