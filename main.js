let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:"Nasa tshirt",
        tags:"tshirt1",
        price:15,
        inCart:0
    },
    {
        name:"White tshirt",
        tags:"white",
        price:20,
        inCart:0
    },
    {
        name:"Blue tshirt",
        tags:"blue",
        price:25,
        inCart:0
    },
    {
        name:"Black tshirt",
        tags:"black",
        price:18,
        inCart:0
    }
];




for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        
    })
}

function onLoadCartNumbers(){
    let productsNumber = parseInt(localStorage.getItem('cartNumbers'));
    if(productsNumber){
        document.querySelector('.cart span').textContent = productsNumber;
    }
}

function cartNumbers(product){

    let productsNumber = parseInt(localStorage.getItem('cartNumbers'));
    
    if(productsNumber){
        localStorage.setItem('cartNumbers', productsNumber+1);
        document.querySelector('.cart span').textContent = productsNumber + 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);
   
   if(cartItems != null){
       if(cartItems[product.tags] == undefined){
           cartItems ={
               ...cartItems,
               [product.tags]:product
           }
       }
       cartItems[product.tags].inCart +=1;
   }else{
    product.inCart = 1;
    cartItems = {
        [product.tags]:product
    }
   }
  

    
   
   

localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }
}
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon  class="remove-button" name="close-circle"></ion-icon>
                <img src="./imagens/${item.tags}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <ion-icon name="arrow-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            ` 
    })
    productContainer.innerHTML +=`
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
      <h4 class="basketTotal">
        $${cartCost},00
      </h4>

    </div>`
    }

    }

    

onLoadCartNumbers();
displayCart();