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
});
