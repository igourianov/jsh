const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');
const { PDFDocument } = require('pdf-lib');

// Get input file path, target output path, name, and title from command line arguments
const inputPath = process.argv[2];
const outputPath = process.argv[3];
const authorName = process.argv[4];
const title = process.argv[5];
const seoPath = path.join(__dirname, '..', 'seo.txt');
  // Generate metadata text
const titleText = `${authorName} - ${title} Resume`;

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
  } catch (error) {
    // Silent failure - continue without keywords
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
    const pdf = await mdToPdf(
      { path: inputPath },
      pdfOptions
    );

    if (pdf) {
      // Load the generated PDF
      const pdfDoc = await PDFDocument.load(pdf.content);

      // Set metadata with keywords
      pdfDoc.setTitle(titleText);
      pdfDoc.setAuthor(authorName);
      pdfDoc.setSubject(titleText);
      pdfDoc.setKeywords([keywords]);
      pdfDoc.setProducer('md-to-pdf with pdf-lib');
      pdfDoc.setCreator('md-to-pdf');
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      // Save with metadata
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);

      console.log(`✓ PDF generated: ${outputPath}`);
    }
  } catch (error) {
    process.exit(1);
  }
}

convertToPdf();
