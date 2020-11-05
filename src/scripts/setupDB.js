const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/orpg';
const connection = mongoose.connection;

mongoose.connect(dbURL, {useNewUrlParser: true});

connection.on('error', () => {
    console.log(`Error trying to access database.`);
});

connection.on('open', () => {
    console.log(`Successfully connected to the database.`);
});

new mongoose.Schema({
   username: String,
   password: String
});

connection.close();
