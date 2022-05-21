// js functionality for calculator
let results = document.querySelector("#display .results");
results.textContent = "";

let input = document.querySelector("#display .input");
input.textContent = "";

let buttons = createButtons();

function createButtons() {
    let list = document.querySelectorAll(".button");
    const buttons = Array.from(list);
    buttons.forEach(element => {
        element.textContent = `${element.id}`;
        element.addEventListener("click", (e) => {
            if (e.target.id === "enter") {
                results.textContent = "";
                results.textContent = evalExpression(input.textContent);
            }
            else if (e.target.id === "c") {input.textContent = "";}
            else if (e.target.id === "ce") {
                input.textContent = "";
                results.textContent = "";
            }
            else input.textContent = buildExpression(input.textContent, e);
        });
    });
}

function buildExpression(input, e) {
    // if (e.target.id === "enter") return input;
    if (e.target.id === "del") return input.slice(0, -1);
    
    return input.concat(e.target.id);
}


function evalExpression(input) {
const operands = input.split(/([*+-/])/);

for (let i = 0; i < operands.length; i++) {
    if (!(/[+*-/]/.test(operands[i]))) {
        operands[i] = parseInt(operands[i]);
    }
}
    console.log(operands);
    return input.concat(" = (evaluated)");

}

