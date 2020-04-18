'use strict';

describe('Arroz.prototype.join', function () {

    it('if an arroz of strings is introduced, it should return a single string including the subelements of the array separated by commas', function () {
        var array = new Arroz('a', 'b', 'c');

        var result = array.join();

        expect(result).toBe('a,b,c');
    });
    it('if an arroz containing numbers is introduced, it should return a single string including the subelements of the array separated by commas', function () {
        var array = new Arroz(1,1,1);

        var result = array.join();

        expect(result).toBe('1,1,1');
    });
    it('if a string is provided as the separator, the elements should be separated by that string', function () {
        var array = new Arroz(1,1,1);

        var result = array.join('helloworld');

        expect(result).toBe('1helloworld1helloworld1');
    });
    it('if an array containing undefined is introduced, the undefined element should be skipped', function () {
        var array = new Arroz(5, true, undefined);

        var result = array.join();

        expect(result).toBe('5,true,');
    });
    it('if an array containing an array is introduced, the array should be skipped', function () {
        var array = new Arroz(5, true, []);

        var result = array.join();

        expect(result).toBe('5,true,');

        var array = new Arroz([], true, 5);

        var result = array.join();

        expect(result).toBe(',true,5');
    });
    it('if an array containing a non-array object is introduced, a specific string will be returned', function () {
       
        var array = new Arroz(5, true, {});

        var result = array.join();

        expect(result).toBe('5,true,[object Object]');
    });
    it('if an array containing a function object is introduced, a string of the function will be returned', function () {
        var func = function hello(){};
        var array = new Arroz(5, true, func);

        var result = array.join();

        expect(result).toBe('5,true,function hello(){}');
    });
});