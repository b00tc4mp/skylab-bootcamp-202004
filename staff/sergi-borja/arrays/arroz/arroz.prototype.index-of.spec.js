'use strict'

describe('index-of', function () {
    it('should return the index of the first element of the array that matches the searching elements, otherwise returns -1', function () {
        var array = new Arroz(1, 2, 3, 4);

        var result= array.indexOf(3, 2);

        expect(result).toBe(0);

    });

    it('should return the index of the first element of the array that matches the searching elements, otherwise returns -1', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.indexOf('world', 1);

        expect(result).toBe(1);
    });

    it('should return the index of the first element of the array that matches the searching elements, otherwise returns -1', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.indexOf('world', 1);
        

        expect(result).toBe(1);
    });

    it('should return the index of the first element of the array that matches the searching elements, otherwise returns -1', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result= array.indexOf(3, -5);
        
        expect(result).toBe(2);
    });
});