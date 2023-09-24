const sql = require('../../config/connectDb');

class ActionHistory {
    constructor(action) {
        this.id = action.id;
        this.ssid = action.ssid;
        this.type = action.type;
        this.action = action.action;
        this.time = action.time;
    }
    static getAll(result) {
        let query = "SELECT * FROM action_history";

        sql.query(query, (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        });
    }
    static create(newAction, result) {
        sql.query("INSERT INTO action_history SET ?", newAction, (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, {id: res.insertId, ...newAction});
        })
    }
}

module.exports = ActionHistory;