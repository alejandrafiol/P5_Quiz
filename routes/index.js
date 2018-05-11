// Crear aplicación Express.
var express = require('express');

//Rutas
//MiddleWare: function(req, res, next)
//Los MW se instalan usando:
var router = express.Router();

//para tener la BBDD
const Sequelize = require('sequelize');
const {models} = require("../models/index.js");

//Los MW se instalan asociandolos a un path y a método HTTP
// router.get(path, MW);

/* GET home page. */
// router.get(path, MW);
// res.render('users/show’, {user, title})----Crea una pag html con vista y opciones y la envia al cliente.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET credits page: Renderiza la vista ejs de la pagina de créditos */
router.get('/credits', function(req, res, next) {
  res.render('Credits', { title: 'Credits' });
});

//El fichero routes/index.js debe importar el modelo y añadir 
//la acción del controlador (MW que atiende a GET /quizzes). 
//Este MW busca primero todos los quizzes con quizzes.findAll() y luego 
//renderiza la vista ejs de la página de créditos.

router.get('/quizzes', (req, res, next) => {

	models.quiz.findAll()
	.then(quizzes =>{

	
		res.render('quizzes/index', {quizzes});
		
	})
	.catch(error => {
		next(error);
	});
});


module.exports = router;
