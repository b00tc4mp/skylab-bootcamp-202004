'use strict'

describe('Arroz.prototype.pop', function() {
    it(' removes the last element from an array and returns that element. This method changes the length of the array.', function() {
        var array = new Arroz(1, 2, 3);

        array=array.pop();

        expect(array[2]).toBe(undefined);
    });
});