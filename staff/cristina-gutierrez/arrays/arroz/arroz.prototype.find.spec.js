describe('Arroz.prototype.find', function () {
    it('should return the first number of the array that is greater than 4', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;

        result = arroz.find(function(num) {
            return num > 4;
        });

        expect(result).toBe(9);
    });

    it('should return the "camiseta" word of the array', function () {
        var arroz = new Arroz("chaqueta", "bufanda", "camiseta", "shorts");
        var result;

        result = arroz.find(function(x) {
            if (x === "camiseta") {
                return true;
            };
        });

        expect(result).toBe("camiseta");
    });

    it('should return undefined because we are searching for 1, and it is not in the array', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;

        result = arroz.find(function(x) {
            if (x === 1) {
                return true;
            };
        });

        expect(result).toBe(undefined);
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz(3, 9, 5, 2, 10);
        var result;
        
        try {
            arroz.find();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});