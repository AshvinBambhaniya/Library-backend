const express = require('express');
const Book = require('../models/Book')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

router.post('/addbook', fetchuser, async (req, res) => {
    try {
        const { book, auther, publisher } = req.body;

        const newbook = new Book({
            book,
            auther,
            publisher,
            user: req.user.id
        })

        const savedbook = await newbook.save();

        res.status(201).json(savedbook);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchallbook', fetchuser, async (req, res) => {
    try {
        const allbooks = await Book.find({ user: req.user.id })

        res.status(201).json(allbooks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updatebook/:id', fetchuser, async (req, res) => {

    const { book, auther, publisher } = req.body;

    try {
        // Create a newNote object
        const newBook = {};
        if (book) { newBook.book = book };
        if (auther) { newBook.auther = auther };
        if (publisher) { newBook.publisher = publisher };

        newBook.date = Date.now();

        // Find the note to be updated and update it
        let old_book = await Book.findById(req.params.id);
        if (!old_book) { return res.status(404).send("Not Found") }

        if (old_book.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        old_book = await Book.findByIdAndUpdate(req.params.id, { $set: newBook }, { new: true })
        res.status(201).json({ old_book });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

router.delete('/deletebook/:id', fetchuser, async (req, res) => {
    try {

        let deletebook = await Book.findById(req.params.id)
        if (!deletebook) {
            return res.status(404).send("Not Found")
        }

        if (deletebook.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        deletebook = await Book.findByIdAndDelete(req.params.id)
        res.status(201).json(deletebook);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;