'use strict'

describe('Arroz.prototype.every', function() {
      
    it('should iterate through all elements and compare them to an expression, if all are true, return true otherwise, returns false ', function() {
        var array = new Arroz(1, 2, 3);
        
        var result = array.every(function(element) {
            return element > 2;
        });

        expect(result).toBe(false);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 4);
        
        var result = array.every(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(false);
    });

    it('an additional variable(thisArg) can be introduced to the function if needed, and the callback has access to thisArg and the index', function() {
        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.every(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(true);
    });

    it('handle error input non-function expressions', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.every();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.every(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.every('Fulanito');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.every([]);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.every({gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });
});