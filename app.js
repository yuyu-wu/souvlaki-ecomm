const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const Product = require('./models/product');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Cart = require('./models/cart');
const res = require('express/lib/response')

// mongoose
// 	.connect('mongodb://localhost:27017/souvlaki')
// 	.then(() => {
// 		console.log('Mongo connection open!');
// 	})
// 	.catch((err) => {
// 		console.log('Oh no Mongo connection error!');
// 		console.log(err);
// 	});

// mongoose.connection.on('error', (err) => {
// 	console.log('Error after initial connection established!');
// 	console.log(err);
// });

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
	secret: 'thisshouldbeabettersecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true, // is set to true by default. It's for security
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 七天后expire。根据express-session docs可以不用设置expires. See https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291772#questions/14082924
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};
app.use(session(sessionConfig));

// https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/21990070#questions/16800402
app.use(passport.initialize()); // https://github.com/jaredhanson/passport/#middleware
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // See passport-local-mongoose docs. 511. 2:53 原理
passport.serializeUser(User.serializeUser()); // tell passport how to serialize a user (serialization: how we store a user in a session)
passport.deserializeUser(User.deserializeUser()); // how to get a user out of the session

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/ordernow', (req, res) => {
	// const products = await Product.find({});
	res.render('ordernow')
});

app.get('/menu', (req, res) => {
	// const products = await Product.find({});
	res.render('menu')
});

app.get('/ourstory', (req, res) => {
	res.render('ourstory');
});

app.get('/login', (req, res) => {
	res.render('users/login');
});

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
	// const
	res.redirect('/');
});

app.get('/logout', (req, res, next) => {
	req.logout(function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
		console.log('LOGGED OUT!');
	});

});

app.get('/register', (req, res) => {
	res.render('users/register');
});

app.post('/register', async (req, res) => {
	const { username, password, email } = req.body;
	const user = new User({ username, email });
	const registeredUser = await User.register(user, password);
	// console.log(registeredUser)
	res.redirect('/');
});



app.get('/shoppingcart', (req, res) => {
	res.render('shoppingcart');
});







// app.use((err, req, res, next) => {
// 	const { statusCode = 500 } = err;
// 	if (!err.message) err.message = 'Oh no something went wrong!';
// 	res.status(statusCode).render('error', { err });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}!`);
});
