const express = require('express');
const router = express.Router();
// const Image = require('../models/Image');
const parser = require('../../cloudinary');
const images = require('../../controllers/imageController');

//Create Image
router.post('/', parser.single("image"), images.postImage);

//Get Image
router.get('/:id', parser.single("image"), images.getImage);

//Delete
router.delete('/:id', parser.single("image"), (req, res) => {
  images.deleteImage;
});

//Update
router.put('/:id', parser.single("image"), (req, res) => {
  images.updateImage;
});

module.exports = router;
