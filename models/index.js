// Importar sequelize.js
const Sequelize = require('sequelize');

// Define que SGBDR utiliza (sqlite) y el fichero 
//donde sqlite guardará los datos (quizzes.sqlite).
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging : false});

//ahora definimos sequelize segun un modelo/campos que rellenan la tabla quizzes
//La cual se compone de preguntas y respuestas
sequelize.define('quiz', {
    question: {
    	//Las preguntas son cadenas de string
        type: Sequelize.STRING,
        //cada pregunta es unica
        unique: {msg: "Ya existe esta pregunta"},
        //para que no se puedan crear preguntas vacias
        validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
    },
    answer: {
    	//Las respuestas son cadenas de string
        type: Sequelize.STRING,
        //para que no se puedan crear preguntas vacias
        validate: {notEmpty: {msg: "La respuesta no puede estar vacia"}}
    }
});

//Ahora tenemos que sincronizar la BBDD (con sync()) 
//e inicializarla con bulkCreate(..)

//sync() sincroniza la BBDD en quizzes.sqlite 
//con la estructura de tablas definida en sequelize
sequelize.sync()

//count() devuelve el número de registros (filas) de la tabla sequelize
//Dentro de la propiedad model accedo al modelo quiz??
.then(() => sequelize.models.quiz.count())

//ya con lo que nos ha devuelto count() hago cosas 
.then(count => {
	//si la cuenta es cero creo con bulkCreate() los quizzes que yo quiera
	if(!count){
		return sequelize.models.quiz.bulkCreate([
            {question: "Capital de Italia", ansquer: "Roma"},
            {question: "Capital de Francia", ansquer: "Paris"},
            {question: "Capital de España", ansquer: "Madrid"},
            {question: "Capital de Portugal", ansquer: "Lisboa"},
        ]);
    }
})

// Muestra errores o excepciones
.catch(error => {
		console.log(error);
	});

	module.exports = sequelize;

