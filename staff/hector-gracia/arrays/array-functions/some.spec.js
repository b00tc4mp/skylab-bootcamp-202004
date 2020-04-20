describe('some', function () {
    it('should tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value', function () {
        var array = [1, 2, 3, 4];
        function expresion(currentValue){
            return 3===currentValue;
        }
        var somed=some(array, expresion);

        expect(somed).toBe(true);
    });
    it('should not change the array ', function () {
        var array = [1, 2, 3, 4];
        function expresion(currentValue){
            return 80===currentValue;
        }
        var somed=some(array, expresion);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
    });
});