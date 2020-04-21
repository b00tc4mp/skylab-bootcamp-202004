'use strict';

describe('Arroz.protopype.push', function () {
    it('it should add an element at the end of an array and return the length of the new array', function () {
        var array = new Arroz(1, 2, 3);
        var result;

        result = array.push(10);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(10);
        expect(array.length).toBe(4);
        expect(result).toBe(4);
    });

    it('it should add nothing to the array because there is no value passed to the function', function () {
        var array = new Arroz(1, 2, 3);
        var result;

        result = array.push( );

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array.length).toBe(3)
        expect(array[3]).toBe(undefined);
        expect(result).toBe(3);
    });

    it('should add 4,5 and 6 to the array and return 6 which is the length of the new array', function () {
        var array = new Arroz(1, 2, 3);
        var result;

        result = array.push( 4, 5, 6);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
        expect(result).toBe(6);
    });
});