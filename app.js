// ******BUDGET CONTROLLER MODULE*****


var budgetController = (function(){

    var Income = function(id,description,value){                                                                                   // Function constructor for Income 
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expenses = function(id,description,value){                                                                                 // Function constructor for Expenses
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum+cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[],
        },

        totals:{
            exp: 0,
            inc: 0,
        },
        budget: 0,
            };

            return {

                addItem: function(type,des,amt){
                
                var newItem, ID;

                if(data.allItems[type].length>0){
                                //create new id
                            ID = data.allItems[type][data.allItems[type].length-1].id+1;

                }else {ID = 0}
                 

                            if (type==="inc"){
                                newItem = new Income(ID,des,amt);                       
                            }
                            else if(type==="exp"){
                                newItem = new Expenses(ID,des,amt);

                            }
                            data.allItems[type].push(newItem);

                            // if(data.allItems.inc.length === 1){document.querySelector('.boxy1').style.paddingTop = "15px";
                            //                                  document.querySelector('.boxy1').style.paddingBottom = "15px"   }
                            //  if (data.allItems.exp.length === 1){document.querySelector('.boxy2').style.paddingTop = "15px";
                            //                                       document.querySelector('.boxy2').style.paddingBottom = "15px";

                            // }
                            return newItem;
                            

                

                },

                calculateBudget: function(){

                    //calculate total income and expenses
                    calculateTotal('exp');
                    calculateTotal('inc');


                    //calculate the budget: income - expenses
                    data.budget = data.totals.inc - data.totals.exp;


                    

                },

                getBudget: function(){
                    return {
                        budget: data.budget,
                        totalInc: data.totals.inc,
                        totalExp: data.totals.exp,
                    }
                },
                testing: function(){console.log(data);},  //remove this *****


            }



})();          //------end Budget Controller module





// ******UI CONTROLLER MODULE*****


var uiController = (function(){

    var DOMstrings = {
        get_menu: "#menu",
        get_description: "#description",
        get_amount: "#amount",
        get_save_button: "#save_button",
        get_income:".income_list",
        get_expenses:".expenses_list",
        get_budgetLabel: "#totalBudget",
        get_expensesLabel: "#totalExpenses",
        get_incomeLabel: "#tatalIncome",
    };

    return{
        getinput: function(){                                                                                              //making values public so other modules can use 

            return{
            type : document.querySelector(DOMstrings.get_menu).value,
            des :  document.querySelector(DOMstrings.get_description).value,
            amt : parseFloat(document.querySelector(DOMstrings.get_amount).value) ,
        }
        },

        getDOM : function(){                                                                                               //making DOMstrings public so other module can use 

            return DOMstrings;

        },

        addListItem: function(obj,type){
            var html, newHtml, element;
            //HTML strings with placeholder text
            if(type==="inc"){
                            element=DOMstrings.get_income;
                            
                            html=`<div class="item boxy ui grid" id="inc-%id%">
                            <div class="eight wide column">
                               <div class="middle aligned content">
                               %description%
                               </div>
                            </div>
                            <div class="eight wide column">
                               <div class="middle aligned content">
                                +%value%
                               </div>
                            </div>
                        </div>`;                                    
            }else if (type === "exp"){
                            element=DOMstrings.get_expenses;
                            html=`<div class="item boxy ui grid" id="inc-%id%">
                            <div class="eight wide column">
                               <div class="middle aligned content">
                               %description%
                               </div>
                            </div>
                            <div class="eight wide column">
                               <div class="middle aligned content">
                                -%value%
                               </div>
                            </div>
                        </div>`;
            }
            newHTML = html.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%',obj.description);
            newHTML = newHTML.replace('%value%',obj.value);
            

            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

        },

        clearFields: function(){
            var fields,fieldsArr;
            fields = document.querySelectorAll(DOMstrings.get_description + ','+ DOMstrings.get_amount);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current,index,arr){
                current.value = '';
            });

            fieldsArr[0].focus(); //focus on the discription input 
        },

        displayBudget: function(obj){
            document.querySelector(DOMstrings.get_budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.get_expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.get_incomeLabel).textContent = obj.totalInc; 

        },

            
            
    }

})();           //------end Ui Controller Module



// ******GLOBAL APP CONTROLLER MODULE*****


var controller = (function(budgetCtrl,uiCtrl){

    var setEventListener = function(){

        var DOM = uiCtrl.getDOM();

        document.querySelector(DOM.get_save_button).addEventListener('click',ctrlAddItem);                                // listening click events and calling ctrlAddItem Function

        document.addEventListener('keydown',function(event) {                                                             // listening Enter key events and calling ctrlAddItem Function
        if(event.keyCode === 13 ||event.which ===13){
            ctrlAddItem();
        }       
    });
    };

    var updateBudget = function (){
        //calculate the budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget = budgetCtrl.getBudget();

        //display the budget
        uiCtrl.displayBudget(budget);
    };

    

    var ctrlAddItem = function(){

        var input, newItem;
        
        // get the input data
        input = uiCtrl.getinput();                                                                            // running publicly aivlable getinput function fron ui controller module
        
        if(input.des !=="" && !isNaN(input.amt) && input.amt > 0){
            
            // add item to the budget controller
            newItem = budgetController.addItem(input.type, input.des,input.amt);  
            // add item to the UI
            uiCtrl.addListItem(newItem, input.type);
            // clear the fields
            uiCtrl.clearFields();
            // calculate the budget and update budget
            updateBudget();
        }
        
    };

    return {
        init: function(){
            console.log("you have started the app.");
            setEventListener();
        },
    }
    

})(budgetController,uiController);              //------end Global App Controller Module




controller.init();                                                                                                      //Telling app to start