'use strict'

describe("Arroz.prototype.index-of", function () {
    it("should return the index of array when find the first element that you pass like a parameter", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var a = array.indexOf(2);
        var b = array.indexOf(3);

        expect(a).toBe(1);
        expect(b).toBe(2);

    });

    it("should return the index of array when find the first element that you pass like a parameter with an initial position", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var a = array.indexOf(2, 1);
        var b = array.indexOf(5, 2);

        expect(a).toBe(1);
        expect(b).toBe(4);

    });

    it("should return the index of array when find the first element that you pass like a parameter with an initial position or -1", function () {
        var array = new Arroz(1, 2, 3, 4, 5);


        var a = array.indexOf(2, 4);
        var b = array.indexOf(1, 8);

        expect(a).toBe(-1);
        expect(b).toBe(-1);

    });

    it("provided index value is a negative number and it is taken as the offset from the end of the array.", function () {
        var array = new Arroz(1, 2, 3, 4, 5);


        var a = array.indexOf(4, -1);
        var b = array.indexOf(2, -2);
        var c = array.indexOf(4, -2);
        var d = array.indexOf(2,-4);


        expect(a).toBe(-1);
        expect(b).toBe(-1);
        expect(c).toBe(3);
        expect(d).toBe(1);

    });

});