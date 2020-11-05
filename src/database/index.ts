import mongoose, {Connection} from "mongoose";
import {MongoError, Collection, MongoCallback} from "mongodb";

const dbURL = 'mongodb://localhost:27017/orpg';
const connection: Connection = mongoose.connection;

const initializeDB = () => {
    mongoose.connect(dbURL, { useNewUrlParser: true });
}

connection.on('error', () => {
    console.log(`Error trying to access database.`);
});

connection.on('open', () => {
    console.log(`Successfully connected to the database.`);
});

const updateOne = (collectionName: string, query: object, callback: MongoCallback<any>) => {
    connection.db.collection(collectionName, (err: MongoError, collection: Collection): void => {
        collection.find(query).toArray(callback);
    });
}

const insertOne = (collectionName: string, query: object, callback: any) => {
    connection.db.collection(collectionName, (err: MongoError, collection: Collection): void => {
        collection.insertOne(query, (err: MongoError, creationResult: any) => {
            if (err) return console.error(`[ERROR:INSERTING ONTO ${collectionName}]: ${err}`);
            callback(err, creationResult);
        })
    });
}

const findOne = (collectionName: string, query: object, callback: MongoCallback<any>) => {
    connection.db.collection(collectionName, (err: MongoError, collection: Collection): void => {
        collection.findOne(query, {}, (err: MongoError, found: any) => {
            callback(err, found);
        })
    });
}

export { initializeDB, findOne, insertOne, updateOne };