// js functionality for calculator
let results = document.querySelector("#display .results");
results.textContent = "";

let input = document.querySelector("#display .input");
input.textContent = "0";

const buttons = createButtons();
const maxDigits = 16;

// the calc stores everything it needs in the expression object as opposed to simply converting a full string of 
// input.  This is done in order to allow auto evaluation when the user inputs a chain of commands.  It's a clunky way to
// do it, but it works as intended.

let expressionObj = 
    {"l_operand" : "",
    "operator" : "",
    "r_operand" : "",
    "active" : "none",
    "result" : "",
    "precision" : 0};

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
                        break;
                    case ".":
                        // only add the decimal if it doesn't already exist in the operand
                        if (expressionObj.active === "l" && !(expressionObj.l_operand.includes("."))) {
                            expressionObj.l_operand += e.target.id;
                        }
                        else if (expressionObj.active === "r" && !(expressionObj.r_operand.includes("."))) {
                            expressionObj.r_operand += e.target.id;
                        }
                        break;
                
                    default:
                        break;
                }
            }
            // now set the content for the proper display(s)
            input.textContent = expressionObj.l_operand + " " + expressionObj.operator + " " + expressionObj.r_operand;
            results.textContent = expressionObj.result;
            // console.log(expressionObj);
        });
    });
}

function evaluateExpression() {
    // check for incomplete expressions
    if (!(expressionObj.l_operand) || !(expressionObj.operator) || !(expressionObj.r_operand)) return;

    // first, convert everything to actual numbers, checking if there is a decimal in there
    let left = expressionObj.l_operand.includes(".") ? parseFloat(expressionObj.l_operand) : parseInt(expressionObj.l_operand);
    let right = expressionObj.r_operand.includes(".") ? parseFloat(expressionObj.r_operand) : parseInt(expressionObj.r_operand);
    console.log(`Left: ${left}.  Right: ${right}`);

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
                // divError prevents error text from being copied to l_operand after evaluation
                divError = true;
            }
            else expressionObj.result = left / right;
    
        default:
            break;
    }
    results.textContent = expressionObj.result;
    if (!divError) {
        resetExpression();
        // convert back to string for display purposes after evaluating
        expressionObj.l_operand = expressionObj.result.toString();
        expressionObj.active = "l";
    }
    // if there was a divide by 0 error, don't actually do anything except reset the flag, so user can 
    // edit their expression
    else divError = false;
}

function resetExpression() {
    expressionObj.l_operand = "0";
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


