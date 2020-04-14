
describe('some', function() {
    it('The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. ', function() {
        var array1 = [1, 2, 3, 4];
        var array2=[]
        var result1 = some(array1, function(element) {
           return element === 3
        }, );
        var result2 = some(array1, function(element) {
            return element === 5
        }, 10);
        var result3 = some(array2, function(element) {
            return element === 10
        }, );


        expect(result1).toBe(true);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    })
});