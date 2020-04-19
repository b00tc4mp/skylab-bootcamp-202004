'use strict';

describe('Arroz.prototype.pop', function() {
    it('deletes the last num of the array and return this last one', function() {
        var array = new Arroz();

        array = [1,2,3,4];

        var result = array.pop();

        expect(result).toBe(4);
        expect(array.length).toBe(3);
    });

    it('deletes the last num of the array and return this last one', function() {
        var array = new Arroz();

        array = ['hola', 'que', 'tal'];

        var result = array.pop();

        expect(result).toBe('tal');
        expect(array.length).toBe(2);
    });
});