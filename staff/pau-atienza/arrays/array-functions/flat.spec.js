'use strict';

describe('flat', function () {
    it('decomposes subarrays at different levels depending o nthe depth introduced', function () {
        var array = [1, 2, 3, [1, 2]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(2);

        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array, 2);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(1);
        expect(newArray[5]).toBe(1);
        expect(newArray.length).toBe(6);

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

    it('level of depth can be adjusted successfully', function () {
        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray.length).toBe(5);
    });

    it('when depth is 0, no changes are done on the array', function () {
        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array, 0);
        expect(newArray[2]).toBe(3);
        expect(newArray[3] instanceof Array).toBe(true);
        expect(newArray.length).toBe(4);
    });
    
    it('default depth is 1', function () {
        var array = [1, 2, 3, [1, [1 , 1]]];

        var newArray = flat(array);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray.length).toBe(5);
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

    it('empty slots and undefined are skipped', function () {
        var array = [1, 2, 3, , undefined, [1, 2]];

        var newArray = flat(array, 1);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(2);
    });

    it('assumens depth = 0 when an input that cannot be interpreted as a number is introduced', function(){
        var array = [1, 2, 3, [1, 2]];

        var newArray = flat(array, {});
        expect(newArray[2]).toBe(3);
        expect(newArray[3] instanceof Array).toBe(true);
        expect(newArray.length).toBe(4);

        var array = [1, 2, 3, [1, 2]];

        var newArray = flat(array, []);
        expect(newArray[2]).toBe(3);
        expect(newArray[3] instanceof Array).toBe(true);
        expect(newArray.length).toBe(4);

        var array = [1, 2, 3, [1, 2]];

        var newArray = flat(array, true);
        expect(newArray[2]).toBe(3);
        expect(newArray[3]).toBe(1);
        expect(newArray[4]).toBe(2);

    });
});