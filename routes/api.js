const express = require('express');

const router = express.Router();

const postModel = require('../models/postModel');

// Routes
router.get('/', (req, res) => {

    postModel.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) => {
    console.log('Body', req.body);
    const data = req.body;
    const newPostModel = new postModel(data);

    newPostModel.save((e) => {
        if (e) {
            res.status(500).json({ msg: 'sorry, server error'});
        } else {
            res.json({
                msg: 'received the data'
            });
        }
    });
});

router.get('/bro', (req, res) => {
    const data = {
        user: 'asher',
        age: 10
    };
    res.json(data);
});

module.exports = router;