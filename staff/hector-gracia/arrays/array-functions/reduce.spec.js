describe('reduce', function () {
    it('should execute a reducer function (that you provide) on each element of the array, resulting in a single output value ', function () {
        var array = [1, 2, 3, 4];
        function expresion(acumulator,currentValue){
            return acumulator+currentValue;
        }
        var reduced=reduce(array, expresion);

        expect(reduced).toBe(10);
    });
    it('should not change the array', function () {
        var array = [1, 2, 3, 4];
        function expresion(acumulator,currentValue){
            return acumulator+currentValue;
        }
        var reduced=reduce(array, expresion);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
    });
});