const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/file_download', (req, res) => {
	const data = req.body;

    console.log("--- NEW DATA): ---");
    console.log(data);
    console.log("--- END DATA ---");

    res.json({ mensaje: "Data ok!" });
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`Running on http://localhost:${port}`);
});
