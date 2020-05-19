describe('push', function () {
    it('it should add an element at the end of an array', function () {
        var array = [1, 2, 3];
        var result = [];

        result = push(array, 10);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(10);
    });
});