describe('push', function () {
    it('it should delete the last elment of tlhe array and return it in a new variable', function () {
        var array = [1, 2, 3];
        var Ipop;

        Ipop = pop(array);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(undefined);
        expect(Ipop).toBe(3);
    });
});