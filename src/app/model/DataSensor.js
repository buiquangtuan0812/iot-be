const sql = require('../../config/connectDb');

class DataSensor {
    constructor(data) {
        this.id = data.id;
        this.ssid = data.ssid;
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.brightness = data.brightness;
        this.dustLevel = data.dustLevel;
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

    static filterByDay(day, result) {
        sql.query("SELECT * FROM data_sensor WHERE time LIKE ?", [`${day}%`], (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, res)
        })
    }

    static filterByColumn(column, start, end, result) {
        if (end !== '') {
            sql.query("SELECT ssid, ??, time from data_sensor WHERE time >= ? AND time <= ?",
                [column, `${start}%`, `${end}%`], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    result(null, res);
            });
        } 
        else {
            sql.query("SELECT ssid, ??, time from data_sensor WHERE time LIKE ?",
                [column, `${start}%`], (err, res) => {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    result(null, res);
                });
        }
    }

    static filterByHour(start, end, result) {
        sql.query("SELECT * FROM data_sensor WHERE time >= ? AND time <= ?", 
            [`${start}%`, `${end}%`], (err, res) => {
                if (err) {
                    result(null, err);
                    return;
                }
                result(null, res);
        });
    }
}

module.exports = DataSensor;