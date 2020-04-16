'use strict';

describe('join', function () {

    it('if an array of strings is introduced, it should return a single string including the subelements of the array separated by commas', function () {
        var array = ['a', 'b', 'c'];

        var result = join(array);

        expect(result).toBe('a,b,c');
    });
    it('if an array containing numbers is introduced, it should return a single string including the subelements of the array separated by commas', function () {
        var array = [1, 1, 1];

        var result = join(array);

        expect(result).toBe('1,1,1');
    });
    it('if a string is provided, the elements should be separated by that string', function () {
        var array = [1, 1, 1];

        var result = join(array, 'helloworld');

        expect(result).toBe('1helloworld1helloworld1');
    });
    it('if an array containing undefined is introduced, the undefined element should be skipped', function () {
        var array = [5, true, undefined];

        var result = join(array);

        expect(result).toBe('5,true,');
    });
    it('if an array containing an array is introduced, the array should be skipped', function () {
        var array = [5, true, []];

        var result = join(array);

        expect(result).toBe('5,true,');
    });
    it('if an array containing a non-array object is introduced, a specific string will be returned', function () {
       
        var array = [5, true, {}];

        var result = join(array);

        expect(result).toBe('5,true,[object Object]');
    });
    it('if an array containing a function object is introduced, a specific string will be returned', function () {
        var func = function hello(){};
        var array = [5, true, func];

        var result = join(array);

        expect(result).toBe('5,true,function hello(){}');
    });
});