'use strict'

describe('arroz.prototype.finde-index', function () {

    it('should return the position of the array of the first element that meets the conditions specified in the callback function', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var a = array.findIndex(function (element, index, array) {
            return element < 10;
        });
        var b = array.findIndex(function (element, index, array) {
            return element > 1;
        });
        var c = array.findIndex(function (element, index, array) {
            return element > 4;
        });

        expect(a).toBe(0);
        expect(b).toBe(1);
        expect(c).toBe(4);
    });


    it('it has to return -1 because it cant find any value with the conditions of the callback function', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var array2 = new Arroz('hola', 'mundo');

        var a = array.findIndex(function (element, index, array) {
            return element > 10;
        });
        var b = array.findIndex(function (element, index, array) {
            return element == 'pepito';
        });

        expect(a).toBe(-1);
        expect(b).toBe(-1);
    })

    it("should throw TypeError is not a function", function () {

        var array = new Arroz(1, 2, 3, 4, 5);


        expect(function () {
            array = array.findIndex();
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            array = array.findIndex(10);
        }).toThrowError(TypeError, '10 is not a function');
        expect(function () {
            array = array.findIndex('mundo');
        }).toThrowError(TypeError, 'mundo is not a function');
    });
})