const fsf = require('fs');
const fs = require('node:fs/promises');
const express = require('express');
const archiver = require('archiver');
const crypto = require('crypto');
const unzipper = require('unzipper');

const port = 3000;
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/file_download', (req, res) => {
	const data = req.body;

	async function createFile() {

		try {

			const content_meta = JSON.stringify(data.meta_info);
			const content_document = JSON.stringify(data.document_info);

			const randomBytes = crypto.randomBytes(9);
			let dir = 'tmp_'.concat(randomBytes.toString('base64').slice(0, 12).replace(/\//g, '-'));

			if (!fsf.existsSync(dir)){ fsf.mkdirSync(dir); }

			await fs.writeFile(path.join('.' , dir ,  'meta.json'), content_meta, { flag: 'w' });
			await fs.writeFile(path.join('.', dir ,  'document.json'), content_document, { flag: 'w' });

			const archive = archiver('zip', { zlib: { level: 9 } });

			res.setHeader('Content-Type', 'application/zip');
			res.setHeader('Content-Disposition', 'attachment; filename="document.ptd"');

			archive.append(fsf.createReadStream(path.join('.' , dir ,  'meta.json')), { name: 'meta.json' });
			archive.append(fsf.createReadStream(path.join('.' , dir ,  'document.json')), { name: 'document.json' });

			archive.pipe(res);

			return new Promise((resolve, reject) => {
				archive.on('close', () => {
					fsf.rmSync(dir, { recursive: true });
					resolve();
				});
				archive.on('error', reject);
				archive.finalize();
			});

		} catch (err) {
			res.status(500).json({ msg: `Error: "${err}"` });
			console.log(err);
		}

	}

	createFile();

});

app.post('/api/file_reader', express.raw({ type: 'application/octet-stream', limit: '10mb' }), async (req, res) => {
    let dir;

    try {

        const randomBytes = crypto.randomBytes(9);
        dir = 'tmp_'.concat(randomBytes.toString('base64').slice(0, 12).replace(/\//g, '-'));

        if (!fsf.existsSync(dir)) {
            fsf.mkdirSync(dir);
        }

        const tempZipPath = path.join(dir, 'temp.zip');
        await fs.writeFile(tempZipPath, req.body);

        const extractPath = path.join(dir, 'extracted');
        await fs.mkdir(extractPath);

        await new Promise((resolve, reject) => {
            fsf.createReadStream(tempZipPath)
                .pipe(unzipper.Extract({ path: extractPath }))
                .on('close', resolve)
                .on('error', reject);
        });

        const metaContent = JSON.parse(
            await fs.readFile(path.join(extractPath, 'meta.json'), 'utf8')
        );
        const documentContent = JSON.parse(
            await fs.readFile(path.join(extractPath, 'document.json'), 'utf8')
        );

        const response = {
            meta_info: metaContent,
            document_info: documentContent
        };

        fsf.rmSync(dir, { recursive: true });
        res.json(response);

    } catch (err) {

        if (dir && fsf.existsSync(dir)) {
            fsf.rmSync(dir, { recursive: true });
        }
        res.status(400).json({
            msg: `Error: ${err.message}`,
            error: true
        });
        console.error(err);

    }

});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.listen(port, () => { console.log(`Running on http://localhost:${port}`); });
