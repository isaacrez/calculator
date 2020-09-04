function operate(type, a, b) {
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

let storedValue = 0;
let displayValue = '';

let display = document.querySelector('#display p');
display.textContent = displayValue;

let numberBin = document.querySelector('#numbers');
let numbers = [...numberBin.children];

function updateDisplay(e) {
    let number = this.textContent;
    if (invalidNumericInput(number)) {
        displayValue === '0' ? displayValue = number : displayValue += number;
        display.textContent = displayValue;    
    }
}

function invalidNumericInput(number) {
    return (number === '0' && displayValue === '0') ? false : true;
}

numbers.forEach(number => {
    number.addEventListener('click', updateDisplay)
})


module.exports = operate;
