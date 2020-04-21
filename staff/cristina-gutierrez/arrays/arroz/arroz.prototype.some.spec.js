describe('Arroz.prototype.some', function () {
    it('should return true because there are numbers below 10 in the array', function () {
        var arroz = new Arroz(1, 2, 11, 4, 20, 5, 6, 12);
        var result;

        result = arroz.some(function(x) {
            if (x < 10) {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return true because there is a string in the array', function () {
        var arroz = new Arroz(1, 2, 11, 4, 20, "palabra", 5, 6, 12);
        var result;

        result = arroz.some(function(x) {
            if (typeof x === "string") {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return false because the array is empty', function () {
        var arroz = new Arroz();
        var result;

        result = arroz.some(function(x) {
        });

        expect(result).toBe(false);
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz(1, 2, 11, 4, 20, 5, 6, 12);
        var result;
        
        try {
            arroz.some();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});