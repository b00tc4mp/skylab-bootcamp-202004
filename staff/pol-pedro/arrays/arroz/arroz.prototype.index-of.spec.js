describe('Arroz.prototype.index-of', function () {
    it('it should return the indeox of 1 in this case 0', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(1);

        expect(index).toBe(0);
    });

    it('it should return  -1 because we are looking for a existing number but pass its postion', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(1, 1);

        expect(index).toBe(-1);
    });

    it('it should return  -1 because the value isnt on the array', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(15);

        expect(index).toBe(-1);
    });

    it('it should return  3 because we are looking for a existing number with an intial index were the value is includedd', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(3, 1);

        expect(index).toBe(2);
    });

    it('it should return  3 because we are looking for a existing number with an intial negative index were the value is included', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(3, -2);

        expect(index).toBe(2);
    });

    it('it should return  -1 because we are looking for a existing number with an intial negative index were the value isnt included', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(1, -2);

        expect(index).toBe(-1);
    });

    it('it should return  1 because we are looking for a existing number with an intial negative index greater that the array length sow it will look in all the array', function () {
        var array = new Arroz(1, 2, 3);
        var index;

        index = array.indexOf(1, -10);

        expect(index).toBe(0);
    });
});