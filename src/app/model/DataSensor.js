const sql = require('../../config/connectDb');

class DataSensor {
    constructor(data) {
        this.id = data.id;
        this.ssid = data.ssid;
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.brightness = data.brightness;
        this.time = data.time;
    }

    static getAll(result) {
        let query = "SELECT * FROM data_sensor";

        sql.query(query, (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res);
        });
    }

    static create(newData, result) {
        sql.query("INSERT INTO data_sensor SET ?", newData, (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, {id: res.insertId, ...newData});
        })
    }
}

module.exports = DataSensor;