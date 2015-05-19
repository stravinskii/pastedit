// REST API
var express = require('express');
var app = express();
var port = 9000 || process.env.PORT;
var router = express.Router();
var bodyParser = require('body-parser');

// POST requests parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database
var mysql = require('mysql');
var db = mysql.createConnection({
	port: '3307',
	host: '127.0.0.1',
	user: 'pastedit',
	password: 'pastedit',
	database: 'pastedit'
});
db.connect();

// CRUD códigos
router.post('/codigo/', function (req, res){
	console.log("POST /codigo");
	var lenguaje = req.body.lenguaje;
	var nombre = req.body.nombre;
	var codigo = req.body.codigo;
	console.log(lenguaje);
	console.log(nombre);
	console.log(codigo);
	db.query(
		'INSERT INTO codigos (idlenguaje, nombre, codigo) VALUES (?, ?, ?)',
		[lenguaje, nombre, codigo], 
		function (err, result) {
			if (err) { res.status(404).end(); };
			res.json(result.insertId);
			res.end();
		}
	);
});
router.get('/codigo/:idcodigo([0-9]+)', function (req, res){
	console.log("GET /codigo");
	var idcodigo = req.params.idcodigo;
	db.query(
		'SELECT * FROM codigos WHERE idcodigo = ?',
		[idcodigo],
		function (err, results) {
			if (err) { res.status(404).end() };
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
			if (result.changedRows > 0) {
				res.json(idcodigo);
				res.end();
			} else {
				res.status(404).end();
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
			if (result.changedRows) {
				res.json(true);
				res.end();
			} else {
				res.status(404).end();
			}
		}
	);
});

// Listar códigos
router.get('/codigos/', function (req, res){
	// usuario en sesión?
});

// Buscar códigos
router.get('/codigos/buscar/', function (req, res){
	// Filtros
	// db.query(
	// 	'SELECT * FROM codigos WHERE'
	// );
});

// Login
router.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	db.query(
		'SELECT * FROM usuarios WHERE email = ? AND password = ?',
		[email, password],
		function (err, results) {
			res.json(results);
		}
	);
});
// Logout
router.get('/logout', function (req, res) {
	// Eliminar sesión
});

app.use('/api', router);
app.listen(port);
console.info("[OK] Server is up and running at port: %s", port);