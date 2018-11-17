const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const sighnin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '',
		user: '',
		password: '',
		database: ''
	}
});

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => { res.json('Root Page'); });

//Sign IN
app.post('/signin', (req, res) => { sighnin.handleSignin(req, res, db, bcrypt) });

//Register (dependency injecshen) 
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//User ID
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

// User Image add PUT
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});