const express = require('express');
const archiver = require('archiver');
const unzipper = require('unzipper');
const path = require('path');
const { Readable } = require('stream');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/file_download', (req, res) => {
    const data = req.body;

    async function createFileInMemory() {

        try {

            const content_meta = JSON.stringify(data.meta_info);
            const content_document = JSON.stringify(data.document_info);

            const archive = archiver('zip', { zlib: { level: 9 } });

            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', `attachment; filename="${data.meta_info.documentTitle || 'document'}.ptd"`);

            archive.append(Buffer.from(content_meta), { name: 'meta.json' });
            archive.append(Buffer.from(content_document), { name: 'document.json' });

            archive.pipe(res);

            archive.finalize();

        } catch (err) {

            console.error('Error creating file:', err);
            res.status(500).json({ msg: `Error: "${err.message}"`, error: true });

        }
    }

    createFileInMemory();

});

app.post('/api/file_reader', express.raw({ type: 'application/octet-stream', limit: '10mb' }), async (req, res) => {

    try {

        const fileBuffer = req.body;
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        let metaContent, documentContent;

        const directory = await unzipper.Open.buffer(fileBuffer);

        for (const file of directory.files) {

            if (file.path === 'meta.json') {

                const content = await file.buffer();
                metaContent = JSON.parse(content.toString());

            } else if (file.path === 'document.json') {

                const content = await file.buffer();
                documentContent = JSON.parse(content.toString());

            }

        }

        if (!metaContent || !documentContent) {
            throw new Error('Invalid .ptd file format. Missing required files.');
        }

        const response = {
            meta_info: metaContent,
            document_info: documentContent
        };

        res.json(response);

    } catch (err) {

        console.error('Error reading file:', err);
        res.status(400).json({
            msg: `Error: ${err.message}`,
            error: true
        });

    }

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => { console.log(`Running on http://localhost:${port}`); });
