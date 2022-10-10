const productsContainer = document.querySelector('.products-container')
const total = document.querySelector('.total-price')

let basket = JSON.parse(localStorage.getItem("cartItems")) || [];

const calculation = () => {
    const cartCount = document.querySelector('#cartCount');

    cartCount.innerHTML = basket.map(item => item.inCart).reduce((x, y) => x + y, 0);
}

calculation();

const generateCartPage = () => {
    if (basket.length) {
        return (productsContainer).innerHTML = basket.map(item => {
            const {id, inCart} = item;
            const search = products.find(searchedItem => searchedItem.id === id) || [];
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
        }).join('');
    } else {
        total.innerHTML = '';
        productsContainer.innerHTML = `
            <h3 class="no-items">There are no items in your shopping cart</h3>
            <a href="/ordernow"><button class="start-to-order">Start to Order</button></a>
        `
    }
}

generateCartPage();

const increment = (id) => {
    const selectedProduct = id;
    const search = basket.find(item => item.id === selectedProduct.id)
    if (!search) {
        basket.push({
            id: selectedProduct.id,
            inCart: 1
        })
    } else {
        search.inCart += 1;
    }

    generateCartPage();  // so when we increment the item amount, the page will rerender, the inCart * search.price will work
    localStorage.setItem('cartItems', JSON.stringify(basket));

    update(selectedProduct.id);
}

const decrement = (id) => {
    const selectedProduct = id;
    const search = basket.find(item => item.id === selectedProduct.id);

    if (!search) {
        return;
    } else if (search.inCart === 0) {
        return;
    } else {
        search.inCart -= 1;
    }

    update(selectedProduct.id);

    basket = basket.filter(item => item.inCart !== 0);

    generateCartPage();
    localStorage.setItem('cartItems', JSON.stringify(basket));
}

const update = (id) => {
    const search = basket.find(item => item.id === id);

    document.getElementById(id).innerHTML = search.inCart;
    
    calculation();
    totalPrice();
}

const removeItem = (id) => {
    const selectedItem = id;
    // console.log(selectedItem)
  
    basket = basket.filter(item => item.id !== selectedItem.id);
    localStorage.setItem('cartItems', JSON.stringify(basket));
    totalPrice();
    generateCartPage();
    
}

const totalPrice = () => {
    if (basket.length) {
        const amount = basket.map(item => {
            const {id, inCart} = item;
            const search = products.find(searchedItem => searchedItem.id === id) || [];

            return inCart * search.price;
        }) 
        .reduce((x, y) => x + y, 0);

        total.innerHTML = `
            <h3 class="cart-total">Total: $${amount}</h3>
            <button class="checkout">Checkout</button>
        `
    } else return;
}

totalPrice();



