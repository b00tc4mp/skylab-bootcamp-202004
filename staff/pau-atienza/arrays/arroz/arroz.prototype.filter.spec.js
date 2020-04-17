'use strict'

describe('Arroz.prototype.filter', function() {
    it('This method creates a new arroz with all elements that pass the test implemented by the provided function.', function() {
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
    
    it('should return an empty arroz when the filtered arroz is empty', function () {
        var array = new Arroz ();
      
        
        var result = array.filter(function(word){ return word.length > 6});

        expect(result.length).toBe(0);
        expect(result instanceof Arroz).toBeTruthy();
        
    });

    it('the callback has access to the index, thisArg and the arroz it is being iterated on', function() {
        var array = new Arroz(1, 2, 3, 4 ,5);

        var result = array.filter(function(element, index, array) {
            return element > index;
        });

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result instanceof Arroz).toBeTruthy();
        expect(result.length).toBe(5);
        
        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.filter(function(element, i, array, thisArg) {
            return element === thisArg[i];
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

    it('handle error input: non-function expressions', function () {
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
