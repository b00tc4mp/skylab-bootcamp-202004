'use strict';

describe('Arroz.prototype.join', function () {

    it('it should return a tring with elements of array separating for ,', function () {
        var array = new Arroz ('hola', 'mundo', '!');
        var str = array.join(',');

        expect(str).toEqual('hola,mundo,!');

        expect(array[0]).toBe('hola')
        expect(array[1]).toBe('mundo')
        expect(array[2]).toBe('!')

        array = new Arroz ('hola', 'mundo', '!');
        var str = array.join();

        expect(str).toEqual('hola,mundo,!');

    });

    it('it should return a string with elements of array sin separation', function () {
        var array = new Arroz('hola', 'mundo', '!');
        var str = array.join('');

        expect(str).toEqual('holamundo!');

    });

    it('it should return a string with elements of array separating by one space', function () {
        var array = new Arroz (1, 2, 3, 4, 5, 6, 7);
        var str = array.join(' ');

        expect(str).toEqual('1 2 3 4 5 6 7');
    });

    it('it should return an empty string', function () {
        var array = new Arroz ();
        var str = array.join('!');

        expect(str).toEqual('');
    });

})