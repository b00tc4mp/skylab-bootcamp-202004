'use strict';

describe('Arroz.prototype.some', function() {
    it(' tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function() {
        var array = new Arroz (1, 2, 3, 4, 5);

        var result =array.some(function(element) {
            return element === 3;
        });

        expect(result).toBe(true);
    });

    it(' tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function() {
        var array = new Arroz (1, 2, 3, 4, 5);
        var result =[];

        array.some(function(element ,index ,array) {
            result[index]= array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

    it('an additional variable(thisArg) can be introduced to the function if needed, and the callback has access to thisArg, the index and the arroz', function() {
        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.some(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(true);
    });

    it('handle error input non-function expressions', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.some();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.some(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.some('Fulanito');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.some([]);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            result = array.some({gender: 'undefined'});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });



});

