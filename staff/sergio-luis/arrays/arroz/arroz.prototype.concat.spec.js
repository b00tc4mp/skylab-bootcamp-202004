"use strict";

describe('Arroz.prototype.concat', function() {
    it('The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.', function() {
        var array1 = new Arroz(1, 2);
        var array2 = new Arroz(5,6);

        var array3 = array1.concat(array2)

        expect(array3[0]).toBe(1);
        expect(array3[1]).toBe(2);
        expect(array3[2]).toBe(5);
        expect(array3[3]).toBe(6);
    });
    it('The concat() with letters', function() {
        var array1 = new Arroz('a', 'b');

        var array3 = array1.concat(1,'hello')

        expect(array3[0]).toBe('a');
        expect(array3[1]).toBe('b');
        expect(array3[2]).toBe(1);
        expect(array3[3]).toBe('hello'); 
    });
    it('The concat() with a empty arroz', function() {
        var array1 = new Arroz();

        var array3 = array1.concat(1,2)

        expect(array3[0]).toBe(1);
        expect(array3[1]).toBe(2);

    });
});