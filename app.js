const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/ordernow', (req, res) => {
	res.render('ordernow')
});

app.get('/menu', (req, res) => {
	res.render('menu')
});

app.get('/ourstory', (req, res) => {
	res.render('ourstory');
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
