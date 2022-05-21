// js functionality for calculator
let results = document.querySelector("#display .results");
results.textContent = "";

let input = document.querySelector("#display .input");
input.textContent = "0";

let buttons = createButtons();

// the calc stores everything it needs in the expression object as opposed to simply converting a full string of 
// input.  This is done in order to allow auto evaluation when the user inputs a chain of commands.  It's a clunky way to
// do it, but it works as intended.

let expressionObj = 
    {"l_operand" : "",
    "operator" : "",
    "r_operand" : "",
    "active" : "none",
    "result" : "",
    "fraction" : false};

// buttons are created and content assigned based on the id of the button.
function createButtons() {
    let list = document.querySelectorAll(".button");
    const buttons = Array.from(list);
    buttons.forEach(element => {
        element.textContent = `${element.id}`;
        element.addEventListener("click", (e) => {
            if (e.target.classList.contains("numeric")) {
                // if there is no current left and/or operand, store it
                if (!expressionObj.operator) {
                    expressionObj.l_operand += e.target.id;
                    expressionObj.active = "l";
                }
                else {
                    expressionObj.r_operand += e.target.id;
                    expressionObj.active = "r";
                }
            }
            if (e.target.classList.contains("operator")) {
                if (!expressionObj.operator) {
                    expressionObj.operator = e.target.id;
                }
                else {
                    // if user inputs new operator and there is already a right operand,
                    // auto evaluate the expression and reset expression w/ result stored in l_operand
                    if (expressionObj.active === "o") {
                        expressionObj.operator = e.target.id;
                    }
                    
                    else {
                        evaluateExpression();
                        expressionObj.operator = e.target.id;

                    }
                }
                expressionObj.active = "o";
            }
            if (e.target.classList.contains("special")) {
                switch (e.target.id) {
                    case "c":
                        resetExpression();
                        break;
                    case "ce":
                        resetExpression();
                        expressionObj.result = "";
                        break;
                    case "del":
                        deleteLast();
                        break;
                    case "enter":
                        evaluateExpression();
                
                    default:
                        break;
                }
            }
            // now set the proper display(s)
            input.textContent = expressionObj.l_operand + " " + expressionObj.operator + " " + expressionObj.r_operand;
            results.textContent = expressionObj.result;
            console.log(expressionObj);
        });
    });
}

function evaluateExpression() {
    // first, convert everything to actual numbers
    let left = parseInt(expressionObj.l_operand);
    let right = parseInt(expressionObj.r_operand);
    let divError = false;
    switch (expressionObj.operator) {
        case "+":
            expressionObj.result = left + right;
            break;
        case "-":
            expressionObj.result = left - right;
            break;
        case "*":
            expressionObj.result = left * right;
            break;
        case "/":
            if (right === 0) {
                expressionObj.result = "Don't div by 0!";
                // divError prevents error text from being copied to l_operand after eval
                divError = true;
            }
            else expressionObj.result = left / right;
    
        default:
            break;
    }
    results.textContent = expressionObj.result;
    if (!divError) {
        resetExpression();
        expressionObj.l_operand = expressionObj.result.toString();
        expressionObj.active = "l";
    }
    else divError = false;
}

function resetExpression() {
    expressionObj.l_operand = "";
    expressionObj.r_operand = "";
    expressionObj.operator = "";
    expressionObj.active = "none";
}
// this is clunky, but it only deletes from what was inputted last, without having 
// to build the entire expression into a string
function deleteLast() {
    switch (expressionObj.active) {
        case "none":
            return;
            break;
        case "l":
            expressionObj.l_operand = expressionObj.l_operand.slice(0, -1);
            if (!expressionObj.l_operand) expressionObj.active = "none";

            break;
        case "o":
            expressionObj.operator = "";
            expressionObj.active = "l";
            break;
        case "r":
            expressionObj.r_operand = expressionObj.r_operand.slice(0, -1);
            if (!expressionObj.r_operand) expressionObj.active = "o";

            break;        
    
        default:
            break;
    }
}


