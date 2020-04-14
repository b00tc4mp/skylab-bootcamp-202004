describe('indexOf', function () {
    it('Find index of position', function () {
        var array = [1,2,3,4,5,6,7]
        
        
        var result= indexOf(array,4)
            
    
        //function test
        expect(result).toBe(3)
    
    });
    // it('Find index of position', function () {
    //     var array = [1,2,3,4,5,6,7]
        
        
    //     var result1= indexOf(array,7,3)
    //     var result2= indexOf(array,10,3)
            
    //     //function test
    //     expect(result1).toBe(3)
    //     expect(result2).toBe(-1)
    
    // });
    it('Find index of position', function () {
        var array = [1,2,3,4,5,6,7]
        
        
        var result= indexOf(array,6,-3)
            
    
        //function test
        expect(result).toBe(5)
    
    });
});