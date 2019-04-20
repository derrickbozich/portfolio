const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const projects = require('../controllers/projectController');
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res)=>{
  let query = Project.find({});
  query.exec((err, projects) => {
    if(err) res.send(err);
    //If no errors, send them back to the client
    console.log(projects);
    res.render('projects/projects', {projects: projects});
  });
});

/*
 * GET /project/:id route to retrieve a project given its id.
 */

 router.get('/:id', (req, res) => {
   Project.findById(req.params.id, (err, project) => {
 		if(err) res.send(err);
 		//If no errors, send it back to the client
 		res.render('projects/project', {project: project});
 	});
});

/*
 * GET /project/:id/edit route to retrieve a project given its id.
 */

 router.get('/:id/edit', (req, res) => {
   const id = req.params.id;
   console.log(req.params);
   Project.findById(id, function (err, project) {
     if(err) res.send(err);
       //If no errors, send them back to the client
       console.log(project);
       res.render('projects/edit', {project: project});
   });
});

/*
 * PUT /project/:id/edit route to update a project given its id.
 */

 router.put('/:id/edit', (req, res) => {
   const id = req.params.id;
   console.log(req.params);
   Project.findById(id, function (err, project) {
     if(err) res.send(err);
     //If no errors, send them back to the client
     console.log(project);

     let query = Project.find({});
     query.exec((err, projects) => {
       if(err) res.send(err);
       //If no errors, send them back to the client
       console.log(projects);
       res.render('projects/projects', {projects: projects});
     });


   });
});

module.exports = router;
