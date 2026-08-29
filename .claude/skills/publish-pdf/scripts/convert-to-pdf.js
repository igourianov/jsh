import path from 'path';
import { mdToPdf } from 'md-to-pdf';


async function convertToPdf(inputPath, outputPath, header) {

	// Assets live alongside the source md file in the pdf/ folder
	const assetsDir = path.join(path.dirname(inputPath), 'assets');

	// Configure PDF options
	const pdfOptions = {
		dest: outputPath,
		// Without this the PDF title falls back to the temp file's localhost URL
		document_title: header,
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

	// md-to-pdf writes the file itself when dest is set
	await mdToPdf(
		{ path: inputPath },
		pdfOptions
	);
}

convertToPdf(process.argv[2], process.argv[3], process.argv[4])
	.then(() => {
		process.exit(0);
	})
	.catch(error => {
		console.error('PDF generation failed:', error.message);
		process.exit(1);
	});
