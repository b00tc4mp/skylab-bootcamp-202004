describe('Arroz.prototype.reduce', function () {
    it('should return 15', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5);
        var result;

        result = arroz.reduce(function(acc, x) {
            return acc + x;
        });

        expect(result).toBe(15);
    });

    it('should return 20', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5);
        var result;

        result = arroz.reduce(function(acc, x) {
            return acc + x;
        }, 5);

        expect(result).toBe(20);
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5);
        var result;
        
        try {
            arroz.reduce();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});