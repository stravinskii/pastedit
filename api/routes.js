// REST API
var express = require('express');
var app = express();
var port = process.env.PORT || 9000;
var router = express.Router();

// Database
var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	user: 'pastedit',
	password: 'pastedit'
});

db.connect();

db.query('SELECT * FROM pastes', function(err, rows, fields) {
	if (err) throw err;
	
});

router.get('/pastes', function(req, res) {

	res.json({list: 'lista de todos los pastes'});
});

app.use('/api', router);

app.listen(port);
