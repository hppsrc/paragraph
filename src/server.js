const fsf = require('fs');
const fs = require('node:fs/promises');
const express = require('express');
const archiver = require('archiver');
const crypto = require('crypto');

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

			// const content = JSON.stringify(data);
			const content_meta = JSON.stringify(data.meta_info);
			const content_document = JSON.stringify(data.document_info);

			const randomBytes = crypto.randomBytes(9);
			let dir = 'tmp_'.concat(randomBytes.toString('base64').slice(0, 12).replace(/\//g, '-'));

			if (!fsf.existsSync(dir)){ fsf.mkdirSync(dir); }

			await fs.writeFile(path.join('.' , dir ,  'meta.json'), content_meta, { flag: 'w' }, err => { res.json({ msg: `Error: "${err}"` }) });
			await fs.writeFile(path.join('.', dir ,  'document.json'), content_document, { flag: 'w' }, err => { res.json({ msg: `Error: "${err}"` }) });

			const archive = archiver('zip', { zlib: { level: 9 } });

			archive.append(fsf.createReadStream(path.join('.' , dir ,  'meta.json')), { name: 'meta.json' });
			archive.append(fsf.createReadStream(path.join('.' , dir ,  'document.json')), { name: 'document.json' });

			archive.pipe(res)

			return new Promise((resolve, reject) => {
				archive.on('close', () => {
					fsf.rmSync(dir, { recursive: true });
					resolve();
				});
				archive.on('error', reject);
				archive.finalize();
			});

		} catch (err) {

			res.json({ msg: `Error: "${err}"` });
			console.log(err);

		}

	}

	createFile();

});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.listen(port, () => { console.log(`Running on http://localhost:${port}`); });
