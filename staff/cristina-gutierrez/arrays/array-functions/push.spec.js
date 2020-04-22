describe('push', function(){
    
    it("should return the new length of the array", function() {
        var arr = [1, 2, 3];
        var result = push(arr, 2);

        expect(result).toBe(4);
    })

    it('should add the element to the end of the array', function(){
        var arr = [1, 2, 3];

        push(arr, 4);

        expect(arr[3]).toBe(4)
    })
});