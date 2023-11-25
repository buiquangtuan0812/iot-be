const ActionHistory = require('../model/ActionHistory');

exports.findAll = (req, res) => {
    ActionHistory.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else {
            res.status(200).send(data);
        }
    })
}

exports.addNew = (data) => {
    let action;
    if (data.action !== undefined) {
        if (data.type === "Light") {
            action = data.action.slice(0, 7).trim();
        }
        else {
            action = data.action.slice(7, data.action.length).trim();
        }
    }

    const newAction = new ActionHistory({
        ssid: data.ssid,
        type: data.type,
        action: action,
        time: data.time
    });

    ActionHistory.create(newAction, (err, data) => {
        if (err) {
            console.log("Create failed: " + err);
        }
        else {
            console.log("Add successfully");
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
            res.status(200).send(data);
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
            res.status(200).send(data); 
        }
    });
}