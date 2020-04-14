describe('pop', function () {
    it('delete the last index position of one array', function () {
        var array = [1,2,3]
        pop(array)
            
    
        //function test
        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(undefined)
    
    });
    it('should show the value of the last position of one array as a variable', function(){
        var array = [1, 2, 3];

        var lastPosition= pop(array)
        
        expect(lastPosition).toBe(3)
        
     });

     it('should show undefined value if the array its empty', function () {
            var array = [];

            var lastPosition = pop(array);
        
        expect(lastPosition).toBe(undefined);
        
        });
});


