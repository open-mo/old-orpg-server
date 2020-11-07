const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/orpg';
const connection = mongoose.connection;

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log(`Successfully connected to the database.`);
        await connection.db.collection('users').deleteMany({});
        await connection.db.collection('players').deleteMany({});
        console.log(`All data have been wiped.`);
        connection.close();
    })
    .catch(err => {
        console.log(`[DB-ACCESSING-ERROR]: ${err}`);
    });