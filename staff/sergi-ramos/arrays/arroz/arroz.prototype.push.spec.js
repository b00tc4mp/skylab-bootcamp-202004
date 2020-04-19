'use strict';

describe('arroz.prototype.push', function () {
    it('should put a value in an array', function () {
        var a = new Arroz(1, 2, 3, 4);

        a.push(8);
        a.push('hola');
        a.push('mundo');

        expect(a[4]).toBe(8);
        expect(a[5]).toBe('hola');
        expect(a[6]).toBe('mundo');
        expect(a.length).toBe(7);
    })


    it('you should be able to put more than one value in an array and increase its length in a empty Arroz', function () {
        var a = new Arroz();

        a.push('hola', 'mundo');
        a.push('cruel', '🤡');

        expect(a.length).toBe(4);
        expect(a[0]).toBe('hola');
        expect(a[1]).toBe('mundo');
        expect(a[2]).toBe('cruel');
        expect(a[3]).toBe('🤡');
    })

    it('should put an object in Arroz', function(){
        var a = new Arroz();
        var b = {name: 'hola', surname:'mundo'};

        a.push(b);
        

        expect(a[0].name).toBe('hola');
        expect(a[0].surname).toBe('mundo');
       
    })

})