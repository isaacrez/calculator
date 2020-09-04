
const operation = require('../script.js');

describe('add', () => {
    it('adds two numbers', () => {
        let operator = new operation();
        expect(operator.add(3, 5)).toBe(8);
    })
})

describe('subtract', () => {
    it('subtracts two numbers', () => {
        let operator = new operation();
        expect(operator.subtract(3, 5)).toBe(-2);
    })
})

describe('division', () => {
    it('divides two numbers', () => {
        let operator = new operation();
        expect(operator.divide(3, 5)).toBe(3/5);
    })
})

describe('multiplication', () => {
    it('multiplies two numbers', () => {
        let operator = new operation();
        expect(operator.multiply(3, 5)).toBe(15);
    })
})
