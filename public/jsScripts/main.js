const menuContainer = document.querySelector('.menu-container');
// console.log(menuContainer)


let basket = JSON.parse(localStorage.getItem("cartItems")) || [];

let generateMenuPage = () => {
    return (menuContainer.innerHTML = products.map(product => {
        let {name, id, ingredients, price, image} = product;
        // console.log(product.id)
        let search = basket.find(x => x.id === id) || [];  
        return `
        <div class="menu-item" id="product-id-${id}">
            <img src="${image}" alt="">
            <div class="menu-text">
                <div class="item-titles">
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

let increment = (id) => {
    // // console.log(id);
    // let selectedProduct = id[1];
    // // console.log(selectedProduct)
    // // console.log(selectedProduct.id)
    // let search = basket.find((x) => x.id === selectedProduct.id);
    
    // if (search === undefined) {
    //     basket.push({
    //         id: selectedProduct.id,
    //         inCart: 1
    //     });
    // } else {
    //     search.inCart = search.inCart + 1;
    // }
    // console.log(basket);
    // // update(selectedProduct.id);

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

    localStorage.setItem('cartItems', JSON.stringify(basket));

    update(selectedProduct.id);
}

let decrement = (id) => {
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

    localStorage.setItem('cartItems', JSON.stringify(basket));
}

let update = (id) => {
    // console.log(id)
    let search = basket.find(x => x.id === id);
    // console.log(search.inCart)
    const selected = document.getElementById(id).innerHTML = search.inCart;;
    // console.log(selected)
    calculation();
}

let calculation = () => {
    // console.log('calculation function running!')
    let cartCount = document.querySelector('#cartCount')
    // cartCount.innerHTML = 100;
    // console.log(basket.map(x => x.inCart).reduce((x, y) => x + y, 0))
    cartCount.innerHTML = basket.map(x => x.inCart).reduce((x, y) => x + y, 0);
}

calculation();