const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

//Homepage
router.get('/', (req, res)=>{
  Project.find()
         // .limit(3)
         .exec()
         .then(projects => {
           res.render('home', {projects: projects});
         })
         .catch(err => {
           console.error(err)
         })

  // res.render('home');
});

router.get('/about', (req, res)=>{
  res.render('about');
});

router.get('/users/new', (req, res)=>{
  res.render('users/new');
});

router.get('/projects/new', (req, res)=>{
  res.render('projects/new');
});

module.exports = router;
