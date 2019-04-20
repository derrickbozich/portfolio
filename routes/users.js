const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res)=>{
  console.log("in users ssr");
  let query = User.find({});
  query.exec((err, users) => {
    if(err) res.send(err);
    //If no errors, send them back to the client
    res.render('users/users', {users: users});
  });
});

/*
 * GET /user/:id route to retrieve a user given its id.
 */

 router.get('/:id', (req, res) => {
   User.findById(req.params.id, (err, user) => {
 		if(err) res.send(err);
 		//If no errors, send it back to the client
 		res.render('users/user', {user: user});
 	});
});

module.exports = router;
