const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');
const { PDFDocument } = require('pdf-lib');

async function convertResume() {
  const resumePath = path.join(__dirname, '..', 'Ilia Gourianov - engineering manager.md');
  const seoPath = path.join(__dirname, '..', 'seo.txt');
  const outputPath = path.join(__dirname, '..', 'Ilia Gourianov - engineering manager.pdf');

  // Read keywords from seo.txt
  let keywords = '';
  try {
    const seoContent = fs.readFileSync(seoPath, 'utf8');
    // Parse newline-separated keywords and convert to comma-separated for PDF metadata
    const keywordArray = seoContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    keywords = keywordArray.join(', ');

    console.log(`Loaded ${keywordArray.length} keywords from seo.txt`);
  } catch (error) {
    console.error('Error reading seo.txt:', error.message);
    console.log('Continuing without keywords...');
  }

  // Configure PDF options
  const pdfOptions = {
    pdf_options: {
      format: 'Letter',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true,
      displayHeaderFooter: false
    },
    stylesheet_encoding: 'utf-8'
  };

  try {
    console.log('Converting resume to PDF...');
    const pdf = await mdToPdf(
      { path: resumePath },
      pdfOptions
    );

    if (pdf) {
      // Load the generated PDF
      const pdfDoc = await PDFDocument.load(pdf.content);

      // Set metadata
      pdfDoc.setTitle('Ilia Gourianov - Software Engineering Manager Resume');
      pdfDoc.setAuthor('Ilia Gourianov');
      pdfDoc.setSubject('Software Engineering Manager Resume');
      pdfDoc.setKeywords([keywords]);
      pdfDoc.setProducer('md-to-pdf with pdf-lib');
      pdfDoc.setCreator('md-to-pdf');
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      // Save with metadata
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);

      console.log(`✓ Resume converted successfully!`);
      console.log(`  Output: ${outputPath}`);
      console.log(`  Keywords embedded: ${keywords.length} characters`);
    }
  } catch (error) {
    console.error('Error converting resume:', error.message);
    process.exit(1);
  }
}

convertResume();
