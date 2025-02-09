const fs = require('node:fs/promises');
const express = require('express');
const archiver = require('archiver');

const port = 3000;
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/file_download', (req, res) => {
	const data = req.body;

    // console.log("\n--- NEW DATA ---");
    // console.log(data);
    // console.log("--- END DATA ---");

	async function createFile() {

		try {

			const content = JSON.stringify(data);
			const content_meta = JSON.stringify(data.meta_info);
			const content_document = JSON.stringify(data.document_info);
			// const content = data.document_info.content;
			// let clean = content;

			// if (content.startsWith('"') && content.endsWith('"')) { clean = content.substring(1, content.length - 1); }

			const filePath = path.join('.' , 'meta.json');
			await fs.writeFile(filePath, content_meta, { flag: 'w' }, err => { res.json({ msg: `Error: "${err}"` }) });
			const filePath_doc = path.join('.', 'document.json');
			await fs.writeFile(filePath_doc, content_document, { flag: 'w' }, err => { res.json({ msg: `Error: "${err}"` }) });

			// res.setHeader('Content-Disposition', 'attachment; filename="document.txt"');
			// res.setHeader('Content-Type', 'text/plain');

			res.send(content);
			// res.send(clean);

			// res.json({ msg: "Data OK!" });

		} catch (err) {

			res.json({ msg: `Error: "${err}"` });
		  	console.log(err);

		}

	}

	createFile();

});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.listen(port, () => { console.log(`Running on http://localhost:${port}`); });
