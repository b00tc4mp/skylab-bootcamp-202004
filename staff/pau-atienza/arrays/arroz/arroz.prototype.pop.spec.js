'use strict'

describe('Arroz.prototype.pop', function() {
    it(' removes the last element from an arroz and returns that element. This method changes the length of the arroz.', function() {
        var array = new Arroz(1, 2, 3);

        var result = array.pop();
        expect(array[2]).toBe(undefined);
        expect(array.length).toBe(2);
        expect(result).toBe(3);
    });

    it('should return undefined when the arroz is empty', function () {
        var array = new Arroz();

        var deletedValue = array.pop();

        expect(deletedValue).toBe(undefined);

    });
});