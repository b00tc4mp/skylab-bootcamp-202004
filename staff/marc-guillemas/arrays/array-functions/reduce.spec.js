describe('reduce', function() {
    it("should return an array with numbers that are below 15", function() {
        var  arr = [1, 2, 3, 4, 5];
    
        var result = reduce(arr, function(num, acc){

            return num + acc
        }, 2)

        expect(result).toBe(12);
    });

});