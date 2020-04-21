'use strict'

describe('arroz.prototype.slice', function () {
    it ('must return an array subtracted from the original array, with two parameters start (start position) and end (end position)', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var stringArray = new Arroz('hola','mundo','cruel','!!!!');
        var array2 = array.slice(1, 3);
        var array3 = array.slice(0, 4);
        var array4 = stringArray.slice(1, 2);
        var array5 = stringArray.slice(0, 2)

        expect(array2).toEqual([2,3]);
        expect(array3).toEqual([1,2,3,4]);
        expect(array4).toEqual(['mundo']);
        expect(array5).toEqual(['hola','mundo']);
    });

    it ('must return an array subtracted from the original array, with a start parameter (start position) to the end of the array', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var stringArray = new Arroz('hola','mundo','cruel','!!!!');
        var array2 = array.slice(1);
        var array3 = array.slice(0);
        var array4 = stringArray.slice(2);
        var array5 = stringArray.slice(3);

        expect(array2).toEqual([2,3,4,5]);
        expect(array3).toEqual([1,2,3,4,5]);
        expect(array4).toEqual(['cruel','!!!!']);
        expect(array5).toEqual(['!!!!']);
    });

    it ('must return an array subtracted from the original array, with two parameters, start and end (with negative values)', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var stringArray = new Arroz('hola','mundo','cruel','!!!!');
        var array2 = array.slice(-1);
        var array3 = array.slice(-4,4);
        var array4 = stringArray.slice(-3,-2);
        var array5 = stringArray.slice(1,-2);

        expect(array2).toEqual([5]);
        expect(array3).toEqual([2,3,4]);
        expect(array4).toEqual(['mundo']);
        expect(array5).toEqual(['mundo']);
    });
});
