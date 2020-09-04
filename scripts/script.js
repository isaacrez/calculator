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
let displayValue = '0';

let display = document.querySelector('#display p');
display.textContent = displayValue;

let numberBin = document.querySelector('#numbers');
let numbers = [...numberBin.children];

function updateDisplay(e) {
    let number = this.textContent;
    displayValue === '0' ? displayValue = number : displayValue += number;
    display.textContent = displayValue;    
}

numbers.forEach(number => {
    number.addEventListener('click', updateDisplay)
})


module.exports = operate;
