require('dotenv').config()

const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 4444;
const mongo = process.env.MONGO

const planetRoutes = require('./api/routes/planets');
const destinationRoutes = require('./api/routes/destinations');
const userRoutes = require('./api/routes/users');

// import routes

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST', 'DELETE', 'GET');
		return res.status(200).json({});
	}
	next();
})

// routes
app.use('/planets', planetRoutes);
app.use('/destinations', destinationRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
	const error = new Error('NotFound');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		"error": {
			message: error.message
		}
	});
});


(async () => {
	await mongoose.connect(mongo)
	console.log("Connected to db")


	app.listen(port, () => {
		console.log("listening on port ", port);
	})
})()