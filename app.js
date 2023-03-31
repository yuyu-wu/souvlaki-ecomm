const express = require('express');
const app = express();
const path = require('path');  // comes with Node
const engine = require('ejs-mate');

app.engine('ejs', engine);
// Tell app to use ejs
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serving static assets
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/ordernow', (req, res) => {
	res.render('ordernow')
});

app.get('/ourstory', (req, res) => {
	res.render('ourstory');
});

app.get('/shoppingcart', (req, res) => {
	res.render('shoppingcart');
});

app.listen(3000, () => {
	console.log("Listening on 3000!");
});
