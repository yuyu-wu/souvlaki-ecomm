const mongoose = require('mongoose');
const Product = require('../models/product');

mongoose
	.connect('mongodb://localhost:27017/souvlaki')
	.then(() => {
		console.log('Mongo connection open!');
	})
	.catch((err) => {
		console.log('Oh no Mongo connection error!');
		console.log(err);
	});

mongoose.connection.on('error', (err) => {
	console.log('Error after initial connection established!');
	console.log(err);
});

const productsArray = [
    {
        name: 'Chicken Pita',
        tag: 'chickenpita',
        price: 9.5,
        inCart: 0,
        ingredients: 'Tomatoes, onions, oregano chips, signature mayo',
        image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NzQyMDYyMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
        name: 'Lamb Pita',
        tag: 'lambpita',
        price: 11,
        inCart: 0,
        ingredients: 'Tomatoes, onions, oregano chips, tzatziki',
        image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NzQyMDYyMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'
    },
    {
        name: 'Mixed Chicken & Lamb Pita',
        tag: 'chickenlambpita',
        price: 10.5,
        inCart: 0,
        ingredients: 'Tomatoes, onions, chips, a choice of tzatiki or mayo'
    },
    {
        name: 'Traditional Pita',
        tag: 'traditionalpita',
        price: 9.5,
        inCart: 0,
        ingredients: 'Chicken, tomatoes, onions, lettuce, tzatziki'
    },
    {
        name: 'Special Pita',
        tag: 'specialpita',
        price: 10.5,
        inCart: 0,
        ingredients: 'Chicken, tomatoes, onions, lettuce, hot chilli peppers, chips, mayo'
    },
    {
        name: 'Meat Lovers Pita',
        tag: 'meatloverspita',
        price: 10.5,
        inCart: 0,
        ingredients: 'Chicken, onions, kaseri cheese, oregano chips, signature smokey barbecue sauce'
    },
    {
        name: 'Vegan Lovers Pita',
        tag: 'veganloverspita',
        price: 10.5,
        inCart: 0,
        ingredients: 'Smokey eggplant, tomatoes, onions, lettuce, roasted red peppers, chips, Kalamata olives'
    },
    {
        name: 'The Greek Pack',
        tag: 'greekpack',
        price: 10,
        inCart: 0,
        ingredients: 'Chicken with crispy oregano chips, a choice of our signature mayo or tzatziki'
    },
    {
        name: 'Salad Pack',
        tag: 'saladpack',
        price: 11.5,
        inCart: 0,
        ingredients: 'Chicken tossed in chopped lettuce, tomatoes, onions, cucumber, feta, Kalamata olives'
    },
    {
        name: 'Oregano Chips',
        tag: 'oreganochips',
        price: 3.5,
        inCart: 0,
        ingredients: 'Hot chilli peppers, oregano chips, crumbled feta in wraps'
    },
    {
        name: 'Homemade Baklava',
        tag: 'baklava',
        price: 4.5,
        inCart: 0,
        ingredients: ''
    },
    {
        name: 'Homemade Touloumba',
        tag: 'touloumba',
        price: 4,
        inCart: 0,
        ingredients: ''
    },
    {
        name: 'Housemade Loukoumades',
        tag: 'loukoumades',
        price: 1.5,
        inCart: 0,
        ingredients: ''
    },
    {
        name: 'Greek Coffee',
        tag: 'greekcoffee',
        price: 3.5,
        inCart: 0,
        ingredients: ''
    },
    {
        name: 'Greek Soft Drinks',
        tag: 'softdrinks',
        price: 3,
        inCart: 0,
        ingredients: ''
    }
]

const seedDb = async () => {
    await Product.deleteMany();
    for (let i = 0; i < productsArray.length; i++) {
        const product = new Product({
            title: `${productsArray[i].name}`,
            ingredients: `${productsArray[i].ingredients}`,
            price: `${productsArray[i].price}`,
            image: `${productsArray[i].image}`,
        })
        await product.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})