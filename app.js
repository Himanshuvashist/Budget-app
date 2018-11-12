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

    var data = {
        allItems:{
            exp:[],
            inc:[],
        },

        totals:{
            exp: 0,
            inc: 0,
        }
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

                            if(data.allItems.inc.length === 1){document.querySelector('.boxy1').style.paddingTop = "15px";
                                                             document.querySelector('.boxy1').style.paddingBottom = "15px"   }
                             if (data.allItems.exp.length === 1){document.querySelector('.boxy2').style.paddingTop = "15px";
                                                                  document.querySelector('.boxy2').style.paddingBottom = "15px";

                            }
                            return newItem;
                            

                

                },
                testing: function(){console.log(data);},


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
        get_expenses:".expenses_list"
    };

    return{
        getinput: function(){                                                                                              //making values public so other modules can use 

            return{
            type : document.querySelector(DOMstrings.get_menu).value,
            des :  document.querySelector(DOMstrings.get_description).value,
            amt : document.querySelector(DOMstrings.get_amount).value ,
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
                            html=`<div class="item" id="income-%id%">
                                    <div class="middle aligned content">
                                                            %description%
                                                                </div>
                                                                </div>`;
            }else if (type === "exp"){
                            element=DOMstrings.get_expenses;
                            html=`<div class="item" id="expense-%id%">
                                    <div class="middle aligned content">
                                                            %description%
                                                                </div>
                                                                </div>`;
            }
            newHTML = html.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%',obj.description);
            console.log(newHTML);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

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

    

    var ctrlAddItem = function(){

        var input, newItem;

        console.log("item has been added.");
        // get the input data
        input = uiCtrl.getinput();                                                                                        // running publicly aivlable getinput function fron ui controller module
        console.log(input);
        // add item to the budget controller
        newItem = budgetController.addItem(input.type, input.des,input.amt);  //
        // add item to the UI
        uiCtrl.addListItem(newItem, input.type);
        // calculate the budget
        // display the budget in the UI
    };

    return {
        init: function(){
            console.log("you have started the app.");
            setEventListener();
        },
    }
    

})(budgetController,uiController);              //------end Global App Controller Module




controller.init();                                                                                                      //Telling app to start