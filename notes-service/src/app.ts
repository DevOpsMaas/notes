require('dotenv').config();
require('./config/database').connect();

import express = require('express');
const auth = require("./middleware/auth");
const Note = require("./model/note");
const app = express();

app.use(express.json());

app.get('/api/v1/:userId/notes', auth, async (req, res) => {
    let userId = req.params.userId;

    try {
        const notes = await Note.find({ userId });

        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Could not get notes for user ${userId}. Try again later.`);
    }
});

app.get('/api/v1/note/:id', auth, async (req, res) => {
    let noteId = req.params.id;

    try {
        const note = await Note.findById(noteId);

        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Could not get note of with ${noteId}. Try again later.`);
    }
});

app.post('/api/v1/notes', auth, async (req, res) => {
    try {
        const note = await Note.create({
            userId: req.body.userId,
            title: req.body.title,
            body: req.body.body
        });

        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Could not save note. Try again later.`);
    }
});

app.delete('/api/v1/note/:id', auth, async (req, res) => {
    let noteId = req.params.id;

    try {
        await Note.findByIdAndDelete(noteId)

        res.status(200).send("Note deleted.");
    } catch (error) {
        console.log(error);
        res.status(500).send(`Could not delete note with id ${noteId}. Try again later.`);
    }
});

app.get('*', function (_, res) {
    res.status(404).send('⛔️ Not Found ⛔️');
});

module.exports = app;