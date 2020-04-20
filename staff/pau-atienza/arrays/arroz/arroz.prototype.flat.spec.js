'use strict';

describe('Arroz.prototype.flat', function () {
    it('decomposes subarroces at different levels depending on the depth introduced', function () {
        var arroz = new Arroz(1, 2, 3, new Arroz(1, 2));

        var newArroz = arroz.flat(1);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(2);

        var arroz = new Arroz(1, 2, 3, new Arroz(1, new Arroz(1 , 1)));

        var newArroz = arroz.flat(2);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(1);
        expect(newArroz[5]).toBe(1);
        expect(newArroz.length).toBe(6);

        var arroz = new Arroz(1, 2, 3, new Arroz(1, new Arroz(1 , new Arroz(1, new Arroz(1, 1)))));

        var newArroz = arroz.flat(5);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(1);
        expect(newArroz[5]).toBe(1);
        expect(newArroz[6]).toBe(1);
        expect(newArroz[7]).toBe(1);
        expect(newArroz.length).toBe(8);
    });

    it('level of depth can be adjusted successfully', function () {
        var arroz = new Arroz(1, 2, 3, new Arroz(1, new Arroz(1 , 1)));

        var newArroz = arroz.flat(1);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz.length).toBe(5);
    });

    it('when depth is 0, no changes are made in the arroz', function () {
        var arroz = new Arroz(1, 2, 3, new Arroz(1, new Arroz(1 , 1)));

        var newArroz = arroz.flat(0);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3] instanceof Arroz).toBe(true);
        expect(newArroz.length).toBe(4);
    });
    
    it('default depth is 1', function () {
        var arroz = new Arroz(1, 2, 3, new Arroz(1, new Arroz(1 , 1)));

        var newArroz = arroz.flat();
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz.length).toBe(5);
    });


    it('2 arroces in the same level', function () {
        var arroz = new Arroz (1, 2, 3, new Arroz (1, 1), new Arroz (1, 1));

        var newArroz = arroz.flat(1);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(1);
        expect(newArroz[5]).toBe(1);
        expect(newArroz[6]).toBe(1);
        expect(newArroz.length).toBe(7);

        var arroz = new Arroz (1, 2, 3, new Arroz (new Arroz(1), new Arroz(1)), new Arroz (1, 1));

        var newArroz = arroz.flat(2);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(1);
        expect(newArroz[5]).toBe(undefined);
        expect(newArroz[6]).toBe(undefined);
        expect(newArroz.length).toBe(5);
        
    });

    it('undefined slots are skipped', function () {
        var arroz = new Arroz(1, 2, 3, undefined, undefined, new Arroz(1, 2));

        var newArroz = arroz.flat(1);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(2);
    });

    it('assumens depth = 0 when an input that cannot be interpreted as a number is introduced', function(){
        var arroz = new Arroz(1, 2, 3, new Arroz(1, 2));

        var newArroz = arroz.flat({});
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3] instanceof Arroz).toBe(true);
        expect(newArroz.length).toBe(4);

        var arroz = new Arroz(1, 2, 3, new Arroz(1, 2));

        var newArroz = arroz.flat([]);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3] instanceof Arroz).toBe(true);
        expect(newArroz[3][1]).toBe(2);  

        var arroz = new Arroz(1, 2, 3, new Arroz(1, 2));
        var newArroz = arroz.flat(true);
        expect(newArroz[2]).toBe(3);
        expect(newArroz[3]).toBe(1);
        expect(newArroz[4]).toBe(2);
    });
});