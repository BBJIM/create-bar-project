var path = require('path');
var express = require('express');

var DIST_DIR = path.join(__dirname, '..', 'build');
var PORT = 3000;
var app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get('*', function (_req, res) {
	res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT);
console.log(`site is on http://localhost:${PORT}`);
