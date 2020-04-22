describe('Arroz.prototype.splice', function () {
    it('should return a new array with number 2', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5, 6);
        var newArroz = [];

        newArroz = arroz.splice(1, 1);

        expect(newArroz).toEqual([2]);
    });
});