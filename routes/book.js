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

router.delete('/deletebook', fetchuser, async (req, res) => {
    try {

        const { book, auther, publisher } = req.body;

        let deletebook = await Book.findOne({ book, auther, publisher, user: req.user.id })
        if (!deletebook) {
            return res.status(404).send("Not Found")
        }

        if (deletebook.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        deletebook = await Book.findByIdAndDelete(deletebook.id)
        res.status(201).json(deletebook);

    } catch (error) {

    }
})

module.exports = router;