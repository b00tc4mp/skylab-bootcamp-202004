'use strict'

describe('includes', function () {
    it('should check if the elements you are checking match the elements of the array', function () {
        var array = new Arroz(1, 2, 3, 4);

        var result= array.includes(3, 2);

        expect(result).toBe(true);

    });

    it('should check if the elements you are checking match the elements of the array', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.includes('world', 1);

        expect(result).toBe(true);
    });

    it('should check if the elements you are checking match the elements of the array', function () {
        var array = new Arroz('hello', 'cruel', 'world');

        var result= array.includes('world', 1);
        

        expect(result).toBe(true);
    });

    it('should check if the elements you are checking match the elements of the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result= array.includes(3, -5);
        
        expect(result).toBe(true);
    });

    it('should check if the elements you are checking match the elements of the array', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result= array.includes(15);
        
        expect(result).toBe(false);
    });
});