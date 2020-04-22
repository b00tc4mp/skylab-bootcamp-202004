'use strict';

describe('Arroz.prototype.pop', function () {
    it('delete the last index position of one array', function () {
        var array = new Arroz(1, 2, 3);

        array.pop();
 
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array.length).toEqual(2);
        expect(array[2]).toBe(undefined);

    });
});