'use strict';

describe('Arroz.prototype.push', function () {
    it('it should add elements into an empty instance', function () {
        var array = new Arroz();

        expect(array.length).toBe(0);

        array.push('a');

        expect(array.length).toBe(1);
        expect(array[0]).toBe('a');
    });

    it('it should add a new element to the instance', function () {
        var array = new Arroz(1, 2, 3);

        expect(array.length).toBe(3);

        array.push(4);

        expect(array.length).toBe(4);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(undefined);

    });

    it('it should add multiplies values', function () {
        var array = new Arroz('a', 'b', 'c')

        var length = array.push('d', 'e');

        expect(length).toBe(array.length);
        expect(array[0]).toBe('a');
        expect(array[1]).toBe('b');
        expect(array[2]).toBe('c');
        expect(array[3]).toBe('d');
        expect(array[4]).toBe('e');

    });

});