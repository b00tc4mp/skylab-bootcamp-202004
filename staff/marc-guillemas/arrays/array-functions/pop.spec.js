describe('pop', function(){
    
    it("should return the deleted element of the array", function() {
        var arr = [1, 2, 3];
        var result = pop(arr);
        
        expect(result).toBe(3);
    })

});
