'use strict'

describe('Arroz.prototype.flat',function(){
    it('should extract inner arrays', function(){
        var array1 = [1,2,[3,4]];
        var array2 = [1,2,[3,4],[5,6]];
        
        var result1 = array1.flat();
        var result2 = array2.flat();

        expect(result1.length).toBe(4);
        expect(result2.length).toBe(6);
    });

    it('should extract inner arrays of inner arrays', function(){
    var array1 = [1,2,[3,4,[5,6]]];
    var result = array1.flat(3);

    expect(result[2]).toBe(3);
    expect(result[3]).toBe(4);
    expect(result[4]).toBe(5);
    expect(result.length).toBe(6);
    });

    it('should throw error', function(){
    var array1 = [1,2,[3,4]];

    expect(function() {
        array1.every(true);
    }).toThrowError(TypeError, 'true is not a function');
    });
});
