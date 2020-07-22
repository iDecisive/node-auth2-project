const express = require('express');
const api = require('./usersModel.js');

const router = express.Router();

router.post('/register', (req, res) => {
    api.newAccount(req.body).then(returned => {
        res.status(201).json({message: "Account created!", userID: returned});
    }).catch(error => {
        res.status(500).json({message: "Server error", error: error});
    });
});

router.post('/login', (req, res) => {


});

router.get('/users', (req, res) => {


});

module.exports = router;