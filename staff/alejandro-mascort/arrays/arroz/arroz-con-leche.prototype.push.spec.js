'use strict';

describe('ArrozConLeche.protopype.push', function () {
    it('it should add an element at the end of an array and return the length of the new array', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));
        var result;

        result = array.push(new Arroz(1, 2, 3));
        debugger;

        expect(array[1][0]).toBe(1);
        expect(array[1][1]).toBe(2);
        expect(array[1][2]).toBe(3);
        expect(array.length).toBe(2);
        expect(result).toBe(2);
    });

    it('it should add nothing to the array because there is no value passed to the function', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));
        var result;

        result = array.push( );

        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe(2);
        expect(array[0][2]).toBe(3);
        expect(array.length).toBe(1)
        expect(array[0][3]).toBe(undefined);
        expect(result).toBe(1);
    });

    it('should add 4,5 and 6 to the ArrozConLeche and return 2 which is the length of the new array', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3));
        var result;

        result = array.push(new Arroz( 4, 5, 6));

        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe(2);
        expect(array[0][2]).toBe(3);
        expect(array[1][0]).toBe(4);
        expect(array[1][1]).toBe(5);
        expect(array[1][2]).toBe(6);
        expect(result).toBe(2);
    });
});