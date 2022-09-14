
const productsContainer = document.querySelector('.products-container')
const total = document.querySelector('.total-price')

let basket = JSON.parse(localStorage.getItem("cartItems")) || [];

let calculation = () => {
    let cartCount = document.querySelector('#cartCount');

    cartCount.innerHTML = basket.map(x => x.inCart).reduce((x, y) => x + y, 0);
}

calculation();

const generateCartPage = () => {
    if (basket.length) {
        // console.log('basket not empty!')
        return (productsContainer).innerHTML = basket.map(x => {
            // console.log(x);
            const {id, inCart} = x;
            const search = products.find(y => y.id === id) || [];
            return `
                <div class="cart-product">
                    <img src="${search.image}">
                    <div class="menu-text">
                        <div>
                            <h3 class="ïtem-name">${search.name}</h3>
                            <p>${search.ingredients}</P>
                        </div>
                        <h4 class="price">$${search.price}</h4>
                        <h4 class="amount">
                            <i class="fa-solid fa-minus decrement" onclick="decrement(${id})"></i>
                            <span id=${id} class="quantity">${inCart}</span>
                            <i class="fa-solid fa-plus increment" onclick="increment(${id})"></i>
                        </h4>
                    </div>

                    <div class="item-price-remove">
                        <div class="item-price">$${search.price * inCart}</div>
                        <div class="remove-button">
                            <i class="fa-solid fa-trash-can" onclick="removeItem(${id})"></i>
                        </div>
                    </div>
                </div>
            `
        }).join('')
    } else {
        // console.log('basket is empty!')
        total.innerHTML = '';
        productsContainer.innerHTML = `
            <h3 class="no-items">There are no items in your shopping cart</h3>
            <a href="/ordernow"><button class="start-to-order">Start to Order</button></a>
        `

    }
}

generateCartPage();

const increment = (id) => {
    let selectedProduct = id;
    let search = basket.find(x => x.id === selectedProduct.id)
    if (search === undefined) {
        basket.push({
            id: selectedProduct.id,
            inCart: 1
        })
    } else {
        search.inCart += 1;
    }
    // console.log(basket);
    generateCartPage();  // so when we increment the item amount, the page will rerender, the inCart * seacth.price will work

    localStorage.setItem('cartItems', JSON.stringify(basket));

    update(selectedProduct.id);
}

const decrement = (id) => {
    let selectedProduct = id;
    let search = basket.find(x => x.id === selectedProduct.id)

    if (!search) {
        return;
    } else if (search.inCart === 0) {
        return;
    } else {
        search.inCart -= 1;
    }
    // console.log(basket);
    update(selectedProduct.id);

    basket = basket.filter(x => x.inCart !== 0);

    generateCartPage();
    localStorage.setItem('cartItems', JSON.stringify(basket));
}

const update = (id) => {
    // console.log(id)
    let search = basket.find(x => x.id === id);
    // console.log(search.inCart)
    const selected = document.getElementById(id).innerHTML = search.inCart;;
    // console.log(selected)
    calculation();
    totalPrice();
}

const removeItem = (id) => {
    const selectedItem = id;
    // console.log(selectedItem)
    // console.log('To be deleted!')
    basket = basket.filter(x => x.id !== selectedItem.id);
    localStorage.setItem('cartItems', JSON.stringify(basket));
    totalPrice();
    generateCartPage();
    
}

const totalPrice = () => {
    if (basket.length) {
        const amount = basket.map(x => {
            const {inCart, id} = x;
            const search = products.find(y => y.id === id) || [];

            return inCart * search.price;
        }) 
        .reduce((x, y) => x + y, 0);
        // console.log(total);
        total.innerHTML = `
        <h3 class="cart-total">Total: $${amount}</h3>
        <button class="ripple checkout">Checkout</button>
        `
    } else return;
}

totalPrice();



