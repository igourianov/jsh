import fs from 'fs';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';
import { PDFDocument } from 'pdf-lib';


async function convertToPdf(inputPath, outputPath, authorName, title) {

	// Assets live alongside the source md file in the pdf/ folder
	const pdfDir = path.dirname(inputPath);
	const assetsDir = path.join(pdfDir, 'assets');
	// Read keywords from seo.txt
	const seoContent = fs.readFileSync(path.join(assetsDir, 'seo.txt'), 'utf8');
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
