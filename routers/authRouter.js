const express = require('express');
const api = require('./usersModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

const router = express.Router();

let generateToken = (user) => {
	const payload = {
		userID: user.id,
		username: user.username,
	};

	const secret = secrets.jwtSecret;
	const options = {
		expiresIn: '1d',
	};

	return jwt.sign(payload, secret, options);
};

//Routes

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	api
		.findByUsername(username)
		.then(found => {
            if(found && bcrypt.compareSync(password, found.password)) {
                const token = generateToken(found);
                res.status(200).json({message: "Login Successful", token});
            }
        })
		.catch((error) => {
			res.status(500).json({ message: 'Server error', error: error });
		});
});



module.exports = router;
