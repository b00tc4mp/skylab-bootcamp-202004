'use strict';

describe('arroz.prototype.push', function () {
    it('should put a value in an array', function () {
        var a = new Arroz(1, 2, 3, 4);
        a.push(8);
        expect(a[4]).toBe(8);
        expect(a.length).toBe(5);
    })


    it('you should be able to put more than one value in an array and increase its length', function () {
        var a = new Arroz();
        a.push('hola', 'mundo');

        expect(a.length).toBe(2)
        expect(a[0]).toBe('hola')
        expect(a[1]).toBe('mundo')
    })


})