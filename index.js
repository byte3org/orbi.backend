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

const User = require('./api/models/users')

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

// authorization
app.use(async (req, res, next) => {
	/*try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed'
		});
	}*/
	let name = "Seniru"
	let user = await User.findOne({ name }).exec()
	//if (!user) return res.status(404).json({ 'message': 'User not found' })
	req.body.user = user
	next()
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