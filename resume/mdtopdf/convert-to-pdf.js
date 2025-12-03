const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');
const { PDFDocument } = require('pdf-lib');

// Get input file from command line argument
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Usage: node convert-to-pdf.js <markdown-file>');
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputPath = inputPath.replace(/\.md$/, '.pdf');
const seoPath = path.join(__dirname, '..', 'seo.txt');

async function convertToPdf() {
  // Read keywords from seo.txt
  let keywords = '';
  try {
    const seoContent = fs.readFileSync(seoPath, 'utf8');
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
    console.log(`Converting ${path.basename(inputPath)} to PDF...`);
    const pdf = await mdToPdf(
      { path: inputPath },
      pdfOptions
    );

    if (pdf) {
      // Load the generated PDF
      const pdfDoc = await PDFDocument.load(pdf.content);

      // Set metadata with keywords
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

      console.log(`✓ PDF generated successfully!`);
      console.log(`  Output: ${outputPath}`);
      console.log(`  Keywords embedded: ${keywords.length} characters`);
    }
  } catch (error) {
    console.error('Error converting to PDF:', error.message);
    process.exit(1);
  }
}

convertToPdf();
