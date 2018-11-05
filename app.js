// ******BUDGET CONTROLLER MODULE*****


var budgetController = (function(){

})();

// ******UI CONTROLLER MODULE*****

var uiController = (function(){

    var DOMstrings = {
        get_menu: "#menu",
        get_discription: "#discription",
        get_amount: "#amount",
        get_save_button: "#save_button",
    };

    return{
        getinput: function(){                                                                                              //making values public so other modules can use 

            return{
            type : document.querySelector(DOMstrings.get_menu).value,
            dis :  document.querySelector(DOMstrings.get_discription).value,
            amt : document.querySelector(DOMstrings.get_amount).value ,
        }
        },

        getDOM : function(){                                                                                               //making DOMstrings public so other module can use 

            return DOMstrings;

        }

            
            
    }

})();

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
        console.log("item has been added.");
        // get the input date

    

    var input = uiCtrl.getinput();                                                                                        // running publicly aivlable getinput function fron ui controller module
    console.log(input);
        // add item to the budget controller
        // add item to the UI
        // calculate the budget
        // display the budget in the UI
    };

    return {
        init: function(){
            console.log("you have started the app.");
            setEventListener();
        },
    }
    

})(budgetController,uiController);

controller.init();                                                                                                      //Telling app to start