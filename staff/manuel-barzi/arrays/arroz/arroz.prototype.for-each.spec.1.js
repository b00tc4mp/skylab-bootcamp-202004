'use strict';

describe('Arroz.prototype.forEach', function () {
    it('should iterate on each element and keep each value processed in callback in the external array', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index) {
            result[index] = element * 10;
        });

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);

        array = new Arroz('hello', 'cruel', 'world');
        result = [];

        array.forEach(function(element, index) {
            result[index] = element.toUpperCase();
        });

        expect(result[0]).toBe('HELLO');
        expect(result[1]).toBe('CRUEL');
        expect(result[2]).toBe('WORLD');
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

    it('should throw error on non-function expression', function() {
        var array = new Arroz(1, 2, 3);
        var result;

        try {
            array.forEach();
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('undefined is not a function');

        result = undefined;

        try {
            array.forEach(1);
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('1 is not a function');

        result = undefined;

        try {
            array.forEach(true);
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('true is not a function');
    });
});