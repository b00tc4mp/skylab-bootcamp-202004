'use strict';

describe('Arroz.prototype.join', function() {

    it('should return a string made with the elements of the arroz', function() {
        var array = new Arroz("Hello", " World");
        var result;

        result = array.join();
        expect(result).toBe("Hello, World");
    });
    it('should work with a custom separator', function() {
        var array = new Arroz("Hello", " World");
        var result;

        result = array.join(" cruel");
        expect(result).toBe("Hello cruel World");
    });
    it('should return an empty string when working with an empty arroz', function() {
        var array = new Arroz();
        var result;

        result = array.join();
        expect(result).toBe("");
    });
});