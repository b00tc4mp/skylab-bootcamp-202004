describe('Arroz.prototype.filter', function() {
    it("should return an array with numbers that are below 15", function() {
        var arroz = new Arroz(1, 22, 13, 17, 19, 15);

        var result = arroz.filter(function(x) {
            return x < 15;
        });

        expect(result).toEqual([1, 13]);
    });


    it("should return an array with words that have 4 letters or more", function() {

        var arroz = new Arroz("alejandro", "cris", "pol", "ana", "marc", "fer", "lua");

        var result = arroz.filter(function(x) {
            return x.length >= 4;  
        });

        expect(result).toEqual(["alejandro", "cris", "marc"])
        
    });

    it("should return an empty array because we are searching for a number great than 6", function() {

        var arroz = new Arroz(1, 2, 3, 4, 5);

        var result = arroz.filter(function(x) {
            return x > 6;  
        });

        expect(result).toEqual([])
        
    });

    it('should return an error because typeof callback is not a function', function () {
        var arroz = new Arroz(1, 2, 3, 4, 5);
        var result;
        
        try {
            arroz.filter();
        } catch (error) {
            result = error.message
        }

        expect(result).toBe("undefined is not a function");
    });
});