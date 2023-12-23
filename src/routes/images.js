// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');

// Set up multer storage
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });

// Define routes
router.post('/upload-image', upload.single('image'), imageController.uploadAndHandleImage);

module.exports = router;
