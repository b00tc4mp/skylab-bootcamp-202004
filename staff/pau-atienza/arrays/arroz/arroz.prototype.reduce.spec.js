'use strict';

describe('Arroz.prototype.reduce', function () {
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
    it('if an initial value is provided, the accumulator will be set at that initial value', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.reduce(function(accumulator, element) {return accumulator + element}, 1);

        expect(result).toBe(7);
    });
    it('if an empty array is introduced and no initial value is provided, it returns an error, however, if an initial value is provided, the function will be executed', function () {
        var array = new Arroz();

        try {
            var result = array.reduce(function(accumulator, element) {return accumulator + element});
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz();
    
        var result = array.reduce(function(accumulator, element) {return accumulator + element}, 1);
       

        expect(result).toBe(1);
    });

    it('if an element that isnt a function is introduced, it returns an error', function () {
        
        var array = new Arroz(1, 2, 3, 4, 5);
        var result;

        try {
            var result = array.reduce();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

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