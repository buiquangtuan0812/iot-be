const mysql_connector = require('mysql');

const connector = mysql_connector.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0812',
    database: 'iot_db'
});
connector.connect(err => {
    if (err) throw err;
    console.log('Successfully connected to the database');
});
    
module.exports = connector;