'use strict';

describe('Arroz.prototype.pop', function () {
    it('should return as undefined and length of array should be cero', function () {
        var array = new Arroz();

        var result = array.pop();

        expect(result).toBe(undefined);
        expect(array.length).toBe(0);
    });

    it('should remove the last element from an array', function () {
        var array = new Arroz(1, 2, 3, 4);
 
        var result = array.pop();

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toEqual(4);
        expect(result.length).toBe(1);
        expect(array.length).toBe(3);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(undefined);

    });


});