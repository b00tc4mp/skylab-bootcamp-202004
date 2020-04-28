describe('reduce', function() {
    it('executes a reducer function (that you provide) on each element of the array, resulting in a single output value.', function() {
        var array = [1, 2, 3, 4];
        var acc = 0;

        var result = reduce(array, acc);

        expect(result).toBe(10);

    });

    it('executes a reducer function (that you provide) on each element of the array, resulting in a single output value', function() {
        var array = ['hello', 'world'];
        var acc = 'hi';

        var result = reduce(array, acc)

        expect(result).toBe('helloworldhi');
    });
});