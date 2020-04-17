describe('Arroz.prototype.indexOf', function () {
    it('return the index of the matching element', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.indexOf(1);
        expect(result).toBe(0);
    });

    it('return the index of the matching element, if not returns -1', function () {
        var array = new Arroz(1, 2, 3);

        var result = array.indexOf(4)
        expect(result).toBe(-1);

    });
});