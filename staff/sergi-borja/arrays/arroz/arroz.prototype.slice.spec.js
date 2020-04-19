'use strict';

describe('Arroz.prototype.slice', function() {
    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice(-2);

        expect(result).toEqual([9,10]);
    });

    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice(1, 6);

        expect(result).toEqual([1,2,3,4,5]);
    });

    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice();

        expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
        
    });

    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice(2, 2);

        expect(result).toEqual([]);
        expect(result.length).toBe(0)
        
    });

    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice(5454);

        expect(result).toEqual([]);
        expect(result.length).toBe(0)
        
    });

    it('Should return the interval of elements acording to the parameters', function() {
        var array = new Arroz(1,2,3,4,5,6,7,8,9,10);
    
        var result= array.slice('string');

        expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
        expect(result.length).toBe(10)
        
    });
});