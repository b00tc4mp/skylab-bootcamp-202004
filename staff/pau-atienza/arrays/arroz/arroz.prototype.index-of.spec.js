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

    it('if index negative, it becomes arroz.length -index, and if it is still negative it becomes 0', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.indexOf(2, -1)
        expect(result).toBe(-1);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.indexOf(2, -4)
        expect(result).toBe(1);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.indexOf(2, -8)
        expect(result).toBe(1);
    });
});