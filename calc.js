// js functionality for calculator
let displayResults = document.querySelector("#display .results");
displayResults.textContent = "Results Display Here";

let displayInput = document.querySelector("#display .input");
displayInput.textContent = "User Input Here";

let buttons = createButtons();
assignButtonText(buttons);


function createButtons() {
    let list = document.querySelectorAll(".button");
    return Array.from(list);
}

function assignButtonText(buttons) {
    buttons.forEach(element => {
        console.log(element.id);
    });
}
