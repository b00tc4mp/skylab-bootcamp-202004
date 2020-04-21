'use strict';

describe('Arroz.prototype.slice', function () {
    it('should return [2,3,4] which are the last three items', function () {
        var array = new Arroz(1, 2, 3, 4);
        

        var result = array.slice(1);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(4);
    });

    it('should return [2,3,4] which are the last three items, with negative starting index', function () {
        var array = new Arroz(1, 2, 3, 4);
        

        var result = array.slice(-3);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(4);
    });

    it('should return [2,3] which are the second and third items', function () {
        var array = new Arroz(1, 2, 3, 4);
        

        var result = array.slice(1, 3);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
    });

    it('should return [1,2] which are the first and second items with negative finish index', function () {
        var array = new Arroz(1, 2, 3, 4);
        

        var result = array.slice(0, -1);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });

    it('should return [2,3, 4] which are the second and third items with negatives indexes', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);
        

        var result = array.slice(-5, -1);

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(4);
    });
});