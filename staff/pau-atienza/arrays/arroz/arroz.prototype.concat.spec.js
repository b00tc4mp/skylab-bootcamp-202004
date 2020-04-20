'use strict';

describe('Arroz.prototype.concat', function () {
    it('returns a new arroz that is the concatenation of the original arroz with one or multiple arrays or arroces', function () {
        var array = new Arroz(1, 2);
        
        var result = array.concat(new Arroz(1, 2, 3));

       
        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toBe(2);
        expect(result[4]).toBe(3);
        expect(result.length).toBe(5);

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(2);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        
        result = array.concat(new Arroz(1, 2), new Arroz(1, 2));

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toBe(2);
        expect(result[4]).toBe(1);
        expect(result[5]).toBe(2);
        expect(result.length).toBe(6);

        result = array.concat(new Arroz(1, 2), [1,2]);

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toBe(2);
        expect(result[4]).toBe(1);
        expect(result[5]).toBe(2);
        expect(result.length).toBe(6);

    });

    it('should not modify the original arroz', function () {
        var array = new Arroz(1, 2);

        var result = array.concat(new Arroz(1, 2, 3));

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(2);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
    });

    it('it may also be used with non-array and non-arroz variables', function () {
        var array = new Arroz(1, 2);

        var result = array.concat(1, 'Hola mundo');

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toBe('Hola mundo');
        expect(result.length).toBe(4);

        var a = function(){};
        var b = {};
        var result = array.concat(true, a, b);

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(a);
        expect(result[4]).toBe(b);
        expect(result.length).toBe(5);
    });

    it('only decomposes one level of subarrays/arroces', function () {
        var array = new Arroz(1, 2);

        var result = array.concat(new Arroz(1, new Arroz(1, 2), [1,2]));

        expect(result instanceof Arroz).toBeTruthy();
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(1);
        expect(result[3]).toEqual(new Arroz(1, 2));
        expect(result[4]).toEqual([1,2]);
        expect(result.length).toBe(5);
    });

});