'use strict'

describe('Arroz.prototype.filter', function() {
    it('This method creates a new array with all elements that pass the test implemented by the provided function.', function() {
        var input = new Arroz (1, 2, 3, 4, 5);

        var result = input.filter(function(element) {
            return element < 3
        });

        expect(input instanceof Arroz).toBeTruthy();
        expect(result instanceof Arroz).toBeTruthy();
        expect(result[1]).toBe(2);

        var input = new Arroz (1, 2, 3, 4, 5);

        var result = input.filter(function(element) {
            return element > 3
        });

        expect(input instanceof Arroz).toBeTruthy();
        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
    });
    
    it('should return an empty array when the filtered array is empty', function () {
        var array = new Arroz ();
      
        
        var result = array.filter(function(word){ return word.length > 6});

        expect(result.length).toBe(0);
        expect(result instanceof Arroz).toBeTruthy();
        
    });

    it('shall return the index and the element', function() {
        var array = new Arroz(1, 2, 3, 4 ,5);

        var result = array.filter(function(element, index, array) {
            return element > index;
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });

    it('should iterate through all elements and compare them to an expression, if all are true, return true otherwise, returns false ', function() {
        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.filter(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result.length).toBe(3);
        expect(result instanceof Arroz).toBeTruthy();
        
        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 4);
        
        var result = array.filter(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result.length).toBe(2);
        expect(result instanceof Arroz).toBeTruthy();

    });

    it('handle error input', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter('Fulanito');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter([]);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.filter({gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });
});
