import {totalProducts, addProducts, loadShoppingCartProducts, incrementTotalCost, addProductToLocalStorage, decrementTotalCost, removeProductFromLocalStorage} from "./helper.js";

(function(){
    document.addEventListener("DOMContentLoaded",  function(){

     // Add Products on load
    addProducts(totalProducts);

    // Add shopping Cart Products on load
    loadShoppingCartProducts();

    // Filtered products
    document.querySelector(".search").addEventListener("keyup", function(event){
        let filteredProdcuts = totalProducts.filter(function(item){
            if(item.name.toLowerCase().includes(event.target.value.toLowerCase())){
                return true;
            }
            return false;
        });
        addProducts(filteredProdcuts);
    });

    let addProductToShoppingCart = function(element){
        let productDetailUI = element.closest("li").querySelector(".product-detail");
        let productName = productDetailUI.getAttribute("data-name");
        let productPrice = productDetailUI.getAttribute("data-price");
        let shoppingCartProductUI = `
            <li class="product-item">
                <div class="product-detail" data-name="${productName}" data-price="${productPrice}">
                    ${productName} - $${productPrice}
                </div>
                <button class="delete-from-cart">X</button>
            </li>
        `;
        document.querySelector(".shopping-list-items").innerHTML += shoppingCartProductUI;
        incrementTotalCost(productPrice);
        addProductToLocalStorage(productName, productPrice);
    };

     let removeProductFromShoppingCart = function(element){
     let productDetailUI = element.closest("li");
     let productName = productDetailUI.querySelector(".product-detail").getAttribute("data-name");
     let productPrice = productDetailUI.querySelector(".product-detail").getAttribute("data-price");
     productDetailUI.remove();
     decrementTotalCost(productPrice);
     removeProductFromLocalStorage(productName, productPrice);
    };


    // Add items to the cart
    document.querySelector(".product-list-items")?.addEventListener("click", function(event){
        if(event.target.tagName === "BUTTON"){
           event.stopPropagation();
           addProductToShoppingCart(event.target);
        }
    });


    //Remove items from the cart
    document.querySelector(".shopping-list-items")?.addEventListener("click", function(event){
        if(event.target.tagName === "BUTTON"){
           event.stopPropagation();
           removeProductFromShoppingCart(event.target);
        }
    });
    
    //clear all from cart
    document.querySelector(".clear-cart").addEventListener("click", function(event){
        event.stopPropagation();
        document.querySelector(".shopping-list-items").innerHTML = "";
        document.querySelector('.total-cost').innerText = 0;
        localStorage.removeItem("cartDetails");

    });

});
})();