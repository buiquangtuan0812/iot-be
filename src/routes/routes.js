const ActionRouter = require('./ActionHistoryRoutes');
const PublishRouter = require('./MosquittoRoutes');
const DataSensorRouter = require('./DataSensorRoute');

function route(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"    
        );
        next();
    });
    app.use('/', function(req, res) {
        res.status(200).send({message: "Server is running!"});
    });
    app.use('/action-history', ActionRouter);
    app.use('/data-sensor', DataSensorRouter);
    app.use('/mosquitto', PublishRouter);
}

module.exports = route;
