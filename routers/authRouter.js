const express = require('express');
const api = require('./usersModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const authMiddleware = require('./authMiddleware.js');

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
		.then((found) => {
			if (found && bcrypt.compareSync(password, found.password)) {
				const token = generateToken(found);
				res.status(200).json({ message: 'Login Successful', token });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Server error', error: error });
		});
});

//router.use('/users', authMiddleware);

router.get('/users', (req, res) => {
	//Authentication

	const token = req.headers.authorization;

	const secret = secrets.jwtSecret;

	if (token) {
		jwt.verify(token, secret, (error, decodedToken) => {
			if (error) {
				res.status(401).json({ you: 'Token invalid or expired' });
			} else {
				req.decodedToken = decodedToken;

				api
					.findAll()
					.then((returned) => {
						res.json(returned);
					})
					.catch((error) => {
						res.status(500).json({ message: 'Server error', error: error });
					});
			}
		});
	} else {
		res.status(400).json({ message: 'Provide a token' });
	}

	//Return data
});

module.exports = router;
