'use strict';

describe('Arroz.prototype.join', function () {
    it('should return a string made with the elements of the arroz', function () {
        var arroz = new Arroz("Hello"," World");
        var result;

        result=arroz.join();
        expect(result).toBe("Hello, World");
    });
    it('should work with a custom separator', function () {
        var arroz = new Arroz("Hello"," World");
        var result;

        result=arroz.join(" cruel");
        expect(result).toBe("Hello cruel World");
    });
    it('should return an empty string when working with an empty arroz', function () {
        var arroz = new Arroz();
        var result;

        result=arroz.join();
        expect(result).toBe("");
    });
});