const AbstractManager = require("./AbstractManager");

class DecisionManager extends AbstractManager {
  constructor() {
    super({ table: "decision" });
  }

  insert(decision) {
    return this.connection.query(
      `insert into ${this.table} (title, publish_date, deadline, start_content, middle_decision, final_decision, impact, risk, advantage) values (?,?,?,?,?,?,?,?,?)`,
      [
        decision.title,
        decision.publish_date,
        decision.deadline,
        decision.start_content,
        decision.middle_decision,
        decision.final_decision,
        decision.impact,
        decision.risk,
        decision.advantage,
      ]
    );
  }

  update(decision) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      decision.body,
      decision.id,
    ]);
  }
}

module.exports = DecisionManager;
