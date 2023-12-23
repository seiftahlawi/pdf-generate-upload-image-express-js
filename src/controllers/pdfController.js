// controllers/imageController.js
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const { PDF } = require('../models');
const ejs = require('ejs');

exports.generateAndSavePDF =  (req, res) => {
    console.log(req.body.text)
    if (!req.body.text) {
        return res.status(400).json({ error: 'there is no text to generate pdf' });
      }
  try {

  // Read the EJS template
  const templatePath = path.join(__dirname, '../../','views','template.ejs');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Replace placeholders in the template with dynamic content
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const htmlContent = ejs.render(template, { currentDate, currentTime,text:req.body.text });

  // Options for the html-pdf library
  const pdfOptions = {
    format: 'Letter',
  };

  // Generate PDF from HTML using html-pdf
  pdf.create(htmlContent, pdfOptions).toFile((err, filePath) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating PDF' });
    }

    // Save to the public/pdf folder
    const fileName = Date.now() + '.pdf';
    const savePath = path.join(__dirname, '../../', 'public', 'pdf', fileName);

    // Move the generated PDF to the desired path
    fs.rename(filePath.filename, savePath, async(renameErr) => {
      if (renameErr) {
        return res.status(500).json({ error: 'Error moving PDF to the desired path' });
      }
      const pdfPath=`/pdf/${fileName}`

      const file = await PDF.create({ path: pdfPath });

      res.status(200).json({ message: 'PDF generated and saved successfully', pdfPath: pdfPath,file });
    });
  });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
