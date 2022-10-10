const menuContainer = document.querySelector('.menu-container');

// Array of items in shopping cart
let basket = JSON.parse(localStorage.getItem("cartItems")) || [];

const generateMenuPage = () => {
    return (menuContainer.innerHTML = products.map(product => {
        // Products in menu
        const {name, id, ingredients, price, image} = product;
        
        // Check if the product is the product in the basket array
        const search = basket.find(item => item.id === id) || [];  
        
        return `
        <div class="menu-item" id="product-id-${id}">
            <img src="${image}" alt="">
            <div class="menu-text">
                <div class="item-description">
                    <h3>${name}</h3>
                    <p>${ingredients}</p>
                </div>
                <h4 class="price">$${price}</h4>
            </div>
            <div class="buttons">
                <i class="fa-solid fa-minus decrement" onclick="decrement(${id})"></i>
                <span class="quantity" id="${id}">${search.inCart === undefined ? 0 : search.inCart}</span>
                <i class="fa-solid fa-plus increment" onclick="increment(${id})"></i>
            </div>
        </div>
        `
    }).join(''));
    
}

generateMenuPage();

const increment = (id) => {
    // console.log(id)
    const selectedProduct = id;
    const search = basket.find(item => item.id === selectedProduct.id);

    if (!search) {
        basket.push({
            id: selectedProduct.id,
            inCart: 1
        })
    } else {
        search.inCart += 1;
    }

    localStorage.setItem('cartItems', JSON.stringify(basket));

    update(selectedProduct.id);
}

const decrement = (id) => {
    const selectedProduct = id;
    const search = basket.find(item => item.id === selectedProduct.id)

    if (!search) {
        return;
    } else if (search.inCart === 0) {
        return;
    } else {
        search.inCart -= 1;
    }

    update(selectedProduct.id);

    // Remove product in the cart if its inCart number is zero
    basket = basket.filter(item => item.inCart !== 0);

    localStorage.setItem('cartItems', JSON.stringify(basket));
}

const update = (id) => {
    // console.log(id)
    const search = basket.find(item => item.id === id);
    // console.log(search.inCart)
    document.getElementById(id).innerHTML = search.inCart;;
    calculation();
}

const calculation = () => {
    const cartCount = document.querySelector('#cartCount')
    // console.log(basket.map(item => item.inCart))
    cartCount.innerHTML = basket.map(item => item.inCart).reduce((x, y) => x + y, 0);
}

calculation();