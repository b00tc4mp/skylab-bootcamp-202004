'use strict'

describe('Arroz.prototype.includes', function () {
    it('shall return true if a element matches the test false if none do', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2)
        expect(result).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(6)
        expect(result).toBe(false);
    });

    it('if index is higher than arroz.length, returns false', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2, 6)
        expect(result).toBe(false);
    });

    it('if index negative, it becomes arroz.length -index - 1, and if it is still negatie it becomes 0', function () {
        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2, -1)
        expect(result).toBe(false);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2, -4)
        expect(result).toBe(true);

        var array = new Arroz(1, 2, 3, 4, 5);

        var result = array.includes(2, -8)
        expect(result).toBe(true);
    });

    it("Should compare two strings with different values and confirm is false", function () {
        var array = new Arroz(1, 2, 3, 4, 5, 'c');
    
        var matchIndex = array.includes('e');
    
        expect(matchIndex).toBe(false);
      });
    
    it("Should iterate on the array and find the value NaN and confirm is true", function () {
    var array = new Arroz(1, 2, 3, 4, 5, NaN);

    var matchIndex = array.includes(NaN);

    expect(matchIndex).toBe(true);
    });
    
    it("Returns true when comparing equal objects and false when they are different", function () {
    var objectToCompare = new Arroz ()
    var array = new Arroz(1, 2, 3, 4, 5, objectToCompare);

    var matchIndex = array.includes(objectToCompare);

    expect(matchIndex).toBe(true);

    var matchIndex = array.includes(new Arroz());

    expect(matchIndex).toBe(false);
    });

});