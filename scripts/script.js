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

function extendDisplayValue(input) {
    state === 'initial' ? state = 'initial' : state = 'numeric';
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
numbers.forEach(number => 
    number.addEventListener('click', e => extendDisplayValue(e.target.textContent)));

function processOperatorPress(newOperator) {

    if (newOperator === 'equals') {
        if (state !== 'initial') {
            processEquals();
        }
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
operatorButtons.forEach(button => 
    button.addEventListener('click', e => processOperatorPress(e.target.value)));

function auxillaryPress(auxCall) {
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
auxButtons.forEach(button => 
    button.addEventListener('click', e => auxillaryPress(e.target.value)));

function onKeydown(e) {
    let key = e.key;
    processDisplayKeyInput(key);
    processOperatorKeyInput(key);
}

function processDisplayKeyInput(key) {
    if (isNaN(+key)) {
        if (key === '.') {
            extendDisplayValue(key);
        }
    } else {
        extendDisplayValue(key);
    }
}

function processOperatorKeyInput(key) {
    if (key === 'Enter' || key === '=') {
        processOperatorPress('equals');

    } else if (key.toLowerCase() === 'c') {
        auxillaryPress('clear');

    } else if (key === 'Backspace') {
        auxillaryPress('delete');

    } else if (key === '+') {
        processOperatorPress('add');

    } else if (key === '-') {
        processOperatorPress('subtract');

    } else if (key === '*' || key === 'x') {
        processOperatorPress('multiply');

    } else if (key === '/') {
        processOperatorPress('divide');
    }
}

window.addEventListener('keydown', onKeydown);

module.exports = operate;
