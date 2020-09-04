
const operate = require('../script.js');

describe('add', () => {
    it('adds two numbers', () => {
        expect(operate('add', 3, 5)).toBe(8);
    })
})

describe('subtract', () => {
    it('subtracts two numbers', () => {
        expect(operate('subtract', 3, 5)).toBe(-2);
    })
})

describe('division', () => {
    it('divides two numbers', () => {
        expect(operate('divide', 3, 5)).toBe(3/5);
    })
})

describe('multiplication', () => {
    it('multiplies two numbers', () => {
        expect(operate('multiply', 3, 5)).toBe(15);
    })
})
