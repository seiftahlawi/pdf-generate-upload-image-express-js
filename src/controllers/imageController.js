// controllers/imageController.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { Image } = require('../models');

const UPLOADS_DIR = path.join(__dirname, '../..', 'public', 'images',"webp");
const PUBLIC_DIR = path.join(__dirname, '../..', 'public', 'images');

exports.uploadAndHandleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, buffer } = req.file;
    const fileExt = path.extname(originalname).toLowerCase();

    // Detect file type and handle accordingly
    if (fileExt === '.svg') {
      // Save the SVG file to the 'public/images' folder
      const fileName = Date.now() + '.svg';
      const filePath = path.join(PUBLIC_DIR, fileName);
      await fs.writeFile(filePath, buffer);
      const imagesPath=`/images/${fileName}`
      const image = await Image.create({ path: imagesPath });

      res.status(201).json({ message: 'SVG file uploaded', imagesPath,image });
    } else if (fileExt === '.png' || fileExt === '.jpg' || fileExt === '.jpeg') {
      // Process PNG/JPG image to WebP format
      const webpBuffer = await sharp(buffer).webp().toBuffer();


      // Save the WebP image to the 'uploads' folder
      const fileName = Date.now() + '.webp';

      const filePath = path.join(UPLOADS_DIR, fileName);

      await fs.writeFile(filePath, webpBuffer);
const imagesPath=`/images/webp/${fileName}`
const image = await Image.create({ path: imagesPath });

      res.status(201).json({ message: 'Image uploaded and converted to WebP', imagesPath ,image });
    } else {
      // Unsupported file type
      res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
