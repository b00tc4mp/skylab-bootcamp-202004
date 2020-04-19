'use strict'

describe('includes', function () {
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = new Arroz(1, 2, 3, 4);

        var result= array.includes(3, 2);

        expect(result).toBe(true);

    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.includes('world', 1);

        expect(result).toBe(true);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.includes('world', 1);
        

        expect(result).toBe(true);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result= array.includes(3, -5);
        
        expect(result).toBe(true);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result= array.includes(15);
        
        expect(result).toBe(false);
    });
});