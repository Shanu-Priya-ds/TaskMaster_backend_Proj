const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

module.exports = mongoose.connection;