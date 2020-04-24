'use strict';


describe('Arroz.prototype.pop', function() {
    it('should remove the last element of an array and returns in a variable', function() {
        var array = new Arroz(1, 2, 3);

        expect(array.length).toBe(3);

        var last = array.pop();

        expect(array.length).toBe(2);
        expect(last).toBe(3);
        expect(array[3]).toBe(undefined);
    });
});