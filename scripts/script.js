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
    console.log('Initial state: ' + state);

    if (input === '-') {
        processNegation();
        updateDisplay();
        return;
    }

    if (state === 'operator' || state === 'displayInput') {
        state = 'displayInput';
    } else {
        state = 'storedInput';
    }

    if (notOverflowing()) {
        updateDisplayValue(input);
    }
    updateDisplay();

    console.log('Final state: ' + state);
}

function processNegation() {
    if (displayValue[0] === '-') {
        displayValue = displayValue.slice(1);
    } else {
        displayValue = '-' + displayValue;
    }
}

function notOverflowing() {
    return displayValue.length < 22;
}

function updateDisplayValue(input) {
    if (displayValue.includes('.') && input === '.') {
        return;
    }

    if (displayValue === '0' || displayValue === ' ') {
        displayValue = input;
    } else {
        displayValue += input;
    }
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
    if (value != 'Infinity') {
        display.textContent = value;
    } else {
        fullClear();
        display.textContent = 'Please don\'t divide by zero!';
    }
}

let numbers = [...document.querySelector('#numbers').children];
numbers.forEach(number => 
    number.addEventListener('click', e => extendDisplayValue(e.target.textContent)));

function processOperatorPress(newOperator) {
    console.log('Initial state: ' + state);

    if (newOperator === 'equals' && state === 'displayInput') {
        storedValue = operate(operator, storedValue, displayValue);
        displayValue = ' ';
        updateDisplay(storedValue);

        operator = 'none';
        state = 'output';
        return;
    }

    switch (state) {
        case 'initial':
            console.log('Need numbers before operations!')
            break;
        
        case 'storedInput':
            operator = newOperator;
            storedValue = displayValue;
            displayValue = ' ';
            state = 'operator';
            break;
        
        case 'operator':
            operator = newOperator;
            break;
        
        case 'displayInput':
            storedValue = operate(operator, storedValue, displayValue);
            operator = newOperator;
            displayValue = ' '
            updateDisplay(storedValue);
            state = 'operator';
            break;
        
        case 'output':
            operator = newOperator;
            state = 'operator';
            break;
    }

    console.log('Final state: ' + state);
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
    displayValue = ' ';
    storedValue = null;
    operator = 'none';
    state = 'initial';
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
