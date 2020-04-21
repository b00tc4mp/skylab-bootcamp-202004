describe('Arroz.prototype.every', function () {
    it('should return true because all numbers in the arroz are below 10', function () {
        var arroz = new Arroz(1, 2, 4, 5, 6);
        var result;

        result = arroz.every(function(x) {
            if (x < 10) {
                return true
            }
        });

        expect(result).toBe(true);
    });

    it('should return false because all numbers in the arroz are below 10', function () {
        var arroz = new Arroz(1, 2, 4, 5, 6);
        var result;

        result = arroz.every(function(x) {
            if (x > 10) {
                return true
            }
        });

        expect(result).toBe(false);
    });

    it('should return true because all the elements of the arroz are strings', function () {
        var arroz = new Arroz("chaqueta", "bufanda", "camiseta", "shorts");
        var result;

        result = arroz.every(function(x) {
            if (typeof x === "string") {
                return true
            };
        });

        expect(result).toBe(true);
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz("chaqueta", "bufanda", "camiseta", "shorts");
        var result;
        
        try {
            arroz.every();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});