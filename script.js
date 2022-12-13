function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) {return "NaN";}
    return a / b;
}

function nothing(a,b) {
    return a;
}

function operate(func, a, b){
    return func(a, b);
}

function addButtonListeners() {
    document.querySelector('#clear').addEventListener('click', clear);
    document.querySelector('#negate').addEventListener('click', negate);
    document.querySelector('#percent').addEventListener('click', makePercent);

    const operators = document.querySelectorAll('.function');
    operators.forEach(operator => operator.addEventListener('click', selectOperator));

    document.querySelector('#operate').addEventListener('click', operateOn);

    const numbers = document.querySelectorAll('.num');
    numbers.forEach(number => number.addEventListener('click', typeNum));
}

function display() {
    const display = document.querySelector('.display');

    if (toDisplay.length == 0) {display.textContent = "0"}
    else {
        display.textContent = toDisplay;
    }
}

function log() {
    console.log("Operands: " + operands);
    console.log("Current_operand:" + current_operand.toString());
    console.log("Operator: " + operator);
    console.log("toDisplay: " + toDisplay);
}

function clear() {
    operands = ["",""];
    operator = "";
    toDisplay = "";
    current_operand = 0;

    last_button = "clear";
    display();
}

function negate() {
    if (operands[current_operand] ===  "" || operands[current_operand] === "0.") {}
    else if (operands[current_operand][0] === "-") {operands[current_operand] = operands[current_operand].slice(1)}
    else {operands[current_operand] = "-" + operands[current_operand];}
    toDisplay = operands[current_operand];

    last_button = "number";
    //log();
    display();
}

function makePercent() {
    current_operand = 1;
    operands[1] = "100"
    operator = "divide";
    operateOn();
}

function selectOperator(e) {
    if (current_operand === 1 && last_button === "number") {
        operateOn();
    }
    if (operands[0] === "") {operands[0] = 0;}
    operator = this.id;
    this.classList.add("currentOperator")
    current_operand = 1;
    last_button = "operator"
    toDisplay = operands[current_operand];

}

function operateOn() {
    document.querySelector('.currentOperator').classList.remove("currentOperator")
    if (operands[0] === "") {operands[0] = 0;}
    if (operands[1] === "") {operands[1] = 0;}

    let func = nothing;
    if (operator === "add") {func = add;}
    else if (operator === "subtract") {func = subtract;}
    else if (operator === "divide") {func = divide;}
    else if (operator === "multiply") {func = multiply;}

    let outcome = operate(func, Number(operands[0]), Number(operands[1]));
    outcome = rightStringLength(outcome);
    operands = [outcome, ""];

    current_operand = 0;
    operator = "";
    last_button = "equals";
    toDisplay = operands[current_operand];
    //log();
    display();
}

// Output will have only 7 digits at most
// Smallest value is 1x10e6, any smaller will display zero
// Largest value is 9999999, larger will display 9999999
function rightStringLength(outcome) {
    outcome = (Math.round(outcome*1000000)/1000000).toString();
    if (outcome > 9999999) {outcome = "9999999";}
    outcome = outcome.slice(0,8);
    if (outcome.slice(-1) == ".") {outcome = outcome.slice(0,-1);}
    return outcome;
}

function typeNum(e) {
    if (last_button  === "equals") {clear();}
    let char = this.getAttribute('value')
    if (toDisplay.length >= 8 || Number(toDisplay) > 999999) {return;}

    if (char === "." && operands[current_operand].length === 0) {operands[current_operand] = "0."}
    else if (char === "." && operands[current_operand].includes(".")) {}
    else if (char === "0" && operands[current_operand] === "") {}
    else {operands[current_operand] = operands[current_operand] + char;}

    toDisplay = operands[current_operand];
    last_button = "number";
    //log();
    display();
}

function setRadii(r) {
    const radius = `${r}px`;
    const radius2 = `${r-1}px`;
    let calc = document.querySelector('.calculator');
    calc.style.borderRadius = radius;
    document.querySelector('#n0').style.borderRadius = `0px 0px 0px ${radius2}`;
    document.querySelector('#operate').style.borderRadius = `0px 0px ${radius2} 0px`;
    document.querySelector('.display').style.borderRadius = `${radius2} ${radius2} 0px 0px`;
}

let operands = ["",""];
let toDisplay = "";
let operator = "";
let last_button = "equals";
let current_operand = 0;

setRadii(15);
addButtonListeners();
display();

// ADD IN SUPPORT FOR KEYBOARD