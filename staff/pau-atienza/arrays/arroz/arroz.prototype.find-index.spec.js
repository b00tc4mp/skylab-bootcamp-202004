'use strict'

describe('Arroz.prototype.findIndex', function () {
    it('This method returns the first element in the array that satisfies the provided testing function.  it returns -1 if no element passed the test.', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.findIndex(function (element) {
            return element > 4;
        });


        expect(result).toBe(4);
        
        
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.findIndex(function (element) {
            return element > 7;
        });

        expect(result).toBe(-1);
    });

    it('the callback has access to the index, the array, the element and thisArg during the iteration', function () {

        var array = new Arroz(1, 2, 3, 4, 5);


        var result = array.findIndex(function (element, index, array) {
            return element > index;
        });

        expect(result).toBe(0);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.findIndex(function(element, i, array, thisArg) {
            return element === thisArg[i];
        }, array2);

        expect(result).toBe(0);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 4);
        
        var result = array.findIndex(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(0);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(0, 1, 3);
        
        var result = array.findIndex(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(2);
        
    });

    it('handle error input: non-function expressions', function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.findIndex();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.findIndex(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.findIndex('Hello World');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.findIndex({
                name: 'Fulanito'
            });
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);


    });

});