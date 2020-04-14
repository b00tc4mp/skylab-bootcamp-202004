describe('indexOf', function(){
    it('Should itereate on the array and return the index of the character matches with the value"', function(){
        var array = [2,4,6];
        
        var work=indexOf(array, 2);
        expect(work).toBe(0);
    });
    it('Should itereate on the array and return the index of the character matches with the value"', function(){
        var array = [2,4,6,2];
        
        var work=indexOf(array, 2,1);
        expect(work).toBe(3);
    });
    it('Should itereate on the array and return the index of the character matches with the value"', function(){
        var array = [1, 2, 3, 3, 4, 1];
        
        var work = indexOf(array, 2, -2);
        expect(work).toBe(-1);
    });
  
});