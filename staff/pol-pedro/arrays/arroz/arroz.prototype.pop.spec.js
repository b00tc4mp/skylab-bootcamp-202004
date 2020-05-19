describe('Arroz.prototype.pop', function () {
    it('it should delete the last elment of in array and return it in a new variable', function () {
        var array = new Arroz(1, 2, 3);
        var iPop;

        iPop = array.pop();

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(undefined);
        expect(iPop).toBe(3);
    });

    it('it should delete the last elment of in array and return it in a new variable', function () {
        var array = new Arroz(['hola', 'pepito'], [1, 2, 3], ['hola', 'pepito']);
        var iPop;

        iPop = array.pop();

        expect(array[0]).toEqual(['hola', 'pepito']);
        expect(array[1]).toEqual([1, 2, 3]);
        expect(array[2]).toBe(undefined);
        expect(iPop).toEqual(['hola', 'pepito']);
    });
});