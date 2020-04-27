'use strict'

describe('Arroz.prototype.concat',function(){
    it('should concatenate elements from 2 arrays', function(){
        var array1 = [1,2,3];
        var array2 = [4,5,6];
        
        var result = array1.concat(array2);

        expect(result.length).toBe(6);
    });

    it('should concatenate elements from several arrays',function(){
        var array1 = [1,2,3];
        var array2 = [4,5,6];
        var array3 = [7,8,9];
        
        var result = array1.concat(array2,array3);

        expect(result.length).toBe(9);
        expect(result[3]).toBe(4)
        expect(result[7]).toBe(8)
    });

    it('should return a shallow copy',function(){
        var array1 = [1,2,3];
        
        var result = array1.concat();
    
        expect(result.length).toBe(3);
    });

    it('should return a new array with the function added',function(){
        var array1 = [1,2,3];
        var array2 = [4,5,6];
        
        var result = array1.concat(array1.push(array2));
    
        expect(result.length).toBe(5);
    });

    it('should throw an Error',function(){
        var array1 = [1,2,3];

        expect(function () {
            array1.concat(push())
        }).toThrowError(ReferenceError,+ 'is empty');

        var array2=true

        expect(function () {
            array2.concat()
        }).toThrowError(TypeError);
    });
});