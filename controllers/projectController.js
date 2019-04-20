const Project = require('../models/Project');
const Image = require('../models/Image');
const ObjectID = require('mongodb').ObjectID;
// const { check, validationResult } = require('express-validator/check');

let mongoose = require('mongoose');
/*
 * GET /project route to retrieve all the projects.
 */
function getProjects(req, res) {
	//Query the DB and if no errors, send all the projects
	let query = Project.find({});
	query.exec((err, projects) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		console.log(projects);
		res.json(projects);
	});
}

/*
 * POST /project to save a new project.
 */
function postProject(req, res) {
	console.log("in postProject");

	if(!req.body) {
		return res.status(400).send({
				message: "Hmmm, trying to save an empty user isn't very heroic."
		});
	}

	let image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;

	// DEBUG: FIGURE OUT IF YOU NEED IMAGE MODEL AND HOW POST IMAGE RELATES

	Image.create(image) // save image information in database
    .then(newImage =>{
			console.log("Image Success");
			// const project = new Project(req.body);

			let project = {};
			project.imageURL = image.url;
			project.title = req.body.title;
			project.description = req.body.description;
			project.projectURL = req.body.projectURL;

			console.log(project);

			// Save project
			Project.create(project) // save project information in database
				.then(project => {
					res.json({message: "Project successfully added!", project });
				})
				.catch(err => {
					res.status(500).send({
							message: err.message || 'An error occurred while creating the project.'
					});
				});
			// res.json(newImage);
		})
    .catch(err => console.log(err));

	// const project = new Project(req.body);
	//
	// console.log(req.body);
	//
	// // Save project
	// project.save()
	// 	.then(project => {
	// 		res.json({message: "Project successfully added!", project });
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 				message: err.message || 'An error occurred while creating the project.'
	// 		});
	// 	});
}

/*
 * GET /project/:id route to retrieve a project given its id.
 */
function getProject(req, res) {
	Project.findById(req.params.id, (err, project) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(project);
	});
}

/*
 * DELETE /project/:id to delete a project given its id.
 */
function deleteProject(req, res) {

	const _id = new ObjectID(req.params.id);

	Project.deleteOne({_id: _id})
		.then(result =>{
			res.json({ message: "Project successfully deleted!", result });
		})
		.catch(err =>{
			console.log(err);
		});
}

/*
 * PUT /project/:id to updatea a project given its id
 */
function updateProject(req, res) {

	Project.findById(req.params.id, (err, project) => {
		if(err) res.send(err);
			console.log("in updateProject");

		// console.log(req.body);
		//
		try{
			let image = {};
			image.url = req.file.url;
			image.id = req.file.public_id;

			Image.create(image) // save image information in database
				.then(newImage =>{
					console.log("Image Success");
					project.title = req.body.title;
					project.description = req.body.description;
					project.projectURL = req.body.projectURL;
					project.imageURL = newImage.url;

					project.save()
						.then(project => {
							res.json({message: "Project successfully updated!", project });
						})
						.catch(err => {
							res.status(500).send({
									message: err.message || 'An error occurred while updating the project.'
							});
						});
				})
		} catch(err){
			console.log("in error block for file upload");
				project.description = req.body.description;
				project.title = req.body.title;
				project.projectURL = req.body.projectURL;


				project.save()
					.then(project => {
						res.json({message: "Project successfully updated!", project });
					})
					.catch(err => {
						res.status(500).send({
								message: err.message || 'An error occurred while updating the project.'
						});
					});
			console.error(err);
		}

		//

		// if (true) {
		//
		// }



	});
}

//export all the functions
module.exports = { getProjects, postProject, getProject, deleteProject, updateProject };
