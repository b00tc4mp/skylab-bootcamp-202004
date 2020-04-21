'use strict'

describe('Arroz.prototype.reduce', function () {

    it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function () {

        var array = new Arroz(1, 2, 3, 4);

        var result = array.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        });

        expect(result).toBe(10);
        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
        expect(array[2]).toEqual(3);
        expect(array[3]).toEqual(4);

        array = new Arroz(1, 2, 3, 4);

        result = array.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 50);

        expect(result).toBe(60);

    });

    it('the empty array and uninformed current value should return a TypeError for empty array', function () {
        var array = new Arroz();

        expect(function () {
            array.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            });
        }).toThrowError(TypeError, 'Reduce of empty array with no initial value');

    });

    it('it should return a TypeError with a expression passed is not a function', function () {
        var array = new Arroz(1, 2, 3, 4);

        expect(function () {
            array.reduce('hola');
        }).toThrowError(TypeError, 'hola is not a function');

    });

});