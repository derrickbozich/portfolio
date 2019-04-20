const Image = require('../models/Image');
// const { check, validationResult } = require('express-validator/check');

let mongoose = require('mongoose');
/*
 * GET /image route to retrieve all the images.
 */
function getImages(req, res) {
	//Query the DB and if no errors, send all the images
	let query = Image.find({});
	query.exec((err, images) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(images);
	});
}

/*
 * POST /image to save a new image.
 */
function postImage(req, res) {
	//Validate Data
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log(errors.array());
	// 	return res.status(422).json({ errors: errors.array() });
	// }
	//Creates a new image
	// const newImage = new Image(req.body);

	console.log('in postImage');

	let image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;

	// DEBUG: FIGURE OUT IF YOU NEED IMAGE MODEL AND HOW POST IMAGE RELATES

	Image.create(image) // save image information in database
    .then(newImage =>{
			console.log("Success");
			res.json(newImage);
		})
    .catch(err => console.log(err));

	//Save it into the DB.
	// newImage.save((err,image) => {
	// 	if(err) {
	// 		console.log("Saving failed");
	// 		res.send(err);
	// 	}
	// 	else { //If no errors, send it back to the client
	// 		console.log("POST Success");
	// 		// res.json({message: "Image successfully added!", image });
	// 		res.json(image );
	//
	// 	}
	// });
}

/*
 * GET /image/:id route to retrieve a image given its id.
 */
function getImage(req, res) {
	Image.findById(req.params.id, (err, image) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(image);
	});
}

/*
 * DELETE /image/:id to delete a image given its id.
 */
function deleteImage(req, res) {
	Image.deleteOne({_id : req.params.id}, (err, result) => {
		res.json({ message: "Image successfully deleted!", result });
	});
}

/*
 * PUT /image/:id to updatea a image given its id
 */
function updateImage(req, res) {
	Image.findById({_id: req.params.id}, (err, image) => {
		if(err) res.send(err);
		Object.assign(image, req.body).save((err, image) => {
			if(err) res.send(err);
			res.json({ message: 'Image updated!', image });
		});
	});
}

//export all the functions
module.exports = { getImages, postImage, getImage, deleteImage, updateImage };
// module.exports = {  postImage };
