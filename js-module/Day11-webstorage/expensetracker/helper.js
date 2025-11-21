export function addExpenseOnLoad(){
            let expenseItems = localStorage.getItem("expenseItems");
         if(expenseItems != undefined && expenseItems){
            let expenseItemsObj = JSON.parse(expenseItems);
            document.querySelector(".total-cost").innerText = 0;
            expenseItemsObj.forEach(function(item){
                let expenseName = item.name;
                let expenseAmount = item.amount;
                let expenseListItems = document.querySelector(".expenses-list-items");
                let expenseItemTag = `
                    <li class="expense-list-item">
                    <div class="expense-item" data-name="${expenseName}" data-amount="${expenseAmount}">
                        ${expenseName} - ${expenseAmount}
                    </div>
                    <button class="remove-expense"> X </button>
                    </li>
                `;
                expenseListItems.innerHTML += expenseItemTag;
                document.querySelector(".total-cost").innerText = Number(document.querySelector(".total-cost").innerText) + Number(expenseAmount);
            });
         }
        }

export function increaseAmount(expenseAmount){
            let currentAmt = document.querySelector(".total-cost").innerText;
            let updatedAmount = Number(currentAmt) + Number(expenseAmount); 
            document.querySelector(".total-cost").innerText = updatedAmount;
        }

export function addExpensesToLocalStorage(expenseName, expenseAmount){
            let expenseItems = localStorage.getItem("expenseItems");
            let expenseItemsObj = [];
            if(expenseItems != undefined && expenseItems){
                expenseItemsObj = JSON.parse(expenseItems);
            }
            expenseItemsObj.push({
                name: expenseName,
                amount: expenseAmount
            });
            localStorage.setItem("expenseItems",JSON.stringify(expenseItemsObj));
        }

export function decreaseAmount(selExpenseAmount){
            let currentAmt = document.querySelector(".total-cost").innerText;
            let updatedAmount = Number(currentAmt) - Number(selExpenseAmount); 
            document.querySelector(".total-cost").innerText = updatedAmount;
        }

export function removeExpensesFromLocalStorage(selExpenseName){
           let expenseItems = localStorage.getItem("expenseItems");
           if(expenseItems != undefined || expenseItems){
                let expenseItemsObj = JSON.parse(expenseItems);
                let selExpenseIndex = expenseItemsObj.findIndex(function(item){
                    if(item.name === selExpenseName){
                        return true;
                    }
                    return false;
                });
                expenseItemsObj.splice(selExpenseIndex, 1);
                localStorage.setItem("expenseItems",JSON.stringify(expenseItemsObj));
           }
        }