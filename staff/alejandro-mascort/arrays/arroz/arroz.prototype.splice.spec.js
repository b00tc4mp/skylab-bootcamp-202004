'use strict';

describe('Arroz.prototype.splice', function () {
    it('should delete the last three items in the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.splice(3);

        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });

    it('should delete the last three items in the array , using a starting negative index', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.splice(-3);

        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });

    it('should delete the second and third items in the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.splice(1, 2);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(4);
        expect(array[2]).toBe(5);
        expect(array[3]).toBe(6);
    });

    it('should delete the second and third items in the array with negative starting index', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.splice(-5, 2);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(4);
        expect(array[2]).toBe(5);
        expect(array[3]).toBe(6);
    });

    it('should add elements 2,3,4 in the third position of the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        array.splice(2, 0, 2, 3, 4);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(2);
        expect(array[3]).toBe(3);
        expect(array[4]).toBe(4);
        expect(array[5]).toBe(3);
        expect(array[6]).toBe(4);
        expect(array[7]).toBe(5);
        expect(array[8]).toBe(6);
    });

    it('should add elements 2,3,4 in the third position of the array using negative index', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        array.splice(-4, 0, 2, 3, 4);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(2);
        expect(array[3]).toBe(3);
        expect(array[4]).toBe(4);
        expect(array[5]).toBe(3);
        expect(array[6]).toBe(4);
        expect(array[7]).toBe(5);
        expect(array[8]).toBe(6);
    });

});