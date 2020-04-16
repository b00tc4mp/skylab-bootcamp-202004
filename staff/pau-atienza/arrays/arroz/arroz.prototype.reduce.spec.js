'use strict';

describe('reduce', function () {
    it('should return the sum of all the elements', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accumulator, element) {return accumulator + element});

        expect(result).toBe(6);
    });
    it('should return the product of all the elements', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accumulator, element) {return accumulator * element});

        expect(result).toBe(6);
    });
    it('if an initial value is provided, the operation will start at that index', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accumulator, element) {return accumulator + element}, 1);

        expect(result).toBe(7);
    });
    it('if an empty array is introduced, it returns an error', function () {
        var array = new Arroz();

        try {
            var result = array.reduce(function(accumulator, element) {return accumulator + element});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
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