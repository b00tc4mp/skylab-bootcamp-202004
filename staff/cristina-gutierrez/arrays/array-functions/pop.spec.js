describe('pop', function(){
    
    it("should return the deleted element of the array", function() {
        var arr = [1, 2, 3];
        var result = pop(arr);
        
        expect(result).toBe(3);
    })

    it("should return the new array after pop()", function() {
        var arr = [1, 2, 3];
        pop(arr);
        var result = arr;

        expect(result).toEqual([1, 2])
    })
});

