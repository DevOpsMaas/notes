import { connect } from "mongoose";

const { MONGO_URI } = process.env;

exports.connect = () => {
    // Connect to the mongo database
    connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};