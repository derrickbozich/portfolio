const express = require('express');
const router = express.Router();
// const Project = require('../../models/Project');
const parser = require('../../cloudinary');
const projects = require('../../controllers/projectController');

// DEBUG: do you need parser?

//Get Projects
router.get('/', projects.getProjects);

//Create Project
router.post('/', parser.single("image"), projects.postProject);

//Get Project
router.get('/:id', projects.getProject);

//Delete
router.delete('/:id', projects.deleteProject);

//Update
router.post('/:id/edit', parser.single("image"), projects.updateProject);

module.exports = router;
