"use strict"

describe('Arroz.prototype.sort',function(){
    it('The sort() method sorts the elements of an array in place and returns the sorted array with numbers.',function(){
        var array = new Arroz(5,4,2,1,3);

        array.sort();

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });

    it('The sort() method sorts the elements of an array in place and returns the sorted array with letters.',function(){
        var array = new Arroz('c','a','z','b','l');

        array.sort();

        expect(array[0]).toBe('a');
        expect(array[1]).toBe('b');
        expect(array[2]).toBe('c');
        expect(array[3]).toBe('l');
        expect(array[4]).toBe('z');
    });
    it('The sort() method errors',function(){
        var array = new Arroz('c','a','z','b','l');

        expect(function(){
            array.sort('hello')
        }).toThrowError(TypeError,'need to be undefined at Arroz.sort')
    });
});