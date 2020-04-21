describe('Arroz.prototype.findIndex', function () {
    it('should return the index of the first number of the array that is greater than 4', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;

        result = arroz.findIndex(function(num) {
            if (num > 4) {
                return true;
            }
        });

        expect(result).toBe(1);
    });

    it('should return the index of the "camiseta" word of the array', function () {
        var arroz = new Arroz("chaqueta", "bufanda", "camiseta", "shorts");
        var result;

        result = arroz.findIndex(function(x) {
            if (x === "camiseta") {
                return true
            };
        });

        expect(result).toBe(2);
    });

    it('should return undefined because we are searching for the index of 1, and it is not in the array', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;

        result = arroz.findIndex(function(x) {
            if (x === 1) {
                return true
            };
        });

        expect(result).toBe(-1);
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;
        
        try {
            arroz.findIndex();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});