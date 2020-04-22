'use strict'

describe('arroz.prototype.indexOf', function () {
    it('Find index of position', function () {
        var array = new Arroz(1,2,3,4,5,6,7);
        
        
        var result= array.indexOf(4);
            
    
        //function test
        expect(result).toBe(3)
    
    });
    it('Find index of position', function () {
        var array = new Arroz(1,2,3,4,5,6,7);
        
        
        var result1= array.indexOf(7,3);
        var result2= array.indexOf(10,3);
            
        //function test
        expect(result1).toBe(6)
        expect(result2).toBe(-1)
    
    });
    it('Find index of position', function () {
        var array = new Arroz(1,2,3,4,5,6,7);
        
        
        var result= array.indexOf(6,-3);
            
    
        //function test
        expect(result).toBe(5)
    
    });
});
