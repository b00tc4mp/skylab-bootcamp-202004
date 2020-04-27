'use strict'

describe('Arroz.prototype.findIndex', function () {
    it('This method returns the first element in the array that satisfies the provided testing function.  it returns -1, indicating that no element passed the test.', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.findIndex(function (element) {
            return element > 7;
        });

        expect(result).toBe(-1);
    });

    it('handle error input', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.findIndex();
        } catch (error) {
            result = error;
        }

        expect(result instanceof Error).toBe(true);
    });

    it('returns the first element in the array that satisfies the provided testing function.', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.findIndex(function (element) {
            return element > 4;
        });


        expect(result).toBe(4);
    });

    it('shall return the index and the element', function () {
        var array = new Arroz(1, 2, 3, 4, 5);


        var result = array.findIndex(function (element, index, array) {
            return element > index;
        });

        expect(result).toBe(0);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result;

        try {
            var result = array.findIndex(1);
        } catch (error) {
            result = error;
        }

        expect(result instanceof TypeError).toBe(true);
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

        expect(result instanceof TypeError).toBe(true);


    });

});