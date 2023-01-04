const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.connection.query(
      `select id, firstname, lastname, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, firstname, lastname, email, image_url from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, image_url, email, hashed_password) values (?,?,?,?,?)`,
      [
        user.firstname,
        user.lastname,
        user.profilePicture,
        user.email,
        user.hashedPassword,
      ]
    );
  }

  update(user) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      user.body,
      user.id,
    ]);
  }

  findUserInfoByEmail(email) {
    return this.connection.query(
      `select id, firstname, lastname, email, hashed_password from ${this.table} where email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
