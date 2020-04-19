describe('Arroz.prototype.indexOf', function () {
    it('it should return the first index of element in the array fron start index passed as the second parameter', function () {
        var array = new Arroz(1, 2, 3, 1, 5, 6, 1, 8);

        var result = array.indexOf(1, 2);

        expect(result).toBe(3);
    });

    it('it should return the index of the number that you pass as parameter in this case, we look for the string hola and we dont tell it where to start , it should find it in the index 0', function () {
        var array = new Arroz('hola', 'mundo', 1, 5, 6, 1, 8);

        var result = array.indexOf('hola');

        expect(result).toBe(0);
    });

    it('should iterate on each element and return index of element passed', function () {
        var array = new Arroz(1, 2, 3, 1, 5, 6, 1, 8);

        var result = array.indexOf(2);

        expect(result).toBe(1);
    });

    it('should iterate on each element and return -1', function () {
        var array = new Arroz(1, 2, 3, 1, 5, 6, 1, 8);

        var result = array.indexOf(array, 22);

        expect(result).toBe(-1);
    });

    it('should iterate on each element and return 0', function () {
        var array = new Arroz(1, 2, 3, 1, 5, 6, 1, 8);

        var result = array.indexOf(1,'hola');

        expect(result).toBe(0);
    });

})
