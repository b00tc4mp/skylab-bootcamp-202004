"use strict";

describe('Arroz.prototype.every', function() {
    it('The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.', function() {
        var array = new Arroz(1, 2, 3, 4, 5, 6, 7);

        var result1 = array.every(function(element) {
            return element < 8
        })
        var result2 = array.every(function(element) {
            return element > 8
        })

        expect(result1).toBe(true);
        expect(result2).toBe(false);


    });
    it('should show the value of the last position of one array as a variable', function() {
        var array = new Arroz('hola', 'hola', 'hola', 'hola');

        var result1 = array.every(function(element) {
            return element === 'hola';
        })
        var result2 = array.every(function(element) {
            return typeof element === 'string';
        })
        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

    it('every () typeErrors', function() {
        var array = new Arroz('hola', 'hola', 'hola', 'hola');

        expect(function() {
            array.every();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() {
            array.every(2);
        }).toThrowError(TypeError, '2 is not a function');

        expect(function() {
            array.every('hello');
        }).toThrowError(TypeError, 'hello is not a function');
    });
});