'use strict';

describe('flat', function () {
    it('decomposes one level of the subarrays', function () {
        var array = [1, 2, 3, [1, 2]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(2);
    });

    it('decomposes two levels of the subarrays', function () {
        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array, 2);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(1);
        expect(newArray[5]).toBe(1);
        expect(newArray.length).toBe(6);
    });

    it('default depth is 1', function () {
        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray.length).toBe(5);
    });

    it('5 levels', function () {
        var array = [1, 2, 3, [1, [1 , [1, [1, 1]]]]];

        var newArray = flat(array, 5);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(1);
        expect(newArray[5]).toBe(1);
        expect(newArray[6]).toBe(1);
        expect(newArray[7]).toBe(1);
        expect(newArray.length).toBe(8);
    });

    it('2 arrays in the same level', function () {
        var array = [1, 2, 3, [1, 1], [1, 1]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(1);
        expect(newArray[5]).toBe(1);
        expect(newArray[6]).toBe(1);
        expect(newArray.length).toBe(7);
    });

    it('empty slots and undefineds are skipped', function () {
        var array = [1, 2, 3, , undefined, [1, 2]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(2);
    });
});