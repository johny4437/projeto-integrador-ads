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
}
// local Storage
class Storage{

}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const products = new Products();
    //get all products
    products.getProducts().then((data)=>{
        ui.displayProducts(data)
        
    })
})


