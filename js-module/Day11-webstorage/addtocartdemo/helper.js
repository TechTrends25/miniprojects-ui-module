// Total Products
export const totalProducts = [{ name: "Laptop", price: 1200 },{ name: "Smartphone", price: 800 },
        { name: "Tablet", price: 500 }, { name: "Headphones", price: 150 },
        { name: "Smartwatch", price: 250 }, { name: "Camera", price: 600 },
        { name: "Keyboard", price: 100 }, { name: "Mouse", price: 50 }];


export let addProducts = function(products){        
        let productList = document.querySelector('.product-list-items');
        productList.innerHTML = '';
        products.forEach(function(item){
            let productName = item.name;
            let productPrice = item.price;
            let productHTML = `    <li class="product-item">
                <div class="product-detail" data-name="${productName}" data-price="${productPrice}">
                    ${productName} - $${productPrice}
                </div>
                <button class="add-to-cart">Add to cart</button>
            </li>`;
            productList.innerHTML += productHTML;            
        });
    };

export let loadShoppingCartProducts = function(){
        let cartDetails = localStorage.getItem("cartDetails");
        if(cartDetails != undefined && cartDetails){
            let cartDetailsObj = JSON.parse(cartDetails);
            document.querySelector('.total-cost').innerText = 0;
            cartDetailsObj.forEach(function(item){
                let productName = item.name;
                let productPrice = item.price;
                let shoppingCartProductUI = `
                <li class="product-item">
                    <div class="product-detail" data-name="${productName}" data-price="${productPrice}">
                        ${productName} - $${productPrice}
                    </div>
                    <button class="delete-from-cart">X</button>
                </li>
            `;
            document.querySelector(".shopping-list-items").innerHTML += shoppingCartProductUI;
            document.querySelector('.total-cost').innerText = Number(document.querySelector('.total-cost').innerText) + Number(productPrice);
    
        });
        }
    }

export let incrementTotalCost = function(productPrice){
        let currentTotalPrice = document.querySelector('.total-cost').innerText;
        document.querySelector('.total-cost').innerText = Number(currentTotalPrice)+Number(productPrice);
    };    

export let addProductToLocalStorage = function(productName, productPrice) {
        let cartDetails = localStorage.getItem("cartDetails");
        let cartDetailsObj = [];
        if(cartDetails != undefined && cartDetails){
            cartDetailsObj = JSON.parse(cartDetails);
        }
        cartDetailsObj.push({name: productName, price: productPrice});
        localStorage.setItem("cartDetails", JSON.stringify(cartDetailsObj));
    }

export let decrementTotalCost = function(productPrice){
         let currentTotalPrice = document.querySelector('.total-cost').innerText;
        document.querySelector('.total-cost').innerText = Number(currentTotalPrice)-Number(productPrice);
      }

export let removeProductFromLocalStorage = function(productName, productPrice) {
        let cartDetails = localStorage.getItem("cartDetails");
        if(cartDetails != undefined || cartDetails){
            let cartDetailsObj = JSON.parse(cartDetails);
            let deletedItemIndex = cartDetailsObj.findIndex(function(item){
                if(item.name === productName){
                    return true;
                }
                return false;
            });
            cartDetailsObj.splice(deletedItemIndex, 1);
            localStorage.setItem("cartDetails", JSON.stringify(cartDetailsObj));
        }
    }
