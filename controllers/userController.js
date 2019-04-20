const User = require('../models/User');
// const { check, validationResult } = require('express-validator/check');

let mongoose = require('mongoose');
/*
 * GET /user route to retrieve all the users.
 */
function getUsers(req, res) {
	//Query the DB and if no errors, send all the users
	let query = User.find({});
	query.exec((err, users) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(users);
	});
}

/*
 * POST /user to save a new user.
 */
function postUser(req, res) {
	//Validate Data
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log(errors.array());
	// 	return res.status(422).json({ errors: errors.array() });
	// }
	//Creates a new user
	// const newUser = new User(req.body);

	let user = {};
  user.email = req.body.email;
  user.password = req.body.password;

	// DEBUG: FIGURE OUT IF YOU NEED IMAGE MODEL AND HOW POST IMAGE RELATES

	User.create(user) // save user information in database
    .then(newUser =>{
			console.log("User Created");
			res.json(newUser);
		})
    .catch(err => console.log(err));
}

/*
 * GET /user/:id route to retrieve a user given its id.
 */
function getUser(req, res) {
	User.findById(req.params.id, (err, user) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(user);
	});
}

/*
 * DELETE /user/:id to delete a user given its id.
 */
function deleteUser(req, res) {
	User.deleteOne({_id : req.params.id}, (err, result) => {
		res.json({ message: "User successfully deleted!", result });
	});
}

/*
 * PUT /user/:id to updatea a user given its id
 */
function updateUser(req, res) {
	User.findById({_id: req.params.id}, (err, user) => {
		if(err) res.send(err);
		Object.assign(user, req.body).save((err, user) => {
			if(err) res.send(err);
			res.json({ message: 'User updated!', user });
		});
	});
}

//export all the functions
module.exports = { getUsers, postUser, getUser, deleteUser, updateUser };
