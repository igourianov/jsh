const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');
const { PDFDocument } = require('pdf-lib');


async function convertToPdf(inputPath, outputPath, authorName, title) {

	// Get input file path, target output path, name, and title from command line arguments
	const baseResumeDir = path.join(__dirname, '..', '..', '..', '..', 'resume');
	const assetsDir = path.join(baseResumeDir, 'assets');
	const seoPath = path.join(assetsDir, 'seo.txt');

	// Read keywords from seo.txt
	const seoContent = fs.readFileSync(seoPath, 'utf8');
	const keywords = seoContent.split('\n')
		.map(line => line.trim())
		.filter(line => line.length > 0);

	// Configure PDF options
	const pdfOptions = {
		stylesheet: [path.join(assetsDir, 'markdown.css')],
		pdf_options: {
			format: 'Letter',
			margin: {
				top: '15mm',
				right: '20mm',
				bottom: '15mm',
				left: '20mm'
			},
			printBackground: false,
			displayHeaderFooter: false
		},
		//stylesheet_encoding: 'utf-8'
	};

	const pdf = await mdToPdf(
		{ path: inputPath },
		pdfOptions
	);

	if (pdf) {
		// Load the generated PDF
		const pdfDoc = await PDFDocument.load(pdf.content);

		// Set metadata with keywords
		pdfDoc.setTitle(`${authorName} - ${title} Resume`);
		pdfDoc.setAuthor(authorName);
		pdfDoc.setKeywords(keywords);
		pdfDoc.setCreator('md-to-pdf, pdf-lib');
		pdfDoc.setCreationDate(new Date());
		pdfDoc.setModificationDate(new Date());

		// Save with metadata
		const pdfBytes = await pdfDoc.save();
		fs.writeFileSync(outputPath, pdfBytes);
	}

	return outputPath;
}

convertToPdf(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
	.then(outFile => {
		console.log(`✓ PDF generated: ${outFile}`);
		process.exit(0);
	})
	.catch(error => {
		console.error('PDF generation failed:', error.message);
		process.exit(1);
	});
