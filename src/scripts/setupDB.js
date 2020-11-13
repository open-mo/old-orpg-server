const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/orpg';
const connection = mongoose.connection;

mongoose.connect(dbURL, {useNewUrlParser: true});

connection.on('error', () => {
    console.log(`Error trying to access database.`);
});

connection.on('open', () => {
    console.log(`Successfully connected to the database.`);
    connection.db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["username", "password"],
                properties: {
                    username: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    password: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    }
                }
            }
        }
    });
    console.log(`diawjidjaw`);
});

connection.close();
