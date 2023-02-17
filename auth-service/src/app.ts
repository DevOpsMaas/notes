require('dotenv').config();
require('./config/database').connect();

import express = require('express');
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
const User = require('./model/user');
const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }

        // Check if user already exists
        // Validate if user exist in our DB
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.PRIVATE_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("We could not create the user. Try again later.");
    }
});

app.post('/login', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("We could not create the user. Try again later.");
    }
});

app.get('*', function (_, res) {
    res.status(404).send('⛔️ Not Found ⛔️');
});

module.exports = app;