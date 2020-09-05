function operate(type, a, b) {
    a = Number(a);
    b = Number(b);
    switch(type) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let storedValue;
let displayValue = ' ';
let state = 'initial';
let operator;

let display = document.querySelector('#display p');
display.textContent = displayValue;

function extendDisplayValue(e) {
    state === 'initial' ? state = 'initial' : state = 'numeric';

    let input = this.textContent;
    if (notOverflowing()) {
        updateDisplayValue(input);
    }
    updateDisplay();
}

function notOverflowing() {
    return displayValue.length < 22;
}

function updateDisplayValue(input) {
    if (displayValue.includes('.') && input === '.') {
        return;
    }
    displayValue === '0' ? displayValue = input : displayValue += input;
}

function undoDisplayValue() {
    let n = displayValue.length - 1;
    if (0 < n) {
        displayValue = displayValue.substr(0, n);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function updateDisplay(value=displayValue) {
    display.textContent = value;
}

let numbers = [...document.querySelector('#numbers').children];
numbers.forEach(number => number.addEventListener('click', extendDisplayValue));

function processOperatorPress(e) {

    console.log(state);
    let newOperator = this.value;
    if (newOperator === 'equals') {
        processEquals();
        return;
    }

    switch (state) {
        case 'initial':
            storedValue = displayValue;
            partialReset(newOperator);

            state = 'operator';
            break;
            
        case 'operator':
            operator = newOperator;
            break;

        case 'numeric':
            storedValue = operate(operator, storedValue, displayValue);
            partialReset(newOperator);
            updateDisplay(storedValue);
            
            state = 'operator';
            break;
    }

    console.log(`${state}: ${storedValue} ${operator} ${displayValue}`);
}

function processEquals() {
    storedValue = operate(operator, storedValue, displayValue);
    displayValue = ' ';
    state = 'operator';
    operator = 'none';
    updateDisplay(storedValue);
}

function partialReset(newOperator) {
    updateDisplay();
    displayValue = ' ';
    operator = newOperator;
}

let operatorButtons = [...document.querySelector('#operators').children];
operatorButtons.forEach(button => button.addEventListener('click', processOperatorPress));

function auxillaryPress(e) {
    let auxCall = this.value;
    switch (auxCall) {
        case 'clear':
            fullClear();
            break;
        case 'delete':
            undoDisplayValue();
            break;
    }
}

function fullClear() {
    storedValue = null;
    state = 'initial';
    partialReset('none');
    updateDisplay();
}

let auxButtons = [...document.querySelector('#auxillary').children];
auxButtons.forEach(button => button.addEventListener('click', auxillaryPress));

module.exports = operate;
