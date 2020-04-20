'use strict'

describe('Arroz.prototype.find', function () {
    it('returns the first element in the arroz that satisfies the provided testing function. Otherwise, it returns undefined.', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.find(function (element) {
            return element < 4;
        });

        expect(result).toBe(1);
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.find(function (element) {
            return element > 5;
        });

        expect(result).toBe(undefined);
    });

    it('returns undefined if the length of the array is 0', function () {
        var array = new Arroz();

        var result = array.find(function (element) {
            return element < 4;
        });

        expect(result).toBe(undefined);
    });

    it('should return undefined if objects are compared in the condition', function () {
        var array = new Arroz('spray', [1, 2], 'elite', 'exuberant', 'destruction', 'present');

        var result = array.find(function (element, i, array) {
            return element === [1, 2]
        })

        expect(result).toBe(undefined);

    });

    it('the callback has access to the index, the arroz and thisArg during the iteration process', function () {
        var array = new Arroz(1, 2, 3, 3, 4);

        var result = array.find(function (element, i, array) {
            return element === array[i + 1];
        });

        expect(result).toBe(3);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 3);
        
        var result = array.find(function(element, i, array, thisArg) {
            return element === thisArg[i];
        }, array2);

        expect(result).toBe(1);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(1, 2, 4);
        
        var result = array.find(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(1);

        var array = new Arroz(1, 2, 3);
        var array2 = new Arroz(0, 1, 3);
        
        var result = array.find(function(element, i, array, thisArg) {
            return array[i] === thisArg[i];
        }, array2);

        expect(result).toBe(3);
    });

    it('handle error input: non-function expressions', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.find();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.find(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.find('Hello World');
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.find({
                name: 'Fulanito'
            });
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });
});