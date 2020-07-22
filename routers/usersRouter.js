const express = require('express');
const api = require('./usersModel.js');
const bcrypt = require('bcryptjs');
const authRouter = require('./authRouter.js');

const router = express.Router();

router.post('/register', (req, res) => {
	if (req.body.username && req.body.password) {
		let hashedPass = bcrypt.hashSync(req.body.password, 12);

        let acc = {
            username: req.body.username,
            password: hashedPass
        }

		api
			.newAccount(acc)
			.then((returned) => {
				res.status(201).json({ message: 'Account created!', userID: returned });
			})
			.catch((error) => {
				res.status(500).json({ message: 'Server error', error: error });
			});
	} else {
        res.status(400).json({message: "Provide a username and a password"})
    }
});

//Secure paths secure paths

router.use('/', authRouter);

module.exports = router;
