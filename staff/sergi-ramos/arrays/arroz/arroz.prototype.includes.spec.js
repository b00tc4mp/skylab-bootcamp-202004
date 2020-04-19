'use strict'

describe("Arroz.prototype.includes", function () {
    it("should return true or false if it finds an element passed by parameter (2) inside the array with a starting position (1)", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var array2 = new Arroz('hola', 'mundo');

        var a = array.includes(2, 1);
        var b = array.includes(2, 3)
        var c = array2.includes('hola', 0)

        expect(a).toBe(true);
        expect(b).toBe(false);
        expect(c).toBe(true);
    });

    it("should return true or false if it finds an element inside the array or not", function () {
        var array = new Arroz(1, 2, 3, 4, 5);


        var a = array.includes(1);
        var b = array.includes(8);

        expect(a).toBe(true);
        expect(b).toBe(false);

    });

    it("for negative values of FromIndex using the absolute value of FromIndex as the number of characters from the end of the array at which to start the search", function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var a = array.includes(4, -1);
        var b = array.includes(2, -2);
        var c = array.includes(4, -2);
        var d = array.includes(2,-4);


        expect(a).toBe(false);
        expect(b).toBe(false);
        expect(c).toBe(true);
        expect(d).toBe(true);

    });

    it("it should return false if there is no parameter", function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var a = array.includes();
    
        expect(a).toBe(false);

    });

});