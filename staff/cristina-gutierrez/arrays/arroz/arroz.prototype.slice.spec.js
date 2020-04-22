describe('Array.prototype.slice', function () {
    it('should return a new array with numbers from 2 to 4', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5, 6);
        var newArroz;

        newArroz = arroz.slice(1, 4);

        expect(newArroz).toEqual([2, 3, 4]);
    });

    it('should return an empty array when the start is bigger than the array.length index', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5, 6);
        var newArroz;

        newArroz = arroz.slice(6);

        expect(newArroz).toEqual([]);
    });

    it('should return a new array with numbers from 2 to 6 because the end of the slice is bigger than the array.length index', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5, 6);
        var newArroz;

        newArroz = arroz.slice(1, 9);

        expect(newArroz).toEqual([2, 3, 4, 5, 6]);
    });
});