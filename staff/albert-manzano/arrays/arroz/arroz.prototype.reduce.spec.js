'use strict';

describe('Arroz.prototyp.reduce', function () {
    it('should return the sum of all the elements', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accum, current, index, array) {return accum + current});

        expect(result).toBe(6);
    });

    it('should iterate on each element and return 21 which is the sum of each value in the array', function () {
        var array = new Arroz(1, 2, 3, 5, 10);

        var result = array.reduce(function(accum, current, index, arr) {
            accum = accum+current;
            return accum; 
        });

        expect(result).toBe(21);
    });

    it('should return the sum of all the elements', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accum, current, index, array) {return accum + current});

        expect(result).toBe(6);
    });

    it('if an empty array is introduced, it returns an error', function () {
        var array = new Arroz();

        try {
            var result = array.reduce(function(accumulator, element) {return accumulator + element});
        } catch (error) {
            result = error;
        }

        expect(result instanceof TypeError).toBe(true);
    });

    it('if an element that isnt a function is introduced, it returns an error', function () {
        
        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.reduce();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true); //correcto

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.reduce(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.reduce('Hello World');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.reduce({
                name: 'Fulanito'
            });
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });

});
