const ActionHistory = require('../model/ActionHistory');

exports.findAll = (req, res) => {
    ActionHistory.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else {
            res.status(200).send(data.reverse());
        }
    })
}

exports.addNew = (req, res) => {

    if (!req.body) {
        res.status(404).send({
            message: 'Body is empty'
        });
    }

    const newAction = new ActionHistory({
        ssid: req.body.ssid,
        type: req.body.type,
        action: req.body.action,
        time: req.body.time
    });

    ActionHistory.create(newAction, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else {
            res.status(200).send({message: "Add successfully"});
        }
    });
};

exports.filterByDay = (req, res) => {
    const day = req.param('time');
    ActionHistory.filterByDay(day, (err, data) => {
        if (err) {
            res.status(err).send({message: err.message});
        }
        else {
            res.status(200).send(data.reverse());
        }
    });
};

exports.filterByHour = (req, res) => {
    const start = req.param('start');
    const end = req.param('end');

    ActionHistory.filterByTime(start, end, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data.reverse()); 
        }
    });
}