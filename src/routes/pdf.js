// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const generateAndSavePDF = require('../controllers/pdfController');

// Define routes
router.post('/generate-pdf',  generateAndSavePDF.generateAndSavePDF);

module.exports = router;
