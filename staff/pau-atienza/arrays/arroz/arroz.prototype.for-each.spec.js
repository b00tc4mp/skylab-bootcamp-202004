'use strict';

describe('Arroz.prototype.forEach', function () {
    it('should iterate on each element and apply the expression on it', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index) {
            result[index] = element * 10;
        });

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);

        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);

        var array = new Arroz('hello', 'cruel', 'world');
        var result = [];

        array.forEach(function(element, index) {
            result[index] = element.toUpperCase();
        });

        expect(result[0]).toBe('HELLO');
        expect(result[1]).toBe('CRUEL');
        expect(result[2]).toBe('WORLD');
    });

    it('should iterate on each element, and the callback should have access to the index and the arroz on each iteration', function () {
        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);

        var array = new Arroz(1, 2, 3);
        var result = [];

        array.forEach(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
     
        array.forEach(function(element, i, array, thisArg) {
            array[i] = thisArg;
        }, array2);

        expect(array[0]).toBe(array2);
        expect(array[1]).toBe(array2);
        expect(array[2]).toBe(array2);
    });
});