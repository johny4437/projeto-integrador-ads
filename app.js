// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
// cart
let cart = [];
// buttons
let buttonsDOM = [];
// getting products
class Products{
    async getProducts(){
       try {
           let results= await fetch('products.json');
           let data = await results.json();
           let products = data.items;
           products = products.map(item=>{
               const {title, price} = item.fields;
               const {id} = item.sys;
               const img = item.fields.image.fields.file.url;
               return{title, price, id, img};
           })
           return products;
       } catch (error) {
           console.log(error);
           
       } 
    }

}
// display products
class UI{
displayProducts(products){
    let result = '';
    products.forEach(product => {
        result += `
        <!--Single Product-->
        <article class="product">
            <div class="img-container">
                <img src=${product.img} alt="product"
                class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i> 
                    adicionar ao carrinho
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price},00</h4>
        </article>
    <!-- END of Single Product-->
        
        `;
    });
    productsDOM.innerHTML = result;
}
    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttons.forEach(button=>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id == id);
            if(inCart){
                button.innerText ="No carrinho";
                button.disabled = true;
            }
                button.addEventListener("click", event=>{
                    event.target.innerText = "No Carrinho";
                    event.target.disabled = true;
                    // get product from Products
                    let cartItem = {...Storage.getProduct(id), amount:1};
                    // add products to the cart
                    cart = [...cart, cartItem];
                    // save cart on local storage
                    Storage.saveCart(cart);
                    // set cart values
                    this.setCartValues(cart)
                    // Display cart Itens
                    this.addCartItem(cartItem)
                    // Show the cart
                    this.showCart(cartItem)
                });
            
            
        })
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item){
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
            <img src="${item.img}" alt="product1">
            <div>
                <h4>${item.title}</h4>
                <h5>$${item.price},00</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>`;

            cartContent.appendChild(div);
            
    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
   
}
// local Storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products',JSON.stringify(products))
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const products = new Products();
    //get all products
    products.getProducts().then((data)=>{
        ui.displayProducts(data);
        Storage.saveProducts(data);
        
    }).then(()=>{
        ui.getBagButtons();
    })
})


