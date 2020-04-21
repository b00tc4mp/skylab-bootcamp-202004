'use strict'

describe('arroz.prototype.some', function () {
    it('it has to return true because it finds some value with the conditions of the callback function', function () {


        var array = new Arroz(1, 2, 3, 4, 5);
        var boolean = array.some(function (element) {
            return element === 5;
        });
        var boolean1 = array.some(function (element) {
            return element > 1;
        });
        var boolean2 = array.some(function (element) {
            return element === 4;
        });
        var boolean3 = array.some(function (element) {
            return element === 2;
        });

        expect(boolean).toBe(true);
        expect(boolean1).toBe(true);
        expect(boolean2).toBe(true);
        expect(boolean3).toBe(true);
    })


    it('it has to return false because it cant find any value with the conditions of the callback function', function () {

        var array = new Arroz(1, 2, 3, 4, 5);

        var boolean = array.some(function (element) {
            return element > 5;
        });
        var boolean2 = array.some(function (element) {
            return element === 'hola';
        });
        var boolean3 = array.some(function (element) {
            return element < 1;
        });
        var boolean4 = array.some(function (element) {
            return element === true;
        });

        expect(boolean).toBe(false);
        expect(boolean2).toBe(false);
        expect(boolean3).toBe(false);
        expect(boolean4).toBe(false);
    });

    it("should throw TypeError is not a function", function () {

        var array = new Arroz(1, 2, 3, 4, 5);

        expect(function () {
            array = array.some();
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            array = array.some('hola');
        }).toThrowError(TypeError, 'hola is not a function');
        expect(function () {
            array = array.some(4);
        }).toThrowError(TypeError, '4 is not a function');
        expect(function () {
            array = array.some(true);
        }).toThrowError(TypeError, 'true is not a function');
    });
})
