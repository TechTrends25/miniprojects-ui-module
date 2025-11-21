import {addExpenseOnLoad, increaseAmount, addExpensesToLocalStorage, decreaseAmount, removeExpensesFromLocalStorage} from "./helper.js"

(function(){
    
    document.addEventListener("DOMContentLoaded",function(){

        /** Add Expenses on load */
        addExpenseOnLoad();
         
        /** Add Expenses */
        document.querySelector(".add-expense-cta").addEventListener("click", function(event){
                event.stopPropagation();
                let expenseName = event.target.closest(".add-expense-detail").querySelector("input[name='name']").value;
                let expenseAmount = event.target.closest(".add-expense-detail").querySelector("input[name='amount']").value;
                let expenseListItems = document.querySelector(".expenses-list-items");
                let expenseItemTag= `
                    <li class="expense-list-item">
                    <div class="expense-item" data-name="${expenseName}" data-amount="${expenseAmount}">
                        ${expenseName} - ${expenseAmount}
                    </div>
                    <button class="remove-expense"> X </button>
                    </li>
                `;
                expenseListItems.innerHTML += expenseItemTag;
                increaseAmount(expenseAmount);
                addExpensesToLocalStorage(expenseName, expenseAmount); 
        });

        /** Remove expense */
        document.querySelector(".expenses-list-items").addEventListener("click", function(event){
           if(event.target.tagName === "BUTTON"){
            let expenseListItemUI =   event.target.closest("li")
            expenseListItemUI.remove();
            let selExpenseName = expenseListItemUI.querySelector(".expense-item").getAttribute("data-name");
            let selExpenseAmount = expenseListItemUI.querySelector(".expense-item").getAttribute("data-amount");
            decreaseAmount(selExpenseAmount);
            removeExpensesFromLocalStorage(selExpenseName);
        }
        });

        /** Clear all expnenses */
        document.querySelector(".clear-all-expenses").addEventListener("click", function(){
            document.querySelector(".expenses-list-items").innerHTML =" ";
            document.querySelector(".total-cost").innerText = 0;
            localStorage.removeItem("expenseItems");

        });


    });
})();