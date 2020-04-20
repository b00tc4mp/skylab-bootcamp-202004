'use strict';

describe('The method slice', function () {
    it('extracts the subsequence of an array from the parameter begin to the parameter end' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = slice(array, 1, 3);
        
        expect(result[0]).toBe(12);
        expect(result[1]).toBe(8);
        expect(result.length).toBe(2);
    });
    
    it('should return and empty array when the begin param is higher than the index range' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = slice(array, 6);
        debugger
        expect(result.length).toBe(0);
    });

    it('if no end is introduced, returns from start to array.length' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = slice(array, 2);
        
        expect(result[0]).toBe(8);
        expect(result[1]).toBe(130);
        expect(result.length).toBe(3);
    });

    it('if end < begin, returns an empty array' , function () {
        var array = [5, 12, 8, 130, 44];
        var result = slice(array, 2, 1);
        
        expect(result.length).toBe(0);
    });

})




