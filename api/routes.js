// REST API
var express = require('express');
var app = express();
var port = 9000 || process.env.PORT;
var router = express.Router();
var bodyParser = require('body-parser');
var	crypto = require('crypto');

// POST requests parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database
var mysql = require('mysql');
var db = mysql.createConnection({
	port: '3306',
	host: '127.0.0.1',
	user: 'pastedit',
	password: 'pastedit',
	database: 'pastedit'
});
db.connect();

// NGINX Proxy
app.set('trust proxy', true);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

router.get('/lenguajes/', function (req, res) {
	console.log("GET /lenguajes");
	db.query(
		'SELECT * FROM lenguajes',
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			res.json(results);
			res.end();
		}
	);
});

// CRUD códigos
router.post('/codigo/', function (req, res){
	console.log("POST /codigo");
	var lenguaje = req.body.lenguaje;
	var nombre = req.body.nombre;
	var codigo = req.body.codigo;
	db.query(
		'INSERT INTO codigos (idlenguaje, nombre, codigo) VALUES (?, ?, ?)',
		[lenguaje, nombre, codigo], 
		function (err, result) {
			if (err) { return res.sendStatus(404); };
			res.json(result.insertId);
			res.end();
		}
	);
});
router.get('/codigo/:idcodigo([0-9]+)', function (req, res){
	console.log("GET /codigo");
	var idcodigo = req.params.idcodigo;
	db.query(
		'SELECT * FROM codigos c INNER JOIN lenguajes l ON c.idlenguaje = l.idlenguaje WHERE idcodigo = ?',
		[idcodigo],
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			res.json(results);
			res.end();
		}
	);
});
router.put('/codigo/:idcodigo([0-9]+)', function (req, res){
	console.log("PUT /codigo");
	var idcodigo = req.params.idcodigo;
	var lenguaje = req.body.lenguaje;
	var nombre =  req.body.nombre;
	var codigo = req.body.codigo;
	db.query(
		'UPDATE codigos SET nombre = ?, codigo = ?, idlenguaje = ? WHERE idcodigo = ?',
		[nombre, codigo, lenguaje, idcodigo],
		function (err, result) {
			if (err) { return res.sendStatus(404); };
			if (result.changedRows > 0) {
				res.json(idcodigo);
				res.end();
			} else {
				return res.sendStatus(404);
			}
		}
	);
});
router.delete('/codigo/:idcodigo([0-9]+)', function (req, res){
	console.log("DELETE /codigo");
	var idcodigo = req.params.idcodigo;
	db.query(
		'DELETE FROM codigos WHERE idcodigo = ?', [idcodigo],
		function (err, result) {
			if (err) { return res.sendStatus(404); };
			if (result.affectedRows) {
				res.json(true);
				res.end();
			} else {
				return res.sendStatus(404);
			}
		}
	);
});

// Listar códigos
router.get('/codigos/', function (req, res){
	console.log('GET /codigos');
	db.query(
		'SELECT * FROM codigos c INNER JOIN lenguajes l ON c.idlenguaje = l.idlenguaje',
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			res.json(results);
			res.end();
		}
	);
});

// Buscar códigos
router.post('/codigos/buscar/', function (req, res){
	console.log('GET /codigos/buscar');
	var filtro = req.body.filtro,
		termino = req.body.termino;

	switch (filtro) {
		case '0': // Todo
			clause = "nombre LIKE '%"+termino+"%'";
			clause += " OR lenguaje LIKE '%"+termino+"%'";
			clause += " OR codigo LIKE '%"+termino+"%'";
		break;
		case '1': // Título
			clause = "nombre LIKE '%"+termino+"%'";
		break;
		case '2': // Lenguaje
			clause = "lenguaje LIKE '%"+termino+"%'";
		break; 
		case '3': // Código
			clause = "codigo LIKE '%"+termino+"%'";
		break;
		default:
			return res.sendStatus(404).end();
		break;
	}

	if (termino.length <= 0) {
		return res.json({
			error: 'Término de búsqueda vacío'
		}).end();
	}

	db.query(
		'SELECT * FROM codigos c INNER JOIN lenguajes l ON c.idlenguaje = l.idlenguaje WHERE ' + clause,
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			res.json(results).end();
		}
	);
});

// Login
router.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	db.query(
		'SELECT * FROM usuarios WHERE email = ? AND password = ?',
		[email, password],
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			if (results.length == 0) { return res.sendStatus(404); };

			var usuario = results[0];
			var current_date = (new Date()).valueOf().toString();
			var random = Math.random().toString();
			var hash = crypto.createHash('sha1')
			.update(current_date + random).digest('hex');
			
			db.query(
				'UPDATE usuarios SET hash = ? WHERE idusuario = ?',
				[hash, usuario.idusuario],
				function (err, result) {
					if (err) { return res.sendStatus(404); };
					if (result.changedRows <= 0) { return res.sendStatus(404); };
					res.send({
						hash: hash,
						nickname: usuario.nombre
					}).end();
				}
			);
		}
	);
});

// Session
router.post('/session', function (req, res) {
	console.log('POST /session');
	var hash = req.body.hash;
	db.query(
		'SELECT COUNT(*) AS count FROM usuarios WHERE hash = ?',
		[hash],
		function (err, results) {
			if (err) { return res.sendStatus(404); };
			var count = results[0].count;
			if (count != 1) {
				res.send({status: 500}).end();
			} else {
				res.send({status: 200}).end();
			}
		}
	);
});

// Logout
router.post('/logout', function (req, res) {
	console.log('POST /logout');
	var hash = req.body.hash;
	db.query(
		'UPDATE usuarios SET hash = NULL WHERE hash = ?',
		[hash],
		function (err, result) {
			if (err) { return res.sendStatus(404); };
			if (result.changedRows <= 0) { return res.sendStatus(404); };
			res.send(true).end();
		}
	);
});

app.use('/api', router);
app.listen(port);
console.info("[OK] Server is up and running at port: %s", port);
