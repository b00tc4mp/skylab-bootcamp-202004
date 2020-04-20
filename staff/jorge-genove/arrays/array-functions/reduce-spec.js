describe('reduce', function() {
    it('The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
        var array1 = [1, 2, 3, 4];
        var array2=[]
        var result1 = reduce(array1, function(acc, cur) {
            return acc + cur
        }, );
        var result2 = reduce(array1, function(acc, cur) {
            return acc + cur
        }, 10);
        var result3 = reduce(array2, function(acc, cur) {
            return acc + cur
        }, );


        expect(result1).toBe(10);
        expect(result2).toBe(20);
        expect(result3).toBe("Error: Reduce of empty array with no initial value");

    })
});