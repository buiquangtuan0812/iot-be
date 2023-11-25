const DataSensor = require('../model/DataSensor');

exports.findAll = (req, res) => {
    DataSensor.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else {
            res.status(200).send(data);
        }
    });
};

exports.addNew = (req, res) => {

    if (!req.body) {
        res.status(404).send({message: 'Body is empty'});
    }

    const newData = new DataSensor({
        ssid: req.body.ssid,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        brightness: req.body.brightness,
        time: req.body.time
    });

    DataSensor.create(newData, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else {
            res.status(200).send({message: "Add successfully"});
        }
    });
};

exports.filter = (req, res) => {
    const time = req.param('time');
    const column = req.param('column');
    if (column === 'All') {
        DataSensor.filterByDay(time, (err, data) => {
            if (err) {
                res.status(err).send({message: err.message});
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    else {
        DataSensor.filterByColumn(column, time, '', (err, data) => {
            if (err) {
                res.status(err).send({message: err.message});
            }
            else {
                res.status(200).send(data);
            }
        })
    }
}

exports.filterByHour = (req, res) => {
    const end = req.param('end');
    const start = req.param('start');
    const column = req.param('column');

    if (column === 'All') {
        DataSensor.filterByHour(start, end, (err, data) => {
            if (err) {
                res.status(err).send({message: err.message});
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    else {
        DataSensor.filterByColumn(column, start, end, (err, data) => {
            if (err) {
                res.status(err).send({message: err.message});
            }
            else {
                res.status(200).send(data);
            }
        });
    }

}