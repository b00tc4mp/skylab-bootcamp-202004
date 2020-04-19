'use strict';

describe('Arroz.prototype.push', function() {
    it('Should add the parameter to the last position of the array', function() {
        var array = new Arroz();

        expect(array.length).toBe(0);

        array.push('a');

        expect(array.length).toBe(1);
        expect(array[0]).toBe('a');

        length = array.push('b');

        expect(array.length).toBe(2);
        expect(array[0]).toBe('a');
        expect(array[1]).toBe('b');
    });

    it('Should add the parameter to the last position of the array', function() {
        var array = new Arroz();

        var length = array.push('a');

        expect(length).toBe(array.length);

        length = array.push('b');

        expect(length).toBe(array.length);
    });

    it('Should add the parameter to the last position of the array', function() {
        var array = new Arroz();

        var length = array.push('a', 'b', 'c');

        expect(array.length).toBe(3);
        expect(length).toBe(array.length);
        expect(array[0]).toBe('a');
        expect(array[1]).toBe('b');
        expect(array[2]).toBe('c');
    });
});